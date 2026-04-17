import { Component, inject, signal } from '@angular/core';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { GroupCardComponent } from '../../components/group-card-component/group-card-component';
import { GroupListService } from '../group-list-service';
import { GroupStore } from '../../stores/group-store';
import { DividerModule } from "primeng/divider";
import { ButtonModule } from 'primeng/button';
import { CreateOrEditGroupComponent } from '../../components/create-or-edit-group/create-or-edit-group-component/create-or-edit-group-component';
import { GroupModel } from '../../../../core/models/groups/group-model';
import { NotificationService } from '../../../../core/notification/notification-service';
import { InputTextComponent } from '../../../../shared/components/inputs/input-text-component/input-text-component';

@Component({
  selector: 'app-group-list-page',
  imports: [
    DefaultContainerComponent,
    GroupCardComponent, 
    InputTextComponent,
    DividerModule, 
    ButtonModule, 
    CreateOrEditGroupComponent
  ],
  templateUrl: './group-list-page.html',
  styleUrl: './group-list-page.css',
})
export class GroupListPage {
  protected readonly groupListService = inject(GroupListService);
  protected readonly groupStore = inject(GroupStore);
  private readonly notiticationService = inject(NotificationService);

  public isDisplayCreateOrEditGroup = signal(false);
  public isCreatingCreateOrEditGroup = signal(false);
  public selectedGroup = signal<GroupModel | null>(null);

  handleCreate() {
    this.isDisplayCreateOrEditGroup.set(true);
    this.isCreatingCreateOrEditGroup.set(true);
  }

  handleEdit(group: GroupModel) {
    this.selectedGroup.set(group);
    this.isDisplayCreateOrEditGroup.set(true);
    this.isCreatingCreateOrEditGroup.set(false);
  }

  handleDelete(group: GroupModel, event: any) {
    this.notiticationService.confirm(
      event,
      'Confirmer la suppression', 
      `Êtes-vous sûr de vouloir supprimer le groupe "${group.name}" ?`, 
      'Supprimer',
      'Annuler',
      () => {
        this.groupListService.deleteGroup(group.id)
      }
    );
  }
}
