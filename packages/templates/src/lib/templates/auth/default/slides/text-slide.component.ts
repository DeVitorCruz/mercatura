import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'lib-text-slide',
  imports: [],
  templateUrl: './text-slide.component.html',
})
export class TextSlideComponent {
  public readonly title: InputSignal<string> =
    input<string>('');

  public readonly description: InputSignal<string> =
    input<string>('');
}
