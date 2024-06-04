'use client'
import { ListWithCards } from '@/types'
import { ListHeader } from './ListHeader'
import { ElementRef, useRef, useState } from 'react'
import { CardForm } from './CardForm'
import CardItem from './CardItem'
import { Draggable, Droppable } from '@hello-pangea/dnd'
interface ListItemProp {
  data: ListWithCards
  index: number
}

export const ListItem = ({ data, index }: ListItemProp) => {
  const [isEditing, setIsEditing] = useState(false)
  const textAreaRef = useRef<ElementRef<'textarea'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textAreaRef.current?.focus()
    })
  }
  const disableEditing = () => {
    setIsEditing(false)
  }

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => {
        return (
          <li
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="shrink-0 h-full w-[272px] select-none"
          >
            <div
              {...provided.dragHandleProps}
              className="w-full rounded-md bg-[#f1f1f1] shadow-md pb-2"
            >
              <ListHeader onAddCard={enableEditing} data={data} />
              <Droppable droppableId={data.id} type={'card'}>
                {(provided) => {
                  return (
                    <ol
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-col gap-y-2 p-2"
                    >
                      {data.cards.map((card, index) => {
                        return (
                          <CardItem index={index} key={card.id} data={card} />
                        )
                      })}
                      {provided.placeholder}
                    </ol>
                  )
                }}
              </Droppable>

              <CardForm
                ref={textAreaRef}
                isEditing={isEditing}
                enableEditing={enableEditing}
                disableEditing={disableEditing}
                listId={data.id}
              />
            </div>
          </li>
        )
      }}
    </Draggable>
  )
}
