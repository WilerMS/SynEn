import RandomDivs from '@components/RandomDivs'
import TranslationGame from '@games/TranslationGame'
import { GameContainer } from '@games/ui'

const App = () => {
  return (
    <div className="bg-gradient w-screen min-h-screen center">
      <GameContainer>
        <TranslationGame gameId={1} />
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
