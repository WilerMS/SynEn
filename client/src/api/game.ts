import { irregularVerbsGame } from '@constants/irregular-verbs-game'
import { disorderArray } from '@utils/index'
import { type Game } from 'types'

export const getGames = async () => {

}

export const getGameById = async (id: string | number): Promise<Game> => {
  return {
    ...irregularVerbsGame,
    questions: disorderArray(irregularVerbsGame.questions)

  }
}
