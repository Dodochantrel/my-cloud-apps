import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { FooterTableComponent } from "../../../../shared/components/footer-table-component/footer-table-component";
import { MovieListService } from '../movie-list-service';
import { AutoComplete } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list-page',
  imports: [DefaultContainerComponent, FooterTableComponent, FooterTableComponent, AutoComplete, CommonModule, FormsModule],
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

  redirectToVideoDetails() {
    const search = this.movieListService.search();
    if (search?.externalId) {
      this.router.navigate(['/movies/details', search.externalId]);
    }
  }
}
