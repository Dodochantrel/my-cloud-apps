import { Component, inject, signal } from '@angular/core';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { GroupCardComponent } from '../../components/group-card-component/group-card-component';
import { GroupListService } from '../group-list-service';
import { GroupStore } from '../../stores/group-store';
import { HeaderSearchComponent } from '../../../../shared/components/header-search-component/header-search-component';
import { DividerModule } from "primeng/divider";
import { ButtonModule } from 'primeng/button';
import { CreateOrEditGroupComponent } from '../../components/create-or-edit-group/create-or-edit-group-component/create-or-edit-group-component';

@Component({
  selector: 'app-group-list-page',
  imports: [
    DefaultContainerComponent,
    GroupCardComponent, 
    HeaderSearchComponent, 
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

  public isDisplayCreateOrEditGroup = signal(false);
  public isCreatingCreateOrEditGroup = signal(false);

  handleCreate() {
    this.isDisplayCreateOrEditGroup.set(true);
    this.isCreatingCreateOrEditGroup.set(true);
  }
}
