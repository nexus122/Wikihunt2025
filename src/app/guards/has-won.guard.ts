import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameState } from '../store/game/game.state';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HasWonGuard implements CanActivate {
  private store = inject(Store<{ game: GameState }>);
  private router = inject(Router);

  canActivate() {
    return this.store
      .select((state) => state.game)
      .pipe(
        take(1),
        map((gameState) => {
          if (!gameState.endTime) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        })
      );
  }
}
