import { Injectable } from '@angular/core';
import { TreeStoreUtils } from '../../../shared/utils/store-tree-node-utils';
import { GalleryCategory } from '../../../core/models/galleries/gallery-category';

@Injectable({
  providedIn: 'root',
})
export class GalleryCategoryStore extends TreeStoreUtils<GalleryCategory> {
  mapFromGalleryCategoryToTreeNode(
    categories: GalleryCategory[],
  ): { label: string; data: GalleryCategory; children: any[] }[] {
    return categories.map((category) => ({
      label: category.name,
      data: category,
      children: this.mapFromGalleryCategoryToTreeNode(category.childrens || []),
    }));
  }
}
