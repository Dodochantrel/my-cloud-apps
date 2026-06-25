import { Injectable } from "@angular/core";
import { StoreUtils } from "../../../shared/utils/store-utils";

@Injectable({
  providedIn: 'root',
})
export class GalleryStore extends StoreUtils<any> {}