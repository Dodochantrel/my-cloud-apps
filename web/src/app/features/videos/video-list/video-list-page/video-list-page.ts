import { CommonModule } from '@angular/common';
import { Component, effect, linkedSignal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { VideoListService } from '../video-list-service';
import { Video, VideoType } from '../../../../core/models/videos/video';
import { TabsModule } from 'primeng/tabs';
import { CurrentVideoComponent } from '../../components/current-video/current-video-component/current-video-component';
import { WatchedVideoComponent } from "../../components/watched-video/watched-video-component/watched-video-component";
import { ToWatchVideoComponent } from '../../components/to-watch-video/to-watch-video-component/to-watch-video-component';
import { InputAutoCompleteComponent } from '../../../../shared/components/inputs/input-auto-complete-component/input-auto-complete-component';

@Component({
  selector: 'app-video-list-page',
  imports: [
    DefaultContainerComponent,
    InputAutoCompleteComponent,
    CommonModule,
    TabsModule,
    CurrentVideoComponent,
    WatchedVideoComponent,
    ToWatchVideoComponent
],
  templateUrl: './video-list-page.html',
  styleUrl: './video-list-page.css',
})
export class VideoListPage implements OnInit {
  constructor(
    protected readonly videoListService: VideoListService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Synchroniser search + type avec l'URL
    effect(() => {
      const search = this.videoListService.search();
      const type = this.videoListService.type();

      const current = this.activatedRoute.snapshot.queryParams;
      const currentSearch = current['search'] || '';
      const currentType = this.normalizeType(current['type']) ?? 'movie';

      if (search === currentSearch && type === currentType) return;

      this.router.navigate([], {
        queryParams: { search: search || null, type },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  ngOnInit() {
    // Récupérer search + type depuis l'URL au chargement
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const searchParam = params.get('search');
      const typeParam = this.normalizeType(params.get('type')) ?? 'movie';

      if (searchParam !== null) {
        this.videoListService.search.set(searchParam);
      }

      if (typeParam !== this.videoListService.type()) {
        this.videoListService.type.set(typeParam);
      }
    });
  }

  onSearchChange(value: string) {
    this.videoListService.search.set(value);
  }

  redirectToVideoDetails(video: Video) {
    if (video?.id) {
      this.router.navigate(['/videos/details', video.id], {
        queryParams: { type: this.videoListService.type() },
      });
    }
  }

  get title(): string {
    return this.videoListService.type() === 'movie'
      ? 'Liste des films'
      : 'Liste des séries';
  }

  get searchLabel(): string {
    return this.videoListService.type() === 'movie'
      ? 'Rechercher un film'
      : 'Rechercher une série';
  }

  get searchPlaceholder(): string {
    return this.videoListService.type() === 'movie' ? 'Seven' : 'Breaking Bad';
  }

  get isMovie(): boolean {
    return this.videoListService.type() === 'movie';
  }

  private normalizeType(type: string | null): VideoType | null {
    if (type === 'movie' || type === 'serie') return type;
    return null;
  }

  public videos = linkedSignal(() => {
    return this.videoListService.videoStore.data()
      .map((video) => ({
        label: video.title,
        value: video,
      }));
  });
}
