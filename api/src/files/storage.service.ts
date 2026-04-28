import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly logger = new Logger(StorageService.name);

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.getOrThrow<string>('SEAWEEDFS_BUCKET');

    this.client = new S3Client({
      endpoint: this.configService.getOrThrow<string>('SEAWEEDFS_ENDPOINT'),
      region: 'us-east-1', // SeaweedFS l'ignore mais le SDK l'exige
      forcePathStyle: true, // obligatoire pour SeaweedFS
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>(
          'SEAWEEDFS_ACCESS_KEY',
        ),
        secretAccessKey: this.configService.getOrThrow<string>(
          'SEAWEEDFS_SECRET_KEY',
        ),
      },
    });
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

      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: objectKey,
          Body: resizedBuffer,
          ContentType: file.mimetype,
        }),
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

    await this.client.send(
      new DeleteObjectsCommand({
        Bucket: this.bucket,
        Delete: { Objects: keys.map((Key) => ({ Key })) },
      }),
    );

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

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: objectKey,
    });

    return getSignedUrl(this.client, command, {
      expiresIn: 7 * 24 * 60 * 60,
    }) as Promise<string>;
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
