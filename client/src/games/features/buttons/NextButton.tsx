import { GameButton } from '@games/ui'
import { type FC } from 'react'

interface NextButtonProps {
  onClick?: () => void
}

export const NextButton: FC<NextButtonProps> = (props) => {
  const { onClick = () => {} } = props
  return (
    <GameButton
      variant='success'
      type="submit"
      onClick={onClick}
    >
      <span>NEXT</span>
    </GameButton>
  )
}
