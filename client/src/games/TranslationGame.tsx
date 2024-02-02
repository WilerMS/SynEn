import { useState, type FC, type FormEvent, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '@components/Loader'
import { getGameById } from '@api/game'
import { GameInput, GamePrompt } from '@games/ui'
import { useScore, GameScore, NextButton, SkipButton } from '@games/features'
import { $, getDataFromForm, sanitizeText } from '@utils/index'
import { type Game } from 'types'

interface Props {
  game: Game
}

const TranslationGame: FC<Props> = (props) => {
  const { game } = props

  const gameFormRef = useRef<HTMLFormElement>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const { score, incrementScore, resetScore } = useScore()

  const currentQuestion = game.questions[currentQuestionIndex]
  const gameActions = game.actions

  const advanceToNextQuestion = () => {
    gameFormRef.current?.reset()
    setCurrentQuestionIndex(
      prev => (game.questions.length - 1) > prev ? prev + 1 : 0
    )
    const inputActions = $('.action-inputs')!.children

    for (const input of inputActions) {
      input.querySelector('input')?.classList.remove('game-input-danger')
      input.querySelector('input')?.classList.remove('game-input-success')
      input.querySelector('input')?.classList.add('game-input')
    }

    inputActions[0].querySelector('input')?.focus()
  }

  const handleCheckQuestion = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = getDataFromForm(e.currentTarget)
    const answersOk = currentQuestion.answers
      .toReversed()
      .map((answer, index: number, self) => {
        const actionKey = `action-${self.length - 1 - index}`
        const answerByUser = formData[actionKey]
        console.log({ answer, answerByUser, formData, actionKey, self })
        const isAnswerOk = sanitizeText(answer.value) === sanitizeText(answerByUser)
        const currentAnswerInput = $<HTMLInputElement>(`#${actionKey}`)

        // Focus in the first input which has an error
        if (!isAnswerOk) currentAnswerInput?.focus()
        currentAnswerInput?.classList.remove('game-input')
        currentAnswerInput?.classList.toggle('game-input-danger', !isAnswerOk)
        currentAnswerInput?.classList.toggle('game-input-success', isAnswerOk)

        return isAnswerOk
      })
      .every(Boolean)

    if (answersOk) {
      advanceToNextQuestion()
      incrementScore()
    }
  }

  const handleSkipQuestion = () => {
    resetScore()
    advanceToNextQuestion()
  }

  return (
    <form
      ref={gameFormRef}
      onSubmit={handleCheckQuestion}
      className=''
    >
      <div className="absolute left-0 top-0 w-full p-2">
        <GameScore gameId={game.gameId} score={score} />
      </div>
      <div className="w-full h-full">
        <GamePrompt title={currentQuestion.prompt} image={currentQuestion.image} />
      </div>
      <div className='max-h-[300px] overflow-y-auto no-scrollbar pt-5'>
        <div className='action-inputs flex flex-col justify-center min-h-full'>
          {gameActions.map((action, index) => (
            <div className='h-[90px]' key={index}>
              <GameInput
                name={`action-${index}`}
                id={`action-${index}`}
                placeholder={action.placeholder}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-full flex justify-between items-center gap-5 pt-5">
        <SkipButton onClick={handleSkipQuestion} />
        <NextButton />
      </div>
    </form>
  )
}

export default TranslationGame
