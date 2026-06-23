import { Injectable } from '@angular/core';
import { TreeStoreUtils } from '../../../shared/utils/store-tree-node-utils';
import { GalleryCategoryModel } from '../../../core/models/galleries/gallery-category-model';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class GalleryCategoryStore extends TreeStoreUtils<GalleryCategoryModel> {}
