import { createReducer, on } from '@ngrx/store';
import { GameState, initialGameState } from './game.state';
import { startGame, endGame, resetGame } from './game.actions';

export const gameReducer = createReducer(
  initialGameState,
  on(startGame, (state, { startTime, objective }) => ({
    ...state,
    startTime,
    objective,
  })),
  on(endGame, (state, { endTime }) => ({
    ...state,
    endTime,
  })),
  on(resetGame, () => initialGameState)
);
