export interface Game {
  name: string
  instructions: string
  actions: GameAction[]
  questions: GameQuestion[]
}

export interface GameAction {
  type: string
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
