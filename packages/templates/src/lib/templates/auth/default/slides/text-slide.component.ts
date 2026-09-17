import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'lib-text-slide',
  imports: [],
  template: `
    <div class="text-slide">
      <h3 class="text-slide__title">{{ title() }}</h3>
      <p class="text-slide__desc">{{ description() }}</p >
    </div>
  `,
  styles:`
    @use '@mercatura/ui/styles/mercatura' as *;

    .text-slide {
        text-align: center;
        margin-bottom: 20px;
        
        &__title {
          font-size: 24px;
          font-weight: $font-semibold;
          margin-bottom: .5rem;
        }

        &__desc {
          margin-bottom: 1rem;
        }
    }
  `,
})
export class TextSlideComponent {
  public readonly title: InputSignal<string> =
    input<string>('');

  public readonly description: InputSignal<string> =
    input<string>('');
}
