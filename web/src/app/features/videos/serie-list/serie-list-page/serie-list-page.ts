import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { FooterTableComponent } from '../../../../shared/components/footer-table-component/footer-table-component';
import { SerieListService } from '../serie-list-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-serie-list-page',
  imports: [DefaultContainerComponent, FooterTableComponent, FooterTableComponent, AutoComplete, CommonModule, FormsModule],
  templateUrl: './serie-list-page.html',
  styleUrl: './serie-list-page.css',
})
export class SerieListPage {
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

  onSearchChange(value: string | { title?: string }) {
    if (typeof value === 'string') {
      this.serieListService.search.set(value);
      return;
    }

    if (value?.title) {
      this.serieListService.search.set(value.title);
      return;
    }

    this.serieListService.search.set('');
  }

  redirectToVideoDetails(event: any) {
    if (event?.value?.externalId) {
      this.router.navigate(['/series/details', event.value.externalId]);
    }
  }
}
