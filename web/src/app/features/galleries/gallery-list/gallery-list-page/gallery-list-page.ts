import { Component, inject, signal } from '@angular/core';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { GalleryCategory } from '../../../../core/models/galleries/gallery-category';
import { DividerModule } from 'primeng/divider';
import { GalleryCategoryStore } from '../../stores/gallery-category-store';
import { GalleryListService } from '../gallery-list-service';

@Component({
  selector: 'app-gallery-list-page',
  imports: [DefaultContainerComponent, TreeModule, DividerModule],
  templateUrl: './gallery-list-page.html',
  styleUrl: './gallery-list-page.css',
})
export class GalleryListPage {
  protected readonly galleryCategoryStore = inject(GalleryCategoryStore);
  private readonly galleryListService = inject(GalleryListService);
}
