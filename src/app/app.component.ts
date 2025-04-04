import { Component, inject } from '@angular/core';
import { WikiapiService } from './services/wikiapi.service';
import { GameService } from './services/game.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  wikiApiService = inject(WikiapiService);
  gameService = inject(GameService);
  pageData$ = this.gameService.pageData$;
  breadcrumbs$ = this.gameService.pageHistory$;
}
