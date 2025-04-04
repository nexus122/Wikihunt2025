import { Routes } from '@angular/router';
import { ObjectiveSelectorComponent } from './components/objective-selector/objective-selector.component';
import { GameComponent } from './components/game/game.component';
import { VictoryComponent } from './components/victory/victory.component';

export const routes: Routes = [
  {
    path: '',
    component: ObjectiveSelectorComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
  {
    path: 'victory',
    component: VictoryComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
