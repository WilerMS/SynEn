import { irregularVerbsGame } from '@constants/irregularVerbs'
import { regularVerbsGame } from '@constants/regularVerbs'
import { animalsGame } from '@constants/animalsGame'
import { delay, disorderArray } from '@utils/index'
import { type Game } from 'types'
import { games } from '@constants/games'

export const getGames = (): Game[] => {
  return games
}

export const getGameById = (id: string | number): Game => {
  const games = getGames()
  const game = games.find((_game) => _game.gameId === Number(id))!
  return {
    ...game,
    questions: disorderArray(game.questions)
  }
}
