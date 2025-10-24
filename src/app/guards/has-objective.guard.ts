import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root',
})
export class HasObjectiveGuard implements CanActivate {
  private gameService = inject(GameService);
  private router = inject(Router);

  canActivate(): boolean {
    if (!this.gameService.objective) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
