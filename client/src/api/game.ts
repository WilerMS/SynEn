import { irregularVerbsGame } from '@constants/irregularVerbs'
import { regularVerbsGame } from '@constants/regularVerbs'
import { animalsGame } from '@constants/animalsGame'
import { delay, disorderArray } from '@utils/index'
import { type Game } from 'types'

export const getGames = async () => {

}

export const getGameById = async (id: string | number): Promise<Game> => {
  await delay(2000)
  return {
    ...irregularVerbsGame,
    questions: disorderArray(irregularVerbsGame.questions)

  }
}
