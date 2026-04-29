import { Injectable } from "@angular/core";
import { StoreUtils } from "../../../shared/utils/store-utils";
import { GroupModel } from "../../../core/models/groups/group-model";

@Injectable({
  providedIn: 'root',
})
export class GroupStore extends StoreUtils<GroupModel> {}