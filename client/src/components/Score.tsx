import { type FC } from 'react'

interface Props {
  score?: number
  highScore?: number
}

const Score: FC<Props> = ({
  score = 0,
  highScore = 0
}) => {
  return (
    <div className='w-full flex justify-between py-1 px-2 text-emerald-600'>
      <span className="text-shadow-lg">Current score: <b>{score}</b></span>
      <span className="text-shadow-lg">High score: <b>{highScore}</b></span>
    </div>
  )
}

export default Score
