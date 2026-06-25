import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Gallery } from './gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryCategory } from 'src/galleries-categories/gallery-category.entity';
import { StorageFile } from 'src/files/storage.service';
import { FilesManager } from 'src/files/files.manager';
import { FileData } from 'src/files/file-data.entity';

type UploadedGalleryFile = {
  buffer: Buffer;
  mimetype: string;
  size: number;
  originalname: string;
};

@Injectable()
export class GalleriesService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
    @InjectRepository(GalleryCategory)
    private readonly galleryCategoryRepository: Repository<GalleryCategory>,
    private readonly filesManager: FilesManager,
  ) {}

  async create(
    categoryId: string,
    isPrivate: boolean,
    userId: string,
    file?: UploadedGalleryFile,
  ): Promise<Gallery> {
    if (!file) {
      throw new BadRequestException('Le fichier est obligatoire.');
    }

    if (!file.mimetype?.startsWith('image/')) {
      throw new BadRequestException('Seules les images sont autorisées.');
    }

    const category = await this.findCategoryWithRelationsOrFail(categoryId, userId);
    this.assertIsOwner(category, userId);

    const storageFile: StorageFile = {
      buffer: file.buffer,
      mimetype: file.mimetype,
    };

    const fileDate = new FileData({
      name: file.originalname,
      path: this.buildStorageBasePath(category.id),
      mimetype: file.mimetype,
      size: file.size,
      user: category.user,
    })

    let savedGallery: Gallery;

    try {
      const fileSaved = await this.filesManager.uploadFile(
        storageFile,
        fileDate,
      );
      savedGallery = await this.galleryRepository.save(new Gallery({ isPrivate, category, fileData: fileSaved }));

      return this.findOneOrFail(savedGallery.id, userId);
    } catch (error) {
      throw error;
    }
  }

  async findOneOrFail(id: string, userId: string): Promise<Gallery> {
    const gallery = await this.galleryRepository.findOne({
      where: { id },
      relations: [
        'fileData',
        'category',
        'category.user',
        'category.group',
        'category.group.admin',
        'category.group.members',
        'category.group.moderators',
      ],
    });

    if (!gallery) {
      throw new NotFoundException('Élément de galerie non trouvé.');
    }

    this.assertCanAccess(gallery.category, userId);
    return gallery;
  }

  async delete(id: string, userId: string): Promise<void> {
    const gallery = await this.findOneOrFail(id, userId);
    this.assertIsOwner(gallery.category, userId);

    await this.filesManager.deleteFile(gallery.fileData);

    await this.galleryRepository.remove(gallery);
  }

  getUrls(gallery: Gallery): Promise<{ small: string; medium: string; big: string }> {
    const basePath = this.buildStorageBasePath(gallery.category.id);

    return Promise.all([
      this.filesManager.getFileUrl(gallery.fileData, 'small'),
      this.filesManager.getFileUrl(gallery.fileData, 'medium'),
      this.filesManager.getFileUrl(gallery.fileData, 'big'),
    ]).then(([small, medium, big]) => ({ small, medium, big }));
  }

  private async findCategoryWithRelationsOrFail(
    id: string,
    userId: string,
  ): Promise<GalleryCategory> {
    const category = await this.galleryCategoryRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user', 'group', 'group.admin', 'group.members', 'group.moderators'],
    });

    if (!category) {
      throw new NotFoundException('Catégorie non trouvée.');
    }

    return category;
  }

  private buildStorageBasePath(categoryId: string): string {
    return `galleries/${categoryId}`;
  }

  private assertIsOwner(category: GalleryCategory, userId: string): void {
    if (category.user?.id !== userId) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à modifier cette galerie.",
      );
    }
  }

  private assertCanAccess(category: GalleryCategory, userId: string): void {
    if (category.user?.id === userId) return;

    const belongsToGroup = category.groups?.some((group) =>
      group.allMembers?.some((member) => member.id === userId),
    );

    if (!belongsToGroup) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à accéder à cette galerie.",
      );
    }
  }
}
