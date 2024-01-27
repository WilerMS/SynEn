export interface Game {
  gameId: number
  type: string
  name: string
  instructions: string
  actions: GameAction[]
  questions: GameQuestion[]
}

export interface GameAction {
  placeholder: string
  label: string
}

export interface GameQuestion {
  prompt: string
  answers: GameAnswer[]
}

export interface GameAnswer {
  value: string
  clue?: string
}
