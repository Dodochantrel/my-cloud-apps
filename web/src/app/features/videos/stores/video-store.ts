import { Injectable, signal } from '@angular/core';
import { Video } from '../../../core/models/videos/video';
import { StoreUtils } from '../../../shared/utils/store-utils';

@Injectable({
  providedIn: 'root',
})
export class VideoStore extends StoreUtils<Video> {}
