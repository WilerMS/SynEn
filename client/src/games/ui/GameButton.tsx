import { type ButtonHTMLAttributes, type DetailedHTMLProps, type FC } from 'react'
import { type VariantType } from './definitions'
import cn from 'classnames'

type Variant = Exclude<VariantType, 'info'>

const getVariantColors = (variant: Variant) => {
  const variants: Record<Variant, string[]> = {
    danger: ['from-red-400', 'via-red-500', 'to-red-600', 'shadow-red-500/50'],
    success: ['from-green-400', 'via-green-500', 'to-green-600', 'shadow-green-500/50'],
    default: ['from-teal-400', 'via-teal-500', 'to-teal-600', 'shadow-teal-500/50'],
    primary: ['from-blue-400', 'via-blue-500', 'to-blue-600', 'shadow-blue-500/50']
  }
  return variants[variant] ?? variants.default
}

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: Variant
}

const GameButton: FC<Props> = ({ children, variant, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'w-full text-white font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-300 shadow-lg',
        'bg-gradient-to-r  hover:bg-gradient-to-br hover:scale-[1.02]',
        ...getVariantColors(variant ?? 'default'),
        ...(props.className ?? '')
      )}
    >
      {children}
    </button>
  )
}

export default GameButton
