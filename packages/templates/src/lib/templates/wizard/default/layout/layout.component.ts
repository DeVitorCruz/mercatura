import { Component, input, InputSignal } from '@angular/core';
import { WizardStep } from '../../wizard.interface';

@Component({
  selector: 'lib-wizard-layout',
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class WizardLayoutComponent {
  public readonly steps: InputSignal<WizardStep[]> =
    input.required<WizardStep[]>();
  public readonly currentStep: InputSignal<number> =
    input<number>(1); 
}
