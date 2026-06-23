import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Gallery } from './gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageService } from '../files/storage.service';
import { GalleryCategory } from 'src/galleries-categories/gallery-category.entity';
import { CreateGalleryDto } from './dtos/create-gallery.dto';
import { StorageFile } from 'src/files/storage.service';

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
    private readonly storageService: StorageService,
  ) {}

  async create(
    dto: CreateGalleryDto,
    userId: string,
    file?: UploadedGalleryFile,
  ): Promise<Gallery> {
    if (!file) {
      throw new BadRequestException('Le fichier est obligatoire.');
    }

    if (!file.mimetype?.startsWith('image/')) {
      throw new BadRequestException('Seules les images sont autorisées.');
    }

    const category = await this.findCategoryWithRelationsOrFail(dto.categoryId);
    this.assertIsOwner(category, userId);

    const gallery = this.galleryRepository.create({
      name: dto.name?.trim() || file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      category,
    });

    const savedGallery = await this.galleryRepository.save(gallery);

    const storageFile: StorageFile = {
      buffer: file.buffer,
      mimetype: file.mimetype,
    };

    try {
      await this.storageService.saveFile(
        storageFile,
        this.buildStorageBasePath(savedGallery.category.id),
        savedGallery.id,
      );
    } catch (error) {
      await this.galleryRepository.delete(savedGallery.id);
      throw error;
    }

    return this.findOneOrFail(savedGallery.id, userId);
  }

  async findOneOrFail(id: string, userId: string): Promise<Gallery> {
    const gallery = await this.galleryRepository.findOne({
      where: { id },
      relations: [
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

    await this.storageService.deleteFile(
      this.buildStorageBasePath(gallery.category.id),
      gallery.id,
      gallery.mimetype,
    );

    await this.galleryRepository.remove(gallery);
  }

  getUrls(gallery: Gallery): Promise<{ small: string; medium: string; big: string }> {
    const basePath = this.buildStorageBasePath(gallery.category.id);

    return Promise.all([
      this.storageService.getFileUrl(basePath, gallery.id, gallery.mimetype, 20),
      this.storageService.getFileUrl(basePath, gallery.id, gallery.mimetype, 60),
      this.storageService.getFileUrl(basePath, gallery.id, gallery.mimetype, 100),
    ]).then(([small, medium, big]) => ({ small, medium, big }));
  }

  private async findCategoryWithRelationsOrFail(
    id: string,
  ): Promise<GalleryCategory> {
    const category = await this.galleryCategoryRepository.findOne({
      where: { id },
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
