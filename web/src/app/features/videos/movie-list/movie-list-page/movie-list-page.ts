import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { FooterTableComponent } from "../../../../shared/components/footer-table-component/footer-table-component";
import { MovieListService } from '../movie-list-service';
import { VideoSearchInputComponent } from '../../components/video-search-input-component/video-search-input-component';
import { Video } from '../../../../core/models/videos/video';
import { TabsModule } from 'primeng/tabs';
import { CurrentVideoComponent } from '../../components/current-video-component/current-video-component';

@Component({
  selector: 'app-movie-list-page',
  imports: [DefaultContainerComponent, FooterTableComponent, VideoSearchInputComponent, TabsModule, CurrentVideoComponent],
  templateUrl: './movie-list-page.html',
  styleUrl: './movie-list-page.css',
})
export class MovieListPage implements OnInit {
  constructor(
    protected readonly movieListService: MovieListService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Synchroniser search avec l'URL
    effect(() => {
      const search = this.movieListService.search();
      
      const current = this.activatedRoute.snapshot.queryParams;
      const currentSearch = current['search'] || '';
      
      if (search === currentSearch) return;
      
      this.router.navigate([], {
        queryParams: { search: search || null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  ngOnInit() {
    // Récupérer le search depuis l'URL au chargement
    this.activatedRoute.queryParamMap.subscribe(params => {
      const searchParam = params.get('search');
      
      if (searchParam !== null) {
        this.movieListService.search.set(searchParam);
      }
    });
  }

  onSearchChange(value: string) {
    this.movieListService.search.set(value);
  }

  redirectToVideoDetails(video: Video) {
    if (video?.id) {
      this.router.navigate(['/movies/details', video.id]);
    }
  }
}
