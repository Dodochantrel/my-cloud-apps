import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { FooterTableComponent } from '../../../../shared/components/footer-table-component/footer-table-component';
import { SerieListService } from '../serie-list-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../../../../core/models/videos/video';
import { VideoSearchInputComponent } from '../../components/video-search-input-component/video-search-input-component';

@Component({
  selector: 'app-serie-list-page',
  imports: [DefaultContainerComponent, FooterTableComponent, VideoSearchInputComponent, CommonModule],
  templateUrl: './serie-list-page.html',
  styleUrl: './serie-list-page.css',
})
export class SerieListPage implements OnInit {
  constructor(
    protected readonly serieListService: SerieListService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Synchroniser search avec l'URL
    effect(() => {
      const search = this.serieListService.search();
      
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
        this.serieListService.search.set(searchParam);
      }
    });
  }

  onSearchChange(value: string) {
    this.serieListService.search.set(value);
  }

  redirectToVideoDetails(video: Video) {
    if (video?.id) {
      this.router.navigate(['/series/details', video.id]);
    }
  }
}
