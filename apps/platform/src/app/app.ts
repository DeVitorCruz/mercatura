import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { ThemeService } from '@mercatura/ui';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title: string = 'platform';

  private readonly THEME: ThemeService = inject(ThemeService);

  public ngOnInit(): void {
      this.THEME.setTheme(this.THEME.theme());
  }
}
