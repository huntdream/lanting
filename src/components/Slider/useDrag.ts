import { RefObject, useState } from 'react'

type DragParams = {
  containerRef: RefObject<HTMLDivElement>,
  handlerRef: RefObject<HTMLDivElement>
}

const useDrag = ({ containerRef, handlerRef }: DragParams) => {
  const [offset, setOffset] = useState()

  const onDragStart = () => { }

  return [offset]
}

export default useDrag