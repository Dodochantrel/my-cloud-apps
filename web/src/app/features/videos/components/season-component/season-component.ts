import { Component, input } from '@angular/core';
import { Video } from '../../../../core/models/videos/video';
import { AccordionModule } from 'primeng/accordion';
import { TitleComponent } from '../../../../shared/components/title-component/title-component';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-season-component',
  imports: [AccordionModule, TitleComponent, DividerModule, SkeletonModule],
  templateUrl: './season-component.html',
  styleUrl: './season-component.css',
})
export class SeasonComponent {
  public video = input.required<Video | null>();
  public isLoading = input.required<boolean>();
}
