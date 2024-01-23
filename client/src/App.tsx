import { type FormEvent, useState, useRef, useEffect } from 'react'
import cn from 'classnames'

import GameInput from '@components/Game/GameInput'
import RandomDivs from '@components/RandomDivs'
import Score from '@components/Score'
import irregularVerbs from '@constants/irregular-verbs'
import { disorderArray } from '@utils/index'
import { useLocalStorage } from '@hooks/useLocalStorage'
import GameContainer from '@components/Game/GameContainer'
import GameButton from '@components/Game/GameButton'
import GamePrompt from '@components/Game/GamePrompt'

const App = () => {
  const [verbs, setVerbs] = useState(() => disorderArray(irregularVerbs))
  const [changing, setChanging] = useState(false)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useLocalStorage('highscore', 0)
  const [inputData, setInputData] = useState({
    infinitive: '',
    past: '',
    participle: ''
  })

  const infinitiveRef = useRef<HTMLInputElement>(null)
  const pastRef = useRef<HTMLInputElement>(null)
  const participleRef = useRef<HTMLInputElement>(null)

  const [infinitiveSucces, setInfinitiveSuccess] = useState<boolean>()
  const [pastSucces, setPastSuccess] = useState<boolean>()
  const [participleSucces, setParticipleSuccess] = useState<boolean>()

  const currentWord = verbs[index].translation

  const handleClickNext = (e: FormEvent) => {
    e.preventDefault()
    const nextIndex = (verbs.length - 1) === index ? 0 : index + 1
    const nextScore = score + 1
    const nextHighScore = highScore > nextScore ? highScore : nextScore

    const { infinitive, past, participle } = inputData

    if (infinitive.toLowerCase() !== verbs[index].infinitive.toLowerCase()) {
      console.log(infinitiveRef)
      setInfinitiveSuccess(false)
      infinitiveRef.current?.focus()

      return
    } else {
      setInfinitiveSuccess(true)
    }

    if (past.toLowerCase() !== verbs[index].past.toLowerCase()) {
      setPastSuccess(false)
      pastRef.current?.focus()
      return
    } else {
      setPastSuccess(true)
    }

    if (participle.toLowerCase() !== verbs[index].participle.toLowerCase()) {
      setParticipleSuccess(false)
      participleRef.current?.focus()
      return
    } else {
      setParticipleSuccess(true)
    }

    setChanging(true)

    setTimeout(() => {
      setChanging(false)
      setIndex(nextIndex)
      setScore(nextScore)
      setHighScore(nextHighScore)

      setInputData({ infinitive: '', past: '', participle: '' })
      setInfinitiveSuccess(undefined)
      setPastSuccess(undefined)
      setParticipleSuccess(undefined)
      infinitiveRef.current?.focus()
    }, 1000)
  }

  const handleClickSkip = (e: FormEvent) => {
    e.preventDefault()

    setChanging(true)
    setTimeout(() => {
      const nextIndex = (verbs.length - 1) === index ? 0 : index + 1
      setChanging(false)
      setScore(0)
      setIndex(nextIndex)
      setInputData({ infinitive: '', past: '', participle: '' })
      setInfinitiveSuccess(undefined)
      setPastSuccess(undefined)
      setParticipleSuccess(undefined)
      infinitiveRef.current?.focus()
    }, 1000)
  }

  const handleWriteAnswers = (name: string, value: string) => {
    setInputData({
      ...inputData,
      [name]: value
    })
  }

  useEffect(() => {
    infinitiveRef.current?.focus()
  }, [])

  return (
    <div className="bg-gradient w-screen min-h-screen center">
      <GameContainer>
        <form
          className={cn(
            'w-full h-full p-10 z-10',
            changing ? 'opacity-0' : '',
            'relative grid grid-rows-[2fr_3fr] transition-all duration-500'
          )}
          onSubmit={handleClickNext}
        >

          <div className='absolute left-0 top-0 w-full p-2'>
            <Score score={score} highScore={highScore} />
          </div>

          <GamePrompt title={currentWord} />

          {/* ANSWER APTIONS */}
          <div className="options flex flex-col gap-1">
            <div className="h-[90px]">
              <GameInput
                inputRef={infinitiveRef}
                name='infinitive'
                success={infinitiveSucces}
                value={inputData.infinitive}
                onChange={handleWriteAnswers}
                placeholder='Write the verb in infinitive'
              />
            </div>
            <div className="h-[90px]">
              <GameInput
                inputRef={pastRef}
                name='past'
                success={pastSucces}
                value={inputData.past}
                onChange={handleWriteAnswers}
                placeholder='Write the verb in past'
              />
            </div>
            <div className="h-[90px]">
              <GameInput
                inputRef={participleRef}
                name='participle'
                success={participleSucces}
                value={inputData.participle}
                onChange={handleWriteAnswers}
                placeholder='Write the verb in participle'
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="action">
            <div className="w-full h-full flex justify-between items-center gap-5">
              <GameButton variant='danger' onClick={handleClickSkip}>
                <span>SKIP</span>
              </GameButton>
              <GameButton type="submit" variant='success'>
                <span>NEXT</span>
              </GameButton>
            </div>
          </div>
        </form>

        <div
          className={cn(
            'absolute',
            'w-full h-full p-10',
            !changing ? 'opacity-0' : '',
            '!bg-white !bg-opacity-20 center rounded-xl overflow-hidden transition-all duration-500'
          )}
        >
          <div>
            {changing &&
              <div>
                <h3 className='text-[#ffffffec] text-shadow-lg font-extrabold text-4xl uppercase mt-4 break-all text-center transition-all duration-300'>{verbs[index].infinitive}</h3>
                <h3 className='text-[#ffffffec] text-shadow-lg font-extrabold text-4xl uppercase mt-4 break-all text-center transition-all duration-300'>{verbs[index].past}</h3>
                <h3 className='text-[#ffffffec] text-shadow-lg font-extrabold text-4xl uppercase mt-4 break-all text-center transition-all duration-300'>{verbs[index].participle}</h3>
              </div>
            }
          </div>

        </div>
      </GameContainer>

      <RandomDivs
        className='fixed w-full h-full'
        numOfDivs={15}
        maxDivsWidth={300}
        minDivsWidth={100}
        minDivsHeight={100}
        maxDivsHeight={150}
      />
    </div>
  )
}

export default App
