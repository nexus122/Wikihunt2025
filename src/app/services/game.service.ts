import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WikiapiService } from './wikiapi.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WikiModel } from '../models/wikiModels';
import { GameState } from '../store/game/game.state';
import { Store } from '@ngrx/store';
import { endGame, resetGame, startGame } from '../store/game/game.actions';

interface SelectorItem {
  name: string;
  img: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameStarted = false;
  private router = inject(Router);
  store = inject(Store<{ game: GameState }>);
  wikiApiService = inject(WikiapiService);
  pageData$ = new BehaviorSubject<WikiModel | null>(null);
  gameState$!: Observable<GameState>;
  currentIndex = 0;
  private pageHistorySubject = new BehaviorSubject<string[]>([]);
  pageHistory$ = this.pageHistorySubject.asObservable();
  objective: string = '';

  selectorItems: SelectorItem[] = [
    {
      name: 'Albert Einstein',
      img: 'https://pbs.twimg.com/media/DgXr0_SWAAAYQhu.jpg',
      description: 'Físico teórico alemán',
    },
    {
      name: 'Isaac Newton',
      img: 'https://i.seadn.io/gae/QLm9rQNos6D8bFrg_oxp3YilnNcUsKWtAml5ZZ2czdNrRiLVc67bqWzerHXEdc7Mkq5xotaCCj9pIKFdiO4cjiQ-J6sYh-FxRvs9mg?auto=format&dpr=1&w=1000',
      description: 'Físico y matemático inglés',
    },
    {
      name: 'Galileo Galilei',
      img: 'https://i.seadn.io/gae/DBScex9xqXTUtavHOmKu8VzvNPCLng7yLQceZsRb6ct9U9dQ5erdwpZ9jYx7efcCFga5Tqw3W9E8UO9Sd3bPv-FuZUU4dJRDjHU2-w?auto=format&dpr=1&w=1000',
      description: 'Astrónomo, matemático y físico italiano',
    },
    {
      name: 'Marie Curie',
      img: 'https://cache.teia.rocks/ipfs/bafkreib6yoifrk765em3lhr3vpttjo7cfvfqhy5esoh7eia6bmlf7voooi',
      description: 'Física y química polaca-francesa',
    },
    {
      name: 'Stephen Hawking',
      img: 'https://i.seadn.io/gae/fMSK1jBqFg68HV8lIajF-9aUNPJQhLQu6Dv8wENvsbpl5B59CLj0lOs14ZtXj4TvDefMYL2r5w14PvtsppDukBPsJPc5_GVzSwg_Gw?auto=format&dpr=1&w=1000',
      description: 'Físico teórico británico',
    },
    {
      name: 'Nikola Tesla',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7bbskPZSeL1eBdEIzrisCAKx9xKITTDA2Kg&s',
      description: 'Inventor e ingeniero serbio-estadounidense',
    },
  ];

  getPage(term: string) {
    if (this.objective === term) {
      this.endGame();
      this.router.navigate(['/victory']);
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
      this.pageData$.next(data);
      const currentHistory = this.pageHistorySubject.value;
      this.pageHistorySubject.next([...currentHistory, data.titulo]);
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
      this.gameStarted = true;
    }
  }

  endGame() {
    const endTime = new Date();
    this.store.dispatch(endGame({ endTime }));
  }

  resetGame() {
    this.store.dispatch(resetGame());
    this.gameStarted = false;
    this.pageHistorySubject.next([]);
    this.pageData$.next(null);
  }
}
