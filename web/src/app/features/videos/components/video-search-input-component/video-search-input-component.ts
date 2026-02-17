import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { Video } from '../../../../core/models/videos/video';

@Component({
  selector: 'app-video-search-input-component',
  imports: [AutoComplete, FormsModule],
  templateUrl: './video-search-input-component.html',
  styleUrl: './video-search-input-component.css',
})
export class VideoSearchInputComponent {
  public label = input.required<string>();
  public placeholder = input.required<string>();
  public search = input.required<string>();
  public videos = input.required<Video[]>();

  public searchChange = output<string>();
  public videoSelected = output<Video>();

  onSearchModelChange(value: string | Video | null) {
    if (typeof value === 'string') {
      this.searchChange.emit(value);
      return;
    }

    if (value?.title) {
      this.searchChange.emit(value.title);
      return;
    }

    this.searchChange.emit('');
  }

  onSelect(event: { value?: Video }) {
    if (event.value) {
      this.videoSelected.emit(event.value);
    }
  }
}
