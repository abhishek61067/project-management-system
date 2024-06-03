'use client'
import { ListWithCards } from '@/types'
import { ListHeader } from './ListHeader'
import { ElementRef, useRef, useState } from 'react'
import { CardForm } from './CardForm'
import CardItem from './CardItem'
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
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f1f1] shadow-md pb-2">
        <ListHeader onAddCard={enableEditing} data={data} />
        <ol className="flex flex-col gap-y-2 p-2">
          {data.cards.map((card, index) => {
            return <CardItem index={index} key={card.id} data={card} />
          })}
        </ol>
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
}
