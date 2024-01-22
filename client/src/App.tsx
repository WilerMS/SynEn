import { type FormEvent, useState, useRef, useEffect } from 'react'
import cn from 'classnames'

import AnswerInput from '@components/AnswerInput'
import RandomDivs from '@components/RandomDivs'
import Score from '@components/Score'
import irregularVerbs from '@constants/irregular-verbs'
import { disorderArray } from '@utils/index'
import { useLocalStorage } from '@hooks/useLocalStorage'
import Check from '@components/Check'

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
      <div className="relative bg-glass min-w-[400px] max-w-[750px] max-h-[625px] rounded-2xl z-10 center overflow-hidden p-2 transition-all duration-300">

        <form
          className={cn(
            'w-full h-full p-10 z-10',
            changing ? 'opacity-0' : '',
            'relative !bg-white !bg-opacity-20 grid grid-rows-[2fr_3fr] rounded-xl overflow-hidden transition-all duration-500'
          )}
          onSubmit={handleClickNext}
        >

          <div className='absolute left-0 top-0 w-full p-2'>
            <Score score={score} highScore={highScore} />
          </div>

          <div id="word" className='center'>
            <h2 className='text-[#ffffffec] text-shadow-lg font-extrabold text-7xl uppercase mt-4 break-all text-center transition-all duration-300'>
              {currentWord}
            </h2>
          </div>

          {/* ANSWER APTIONS */}
          <div className="options flex flex-col gap-1">
            <AnswerInput
              inputRef={infinitiveRef}
              name='infinitive'
              success={infinitiveSucces}
              value={inputData.infinitive}
              onChange={handleWriteAnswers}
              placeholder='Write the verb in infinitive'
            />
            <AnswerInput
              inputRef={pastRef}
              name='past'
              success={pastSucces}
              value={inputData.past}
              onChange={handleWriteAnswers}
              placeholder='Write the verb in past'
            />
            <AnswerInput
              inputRef={participleRef}
              name='participle'
              success={participleSucces}
              value={inputData.participle}
              onChange={handleWriteAnswers}
              placeholder='Write the verb in participle'
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="action">
            <div className="w-full h-full flex justify-between items-center gap-5">
              <button
                type="button"
                onClick={handleClickSkip}
                className="w-full text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-300 hover:scale-[1.02]"
              >
                <span>SKIP</span>
              </button>
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-300 hover:scale-[1.02]"
              >
                <span>NEXT</span>
              </button>
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
            </div>}
          </div>

        </div>
      </div>

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
