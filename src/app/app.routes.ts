import { Routes } from '@angular/router';
import { ObjectiveSelectorComponent } from './components/objective-selector/objective-selector.component';
import { GameComponent } from './components/game/game.component';
import { VictoryComponent } from './components/victory/victory.component';
import { HasObjectiveGuard } from './guards/has-objective.guard';
import { HasWonGuard } from './guards/has-won.guard';

export const routes: Routes = [
  {
    path: '',
    component: ObjectiveSelectorComponent,
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [HasObjectiveGuard],
  },
  {
    path: 'victory',
    component: VictoryComponent,
    canActivate: [HasWonGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
