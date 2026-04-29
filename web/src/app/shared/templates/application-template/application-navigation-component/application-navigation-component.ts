import { Component, model } from '@angular/core';
import { Router } from '@angular/router';
import { navigationItems, NavigationItem } from './application-navigation-items';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-navigation-component',
  imports: [CommonModule],
  templateUrl: './application-navigation-component.html',
})
export class ApplicationNavigationComponent {
  public isOpenNaviation = model.required<boolean>();
  public navigationItems = navigationItems;

  constructor(private readonly router: Router) {}

  toggleNavigation() {
    this.isOpenNaviation.set(!this.isOpenNaviation());
  }

  toggleItem(item: NavigationItem) {
    if (item.subNavigationItems?.length) {
      item.isOpen = !item.isOpen;
    } else if (item.path) {
      this.navigate(item.path);
    }
  }

  navigate(path: string) {
    this.router.navigateByUrl(path);
  }
}
