import { Component, inject, signal } from '@angular/core';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';
import { DividerModule } from 'primeng/divider';
import { GalleryCategoryStore } from '../../stores/gallery-category-store';
import { GalleryListService } from '../gallery-list-service';
import { InputTextComponent } from '../../../../shared/components/inputs/input-text-component/input-text-component';
import { ButtonModule } from 'primeng/button';
import { CreateOrEditGalleryCategoryComponent } from '../../components/create-or-edit-gallery-category/create-or-edit-gallery-category-component/create-or-edit-gallery-category-component';
import { GalleryFileListService } from '../gallery-file-list-service';
import { AddGalleryComponent } from '../../components/add-gallery/add-gallery-component/add-gallery-component';

@Component({
  selector: 'app-gallery-list-page',
  imports: [DefaultContainerComponent, TreeModule, DividerModule, InputTextComponent, ButtonModule, CreateOrEditGalleryCategoryComponent, AddGalleryComponent],
  templateUrl: './gallery-list-page.html',
  styleUrl: './gallery-list-page.css',
})
export class GalleryListPage {
  protected readonly galleryCategoryStore = inject(GalleryCategoryStore);
  protected readonly galleryListService = inject(GalleryListService);
  protected readonly galleryFileListService = inject(GalleryFileListService);

  public isDisplayCreateOrEditDialog = signal<boolean>(false);

  handleCreate() {
    this.isDisplayCreateOrEditDialog.set(true);
  }

  categorySelected(event: TreeNodeSelectEvent) {
    this.galleryFileListService.selectedCategory.set(event.node.data);
  }
}
