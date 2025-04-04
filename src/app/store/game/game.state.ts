export interface GameState {
  startTime: Date | null;
  endTime: Date | null;
  objective: string | null;
}

export const initialGameState: GameState = {
  startTime: null,
  endTime: null,
  objective: null,
};
