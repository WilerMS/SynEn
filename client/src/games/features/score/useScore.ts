import { useState } from 'react'

export const useScore = () => {
  const [score, setScore] = useState(0)

  const incrementScore = () => setScore(prev => prev + 1)
  const resetScore = () => setScore(0)

  return {
    score,
    incrementScore,
    resetScore
  }
}
