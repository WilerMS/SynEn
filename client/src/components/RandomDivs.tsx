import { useState, type HTMLProps, type FC } from 'react'

interface DivPropTypes {
  rotation: number
  top: number
  left: number
  opacity: number
  width: number
  height: number
}

interface Props extends HTMLProps<HTMLDivElement> {
  numOfDivs: number
  maxDivsWidth?: number
  minDivsWidth?: number
  maxDivsHeight?: number
  minDivsHeight?: number
}

const RandomDivs: FC<Props> = ({
  numOfDivs,
  maxDivsWidth = 10,
  minDivsWidth = 10,
  maxDivsHeight = 10,
  minDivsHeight = 10,
  ...props
}) => {
  const [divs, setDivs] = useState<DivPropTypes[]>(() => {
    return Array.from({ length: numOfDivs }, () => {
      const rotation = Math.random() * 360
      const top = Math.random() * 100
      const left = Math.random() * 100
      const opacity = Math.random()
      const width = Math.floor(Math.random() * (maxDivsWidth - minDivsWidth) + minDivsWidth)
      const height = Math.floor(Math.random() * (maxDivsHeight - minDivsHeight) + minDivsHeight)
      return { rotation, top, left, opacity, width, height }
    })
  })

  return (
    <div {...props}>
      {divs.map((div, index) => (
        <div
          key={index}
          style={{
            transform: `rotate(${div.rotation}deg)`,
            position: 'absolute',
            top: `${div.top}%`,
            left: `${div.left}%`,
            width: `${div.width}px`,
            height: `${div.height}px`,
            opacity: `${div.opacity}`
          }}
          className="bg-glass rounded-lg rotate-12 w-10 h-10"
        />
      ))}
    </div>
  )
}

export default RandomDivs
