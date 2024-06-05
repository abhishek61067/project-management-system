'use client'

import { Card } from '@prisma/client'
import { Draggable } from '@hello-pangea/dnd'
import { useCardModal } from '@/hooks/use-card-modal'

interface CardItemProp {
  data: Card
  index: number
}
const CardItem = ({ data, index }: CardItemProp) => {
  const cardModal = useCardModal()
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
            onClick={() => cardModal.onOpen(data.id)}
            className="p-2 bg-white rounded shadow-sm"
          >
            {data.title}
          </div>
        )
      }}
    </Draggable>
  )
}

export default CardItem
