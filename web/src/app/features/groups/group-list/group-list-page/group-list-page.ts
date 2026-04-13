import { Component, inject } from '@angular/core';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { GroupCardComponent } from '../../components/group-card-component/group-card-component';
import { GroupListService } from '../group-list-service';
import { GroupStore } from '../../stores/group-store';

@Component({
  selector: 'app-group-list-page',
  imports: [DefaultContainerComponent, GroupCardComponent],
  templateUrl: './group-list-page.html',
  styleUrl: './group-list-page.css',
})
export class GroupListPage {
  private readonly groupListService = inject(GroupListService);
  protected readonly groupStore = inject(GroupStore);
}
