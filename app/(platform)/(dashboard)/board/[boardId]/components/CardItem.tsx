'use client'

import { Card } from '@prisma/client'
import { Draggable } from '@hello-pangea/dnd'

interface CardItemProp {
  data: Card
  index: number
}
const CardItem = ({ data, index }: CardItemProp) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
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
