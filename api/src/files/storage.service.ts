import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import sharp from 'sharp';

export type StorageFile = {
  buffer: Buffer;
  mimetype: string;
};

export type StoredFileVariant = {
  key: string;
  width: number;
};

const WIDTH_PERCENTAGES = [100, 60, 20] as const;

@Injectable()
export class StorageService {
  private readonly client: Minio.Client;
  private readonly bucket: string;
  private readonly logger = new Logger(StorageService.name);

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.getOrThrow<string>('MINIO_BUCKET');

    this.client = new Minio.Client({
      endPoint: this.configService.getOrThrow<string>('MINIO_ENDPOINT'),
      port: this.configService.get<number>('MINIO_PORT', 9000),
      useSSL: this.configService.get<boolean>('MINIO_USE_SSL', false),
      accessKey: this.configService.getOrThrow<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.getOrThrow<string>('MINIO_SECRET_KEY'),
    });
  }

  async onModuleInit(): Promise<void> {
    const exists = await this.client.bucketExists(this.bucket);
    if (!exists) {
      await this.client.makeBucket(this.bucket);
      this.logger.log(`Bucket "${this.bucket}" created.`);
    }
  }

  async saveFile(
    file: StorageFile,
    basePath: string,
    fileName: string,
  ): Promise<StoredFileVariant[]> {
    const metadata = await sharp(file.buffer).metadata();
    const originalWidth = metadata.width ?? 0;
    const extension = this.getExtension(file.mimetype);

    const uploads = WIDTH_PERCENTAGES.map(async (pct) => {
      const targetWidth = Math.round(originalWidth * (pct / 100));
      const resizedBuffer = await sharp(file.buffer)
        .resize({ width: targetWidth })
        .toBuffer();

      const objectKey = this.buildObjectKey(basePath, pct, fileName, extension);

      await this.client.putObject(
        this.bucket,
        objectKey,
        resizedBuffer,
        resizedBuffer.length,
        {
          'Content-Type': file.mimetype,
        },
      );

      this.logger.log(`Uploaded: ${objectKey}`);
      return { key: objectKey, width: targetWidth } satisfies StoredFileVariant;
    });

    return Promise.all(uploads);
  }

  async deleteFile(
    basePath: string,
    fileName: string,
    mimetype: string,
  ): Promise<void> {
    const extension = this.getExtension(mimetype);
    const keys = WIDTH_PERCENTAGES.map((pct) =>
      this.buildObjectKey(basePath, pct, fileName, extension),
    );

    await this.client.removeObjects(this.bucket, keys);
    this.logger.log(`Deleted objects: ${keys.join(', ')}`);
  }

  getFileUrl(
    basePath: string,
    fileName: string,
    mimetype: string,
    width: number,
  ): Promise<string> {
    const extension = this.getExtension(mimetype);
    const objectKey = this.buildObjectKey(basePath, width, fileName, extension);

    return this.client.presignedGetObject(
      this.bucket,
      objectKey,
      7 * 24 * 60 * 60,
    );
  }

  private buildObjectKey(
    basePath: string,
    widthPct: number,
    fileName: string,
    extension: string,
  ): string {
    return `${basePath}/${widthPct}/${fileName}${extension}`;
  }

  private getExtension(mimetype: string): string {
    const parts = mimetype.split('/');
    if (parts.length !== 2) {
      throw new Error(`Invalid mimetype: ${mimetype}`);
    }
    return `.${parts[1]}`;
  }
}
