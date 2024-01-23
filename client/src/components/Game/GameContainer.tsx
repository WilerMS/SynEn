import cn from 'classnames'
import React, { type FC } from 'react'

interface Props {
  children: React.ReactNode
}

const GameContainer: FC<Props> = ({
  children
}) => {
  return (
    <div
      className={cn(
        'bg-glass',
        'relative rounded-2xl z-10 center overflow-hidden p-2', // min-w-[400px] max-w-[750px] max-h-[625px]
        'transition-all duration-300'
      )}
    >
      <div className=' w-full h-full relative !bg-white !bg-opacity-20 rounded-xl overflow-hidden'>
        {children}
      </div>
    </div>
  )
}

export default GameContainer
