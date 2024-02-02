import PlayIcon from '@components/icons/Play'
import { GameContainer } from '@games/ui'
import { useAppNavigate } from '@hooks/useAppNavigate'
import cn from 'classnames'

const Home = () => {
  const { navigate } = useAppNavigate()

  return (
    <div>

      <button
        className={cn(
          'bg-glass',
          'relative rounded-2xl z-10 center overflow-hidden p-2', // min-w-[400px] max-w-[750px] max-h-[625px]
          'transition-all duration-300',
          'hover:scale-105 cursor-pointer'
        )}
        onClick={() => navigate('/game/2')}
        style={{
          // @ts-expect-error
          viewTransitionName: 'container-game',
          contain: 'layout'
        }}
      >
        <div className='w-full h-full p-10 z-10 relative !bg-white !bg-opacity-20 rounded-xl overflow-hidden'>
          <PlayIcon className='scale-[2] text-[#ffffffc6] drop-shadow-lg' />
        </div>
      </button>
    </div>
  )
}

export default Home
