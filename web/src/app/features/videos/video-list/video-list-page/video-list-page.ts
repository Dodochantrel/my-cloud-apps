import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { FooterTableComponent } from "../../../../shared/components/footer-table-component/footer-table-component";
import { VideoListService } from '../video-list-service';
import { AutoComplete } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-list-page',
  imports: [DefaultContainerComponent, FooterTableComponent, FooterTableComponent, AutoComplete, CommonModule, FormsModule],
  templateUrl: './video-list-page.html',
  styleUrl: './video-list-page.css',
})
export class VideoListPage implements OnInit {
  constructor(
    protected readonly videoListService: VideoListService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Synchroniser search avec l'URL
    effect(() => {
      const search = this.videoListService.search();
      
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
        this.videoListService.search.set(searchParam);
      }
    });
  }

  redirectToVideoDetails() {
    this.router.navigate(['/videos/details', this.videoListService.search().externalId]);
  }
}
