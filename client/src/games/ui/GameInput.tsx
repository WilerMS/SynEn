import { type FC } from 'react'
import cn from 'classnames'

interface Props {
  name: string
  placeholder: string
  inputRef: any
  success?: boolean
  value?: string
  onChange: (name: string, value: string) => void
}

const GameInput: FC<Props> = ({
  placeholder,
  success,
  value,
  name,
  inputRef,
  onChange
}) => {
  return (
    <div className='w-full h-full'>
      <input
        ref={inputRef}
        type="text"
        id="success"
        onChange={(e) => onChange(name, e.currentTarget.value)}
        value={value}
        autoComplete='off'
        className={cn(
          'block w-full px-4 py-4 bg-opacity-60 border-2 text-md rounded-xl outline-none',
          success === undefined
            ? 'bg-emerald-50 border-teal-600 text-teal-900  placeholder-teal-700'
            : success
              ? 'bg-green-50 border-emerald-500 text-green-900  placeholder-green-700'
              : 'bg-red-50 border-red-500 text-red-900 placeholder-red-700',
          ''
        )}
        placeholder={placeholder}
      />
      {
        success !== undefined
          ? success
            ? <p className="mt-1 ml-2 text-sm text-green-600">Nice! You get it 🫡</p>
            : <p className="mt-1 ml-2 text-sm text-red-600">Ouch! Something is wrong 😓</p>
          : <></>
      }

    </div>
  )
}

export default GameInput
