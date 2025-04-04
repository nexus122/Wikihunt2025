import { Component, inject, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WikiModel } from '../../models/wikiModels';
import { CommonModule, NgIf } from '@angular/common';
import { GameService } from '../../services/game.service';
import { LinkSelectorComponent } from '../link-selector/link-selector.component';

@Component({
  selector: 'app-game',
  imports: [CommonModule, NgIf, LinkSelectorComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  gameService = inject(GameService);
  pageData = this.gameService.pageData$;

  ngAfterViewInit() {
    console.log('GameComponent initialized');
    this.gameService.startGameIfNotStarted(); // Llama a un método que verifica si el juego ya inició
  }
}
