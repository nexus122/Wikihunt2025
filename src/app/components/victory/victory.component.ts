import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { GameService } from '../../services/game.service';
import { Store } from '@ngrx/store';
import { GameState } from '../../store/game/game.state';

@Component({
  selector: 'app-victory',
  standalone: true,
  imports: [RouterModule, CommonModule, DecimalPipe],
  templateUrl: './victory.component.html',
  styleUrl: './victory.component.scss',
})
export class VictoryComponent implements OnInit {
  gameService = inject(GameService);
  store = inject(Store<{ game: GameState }>);
  steps = 0;
  objective = '';
  objectiveImage = '';
  shareText = '';
  gameDuration = 0;

  ngOnInit() {
    // Obtener el número de pasos
    this.gameService.pageHistory$.subscribe((history) => {
      this.steps = history.length;
      this.updateShareText();
    });

    // Obtener el objetivo y su imagen
    this.objective = this.gameService.objective;
    const objectiveData = this.gameService.selectorItems.find(
      (item) => item.name === this.objective
    );
    if (objectiveData) {
      this.objectiveImage = objectiveData.img;
    }

    // Suscribirse al estado del juego
    this.store
      .select((state) => state.game)
      .subscribe((gameState) => {
        if (gameState.startTime && gameState.endTime) {
          const duration =
            (new Date(gameState.endTime).getTime() -
              new Date(gameState.startTime).getTime()) /
            1000;
          this.gameDuration = Math.round(duration);
          this.updateShareText();
        }
      });

    // Preparar el texto inicial para compartir
    this.updateShareText();
  }

  updateShareText() {
    const minutes = Math.floor(this.gameDuration / 60);
    const seconds = this.gameDuration % 60;
    const timeText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    this.shareText = `¡He encontrado a ${this.objective} en ${this.steps} pasos (${timeText}) en WikiHunt! ¿Puedes hacerlo mejor?`;
  }

  shareTwitter() {
    const url = encodeURIComponent(window.location.origin);
    const text = encodeURIComponent(this.shareText);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank'
    );
  }

  shareFacebook() {
    const url = encodeURIComponent(window.location.origin);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      '_blank'
    );
  }

  shareWhatsapp() {
    const url = encodeURIComponent(window.location.origin);
    const text = encodeURIComponent(this.shareText);
    window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.shareText);
  }

  getObjectiveImage(): string {
    return (
      this.objectiveImage ||
      this.gameService.selectorItems?.find(
        (item) => item.name === this.objective
      )?.img ||
      ''
    );
  }
}
