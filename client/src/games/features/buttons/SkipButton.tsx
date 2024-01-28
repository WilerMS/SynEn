import { GameButton } from '@games/ui'
import { type FC } from 'react'

interface SkipButtonProps {
  onClick?: () => void
}

export const SkipButton: FC<SkipButtonProps> = (props) => {
  const { onClick = () => { } } = props
  return (
    <GameButton variant='danger' onClick={onClick}>
      <span>SKIP</span>
    </GameButton>
  )
}
