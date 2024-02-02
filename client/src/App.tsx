import RandomDivs from '@components/RandomDivs'
import TranslationGame from '@games/TranslationGame'
import { GameContainer } from '@games/ui'
import Game from 'pages/Game'
import Home from 'pages/Home'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

const App = () => {
  return (
    <div className="bg-gradient w-screen min-h-screen center">
      <Router>
        <Routes>
          <Route key='home' path='/' element={<Home />} />
          <Route key='game' path='/game/:id' element={<Game />} />
        </Routes>
      </Router>
      <RandomDivs
        className='fixed w-full h-full'
        numOfDivs={10}
        maxDivsWidth={300}
        minDivsWidth={100}
        minDivsHeight={100}
        maxDivsHeight={150}
      />
    </div>
  )
}

export default App
