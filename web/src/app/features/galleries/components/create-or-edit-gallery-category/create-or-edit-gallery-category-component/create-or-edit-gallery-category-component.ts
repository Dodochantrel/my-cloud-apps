import { Component, computed, inject, linkedSignal, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogFormComponent } from '../../../../../shared/components/dialog-form-component/dialog-form-component';
import { createCreateOrEditGalleryCategoryForm } from '../../../forms/create-or-edit-gallery-category-form';
import { InputTextComponent } from '../../../../../shared/components/inputs/input-text-component/input-text-component';
import { GalleryCategoryService } from '../../../galleries-categories/gallery-category-service';
import { InputSelectComponent } from '../../../../../shared/components/inputs/input-select-component/input-select-component';
import { MinimalGroupService } from '../../../../../shared/services/minimal-group-service';
import { GroupStore } from '../../../../groups/stores/group-store';
import { InputMultiSelectComponent } from '../../../../../shared/components/inputs/input-multi-select-component/input-multi-select-component';

@Component({
  selector: 'app-create-or-edit-gallery-category-component',
  imports: [ReactiveFormsModule, DialogFormComponent, InputTextComponent, InputSelectComponent, InputMultiSelectComponent],
  templateUrl: './create-or-edit-gallery-category-component.html',
  styleUrl: './create-or-edit-gallery-category-component.css',
})
export class CreateOrEditGalleryCategoryComponent {
  public minimalGroupService = inject(MinimalGroupService);
  public groupStore = inject(GroupStore);
  public isDisplay = model.required<boolean>();
  protected galleryCategoryService = inject(GalleryCategoryService);

  protected form = createCreateOrEditGalleryCategoryForm();

  protected galleryCategories = computed(() =>
    this.galleryCategoryService.galleryCategories().map((category) => ({
      label: category.name,
      value: category,
    })),
  );

  onSearchParentCategories(search: string) {
    this.galleryCategoryService.search.set(search);
  }

  cancel() {
    this.isDisplay.set(false);
    this.form = createCreateOrEditGalleryCategoryForm();
  }

  save() {
    
  }

  onSearchGroupChange(search: string) {
    this.minimalGroupService.search.set(search);
  }

  public groups = linkedSignal(() => {
    return this.groupStore.data().map((group) => ({
      label: group.name,
      value: group,
    }));
  });
}
