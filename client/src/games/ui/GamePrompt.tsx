import { type FC } from 'react'
import cn from 'classnames'
import { type SizeType } from './definitions'

interface Props {
  title?: string
  image?: string
  description?: string
  size?: SizeType
}

const GamePrompt: FC<Props> = ({
  title,
  image,
  description,
  size = 'medium'
}) => {
  return (
    <div className="w-full h-full center flex-col min-h-[150px] ">
      {title && <h2
        className={cn(
          'text-[#ffffffec] text-shadow-lg font-extrabold text-7xl uppercase mt-4 break-all text-center'
        )}
      >
        {title}
      </h2>}
      {image &&
        <img className='rounded-lg max-h-[150px] w-full h-full object-cover mt-6 opacity-90' src={image} alt="" />
      }
      {description &&
        <span className='text-[#ffffffec] text-shadow-lg text-lg mt-2 capitalize'>{description}</span>
      }
    </div>
  )
}

export default GamePrompt
