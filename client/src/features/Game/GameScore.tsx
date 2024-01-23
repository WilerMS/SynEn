import { useLocalStorage } from '@hooks/useLocalStorage'
import { useEffect, type FC } from 'react'

interface Props {
  storageKey: string
  score: number
}

const GameScore: FC<Props> = ({ score, storageKey }) => {
  const [highScore, setHighScore] = useLocalStorage(`synen-game-${storageKey}-highscore`, 0)

  useEffect(() => {
    const nextHighScore = highScore > score ? highScore : score
    setHighScore(nextHighScore)
  }, [score])

  return (
    <div className='w-full flex justify-between py-1 px-2 text-emerald-600'>
      <span className="text-shadow-lg">Score: <b>{score}</b></span>
      <span className="text-shadow-lg">Record: <b>{highScore}</b></span>
    </div>
  )
}

export default GameScore
