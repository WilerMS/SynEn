import { type FC } from 'react'
import cn from 'classnames'

interface Props {
  id: string
  name: string
  placeholder: string
  className?: string
}

const GameInput: FC<Props> = ({
  placeholder,
  id,
  name
}) => {
  return (
    <div className='w-full h-full'>
      <input
        id={id}
        type="text"
        name={name}
        autoComplete='off'
        className={cn(
          'block w-full px-4 py-4 border-2 text-md rounded-xl outline-none',
          'game-input'
        )}
        placeholder={placeholder}
      />
      <p className="input-success hidden mt-1 ml-2 text-sm text-green-600">Nice! You get it 🫡</p>
      <p className="input-error hidden mt-1 ml-2 text-sm text-red-600">Ouch! Something is wrong 😓</p>
    </div>
  )
}

export default GameInput
