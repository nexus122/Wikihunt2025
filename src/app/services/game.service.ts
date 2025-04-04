import { inject, Injectable } from '@angular/core';
import { WikiapiService } from './wikiapi.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WikiModel } from '../models/wikiModels';
import { GameState } from '../store/game/game.state';
import { Store } from '@ngrx/store';
import { endGame, resetGame, startGame } from '../store/game/game.actions';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameStarted = false; // Nueva propiedad para verificar si el juego ya inició
  store = inject(Store<{ game: GameState }>);
  wikiApiService = inject(WikiapiService);
  pageData$ = new BehaviorSubject<WikiModel | null>(null);
  gameState$!: Observable<GameState>;
  currentIndex = 0;
  private pageHistorySubject = new BehaviorSubject<string[]>([]);
  pageHistory$ = this.pageHistorySubject.asObservable();
  objective: string = '';

  getPage(term: string) {
    if (this.objective === term) {
      this.endGame();
      window.location.href = '/victory';
      return;
    }
    this.wikiApiService.getPage(term).subscribe((data) => {
      this.pageData$.next(data);
      const currentHistory = this.pageHistorySubject.value;
      this.pageHistorySubject.next([...currentHistory, data.titulo]);
    });
    this.currentIndex = 0;
  }

  getRandomPage() {
    this.wikiApiService.getRandomPage().subscribe((data) => {
      this.pageData$.next(data); // Actualiza los datos
      const currentHistory = this.pageHistorySubject.value;
      this.pageHistorySubject.next([...currentHistory, data.titulo]); // Agrega la página al historial
    });
  }

  startGame() {
    this.getRandomPage();
    const startTime = new Date();
    const objective = this.objective;
    this.store.dispatch(startGame({ startTime, objective }));
    this.pageHistorySubject.next([]);
  }

  startGameIfNotStarted() {
    if (!this.gameStarted) {
      this.startGame();
      this.gameStarted = true; // Marca el juego como iniciado
    }
  }

  endGame() {
    const endTime = new Date();
    this.store.dispatch(endGame({ endTime }));
  }

  resetGame() {
    this.store.dispatch(resetGame());
  }
}
