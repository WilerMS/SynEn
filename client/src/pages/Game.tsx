import { getGameById } from '@api/game'
import TranslationGame from '@games/TranslationGame'
import { GameContainer } from '@games/ui'
import { useParams } from 'react-router-dom'

const Game = () => {
  const params = useParams()

  const gameId = Number(params.id)
  const currentGame = getGameById(gameId)

  return (
    <GameContainer
      style={{
        viewTransitionName: 'container-game',
        contain: 'layout'
      }}
    >
      <TranslationGame game={currentGame} />
    </GameContainer>
  )
}

export default Game
