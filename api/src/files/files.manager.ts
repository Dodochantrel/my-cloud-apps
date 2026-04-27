import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FileData } from './file-data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageFile, StorageService } from './storage.service';

@Injectable()
export class FilesManager {
  private readonly logger = new Logger(FilesManager.name);

  constructor(
    @InjectRepository(FileData)
    private readonly fileDataRepository: Repository<FileData>,
    private readonly storageService: StorageService,
  ) {}

  // ---------------------------------------------------------------------------
  // Repository operations
  // ---------------------------------------------------------------------------

  private save(fileData: FileData): Promise<FileData> {
    fileData.prepareFileName();
    return this.fileDataRepository.save(fileData);
  }

  async getOne(id: string): Promise<FileData> {
    const fileData = await this.fileDataRepository.findOne({ where: { id } });
    if (!fileData) {
      this.logger.error(`FileData with id ${id} not found`);
      throw new NotFoundException(`FileData with id ${id} not found`);
    }
    return fileData;
  }

  async delete(id: string): Promise<void> {
    const fileData = await this.getOne(id);
    await this.deleteFile(fileData);
    await this.fileDataRepository.remove(fileData);
    this.logger.log(`FileData with id ${id} deleted`);
  }

  // ---------------------------------------------------------------------------
  // File operations (delegated to StorageService)
  // ---------------------------------------------------------------------------

  async uploadFile(file: StorageFile, fileData: FileData): Promise<FileData> {
    try {
      const saved = await this.save(fileData);
      await this.storageService.saveFile(file, saved.path, saved.name);
      return saved;
    } catch (error) {
      this.logger.error('Error uploading file', error);
      throw new Error('Failed to upload file');
    }
  }

  async deleteFile(fileData: FileData): Promise<void> {
    try {
      await this.storageService.deleteFile(
        fileData.path,
        fileData.name,
        fileData.mimetype,
      );
    } catch (error) {
      this.logger.error('Error deleting file', error);
      throw new Error('Failed to delete file');
    }
  }

  async updateFile(
    newFile: StorageFile,
    oldFileData: FileData,
    newFileData: FileData,
  ): Promise<FileData> {
    try {
      newFileData.id = oldFileData.id;
      await this.deleteFile(oldFileData);
      return await this.uploadFile(newFile, newFileData);
    } catch (error) {
      this.logger.error('Error updating file', error);
      throw new Error('Failed to update file');
    }
  }

  getFileUrl(
    fileData: FileData,
    widthOption: WidthOptions = 'big',
  ): Promise<string> {
    if (!fileData) {
      throw new NotFoundException('File not found');
    }
    const width = this.getWidth(widthOption);
    return this.storageService.getFileUrl(
      fileData.path,
      fileData.name,
      fileData.mimetype,
      width,
    );
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private getWidth(widthOption: WidthOptions): number {
    switch (widthOption) {
      case 'small':
        return 20;
      case 'medium':
        return 60;
      case 'big':
        return 100;
    }
  }
}

export type WidthOptions = 'small' | 'medium' | 'big';
