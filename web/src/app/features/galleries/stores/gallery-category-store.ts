import { Injectable } from '@angular/core';
import { TreeStoreUtils } from '../../../shared/utils/store-tree-node-utils';
import { GalleryCategoryModel } from '../../../core/models/galleries/gallery-category-model';

@Injectable({
  providedIn: 'root',
})
export class GalleryCategoryStore extends TreeStoreUtils<GalleryCategoryModel> {
  mapFromGalleryCategoryToTreeNode(
    categories: GalleryCategoryModel[],
  ): { label: string; data: GalleryCategoryModel; children: any[] }[] {
    return categories.map((category) => ({
      label: category.name,
      data: category,
      children: this.mapFromGalleryCategoryToTreeNode(category.childrens || []),
    }));
  }
}
