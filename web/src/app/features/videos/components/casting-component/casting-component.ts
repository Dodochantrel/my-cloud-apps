import { Component, input } from '@angular/core';
import { TitleComponent } from '../../../../shared/components/title-component/title-component';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { VideoCasting } from '../../../../core/models/videos/video-casting';

@Component({
  selector: 'app-casting-component',
  imports: [TitleComponent, SkeletonModule, TooltipModule],
  templateUrl: './casting-component.html',
  styleUrl: './casting-component.css',
})
export class CastingComponent {
  public isLoading = input.required<boolean>();
  public castings = input.required<VideoCasting[]>();
}
