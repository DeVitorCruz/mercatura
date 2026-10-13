import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconComponent } from '@mercatura/ui';

@Component({
  selector: 'app-placeholder',
  imports: [IconComponent],
  templateUrl: './placeholder.component.html',
  styleUrl: './placeholder.component.scss',
})
export class PlaceholderComponent {
  private readonly ROUTE: ActivatedRoute = 
    inject(ActivatedRoute);
  public readonly TITLE: string = 
    this.ROUTE.snapshot.data['title'] ?? 'Coming Soon';
}
