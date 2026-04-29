import { Component, inject } from '@angular/core';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { TreeModule } from 'primeng/tree';
import { DividerModule } from 'primeng/divider';
import { GalleryCategoryStore } from '../../stores/gallery-category-store';
import { GalleryListService } from '../gallery-list-service';
import { InputTextComponent } from '../../../../shared/components/inputs/input-text-component/input-text-component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-gallery-list-page',
  imports: [DefaultContainerComponent, TreeModule, DividerModule, InputTextComponent, ButtonModule],
  templateUrl: './gallery-list-page.html',
  styleUrl: './gallery-list-page.css',
})
export class GalleryListPage {
  protected readonly galleryCategoryStore = inject(GalleryCategoryStore);
  protected readonly galleryListService = inject(GalleryListService);

  handleCreate() {}
}
