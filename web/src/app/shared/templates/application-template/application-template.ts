import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationHeaderComponent } from './application-header-component/application-header-component';
import { ApplicationNavigationComponent } from './application-navigation-component/application-navigation-component';

@Component({
  selector: 'app-application-template',
  imports: [RouterOutlet, ApplicationHeaderComponent, ApplicationNavigationComponent],
  templateUrl: './application-template.html',
  styleUrl: './application-template.css',
})
export class ApplicationTemplate {
  public isOpenNaviation: boolean = true;
}
