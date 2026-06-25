import { Component, effect, inject, model, signal, WritableSignal } from '@angular/core';
import { AddGalleryService } from '../add-gallery-service';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { createAddFilesForm } from '../../../forms/add-files-form';
import { GalleryCategoryModel } from '../../../../../core/models/galleries/gallery-category-model';
import { FormsModule } from '@angular/forms';
import { InputToggleSwitchComponent } from '../../../../../shared/components/inputs/input-toggle-switch-component/input-toggle-switch-component';

@Component({
  selector: 'app-add-gallery-component',
  imports: [BadgeModule, ButtonModule, FileUploadModule, ProgressBarModule, CommonModule, FormsModule, InputToggleSwitchComponent],
  templateUrl: './add-gallery-component.html',
  styleUrl: './add-gallery-component.css',
})
export class AddGalleryComponent {
  public selectedCategory = model<GalleryCategoryModel | null>(null);

  public form = createAddFilesForm();

  public isAllPrivate: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly addGalleryService = inject(AddGalleryService);
  protected readonly notificationService = this.addGalleryService.notificationService;

  constructor() {
    effect(() => {
      this.form.controls.category.setValue(this.selectedCategory());
    });
  }

  choose(event: any, chooseCallback: any) {
    chooseCallback();
  }

  onSelect(event: any) {
    this.form.controls.files.setValue(event.currentFiles);
  }

  uploadEvent() {
    const category = this.form.controls.category.value;
    const files = this.form.controls.files.value;

    if (!category || !files.length) {
      this.notificationService.invalidForm();
      return;
    }

    this.addGalleryService.create(files, category.id).subscribe({
      next: () => {
        this.clearCallback();
      },
    });
  }

  clearCallback() {
    this.form.controls.files.setValue([]);
    this.form.controls.category.setValue(this.selectedCategory());
  }
}
