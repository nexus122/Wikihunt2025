import { createAction, props } from '@ngrx/store';

export const startGame = createAction(
  '[Game] Start Game',
  props<{ startTime: Date; objective: string }>()
);

export const endGame = createAction(
  '[Game] End Game',
  props<{ endTime: Date }>()
);

export const resetGame = createAction('[Game] Reset Game');
