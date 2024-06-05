'use client'
import { ListWithCards } from '@/types'
import ListForm from './ListForm'
import { useEffect, useState } from 'react'
import { ListItem } from './ListItem'

import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useAction } from '@/hooks/use-action'
import { toast } from 'sonner'
import { updateListOrder } from '@/actions/update-list-order'
import { updateCardOrder } from '@/actions/update-card-order'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

// take the element from start index and move to end index
function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success('list reordered')
    },
    onError: (e) => {
      toast.error(e)
    },
  })
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success('card reordered')
    },
    onError: (e) => {
      toast.error(e)
    },
  })

  // optimistic mutation
  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result

    if (!destination) {
      return
    }

    // if dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // uesr moves a list
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      )
      setOrderedData(items)
      // server action
      executeUpdateListOrder({ items, boardId })
    }

    // user moves a card
    if (type === 'card') {
      console.log('moving card')
      let newOrderedData = [...orderedData]

      //  source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      )
      console.log('sourcelist: ', sourceList)

      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      )

      console.log('dest list: ', destinationList)

      if (!sourceList || !destinationList) {
        console.log('no source or destination list')
        return
      }

      // check if cards exist on the sourcelist
      if (!sourceList.cards) {
        console.log('no destination cards')
        sourceList.cards = []
      }

      // check if cards exist on the destinationList
      if (!destinationList.cards) {
        console.log('no destination card')
        destinationList.cards = []
      }

      // moving card in same list
      if (source.droppableId === destination.droppableId) {
        console.log('moving card in same list')
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        )

        reorderedCards.forEach((card, index) => {
          card.order = index
        })

        sourceList.cards = reorderedCards
        setOrderedData(newOrderedData)
        // server action
        console.log('performing server action for card order')
        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards,
        })
      }
      // user moves card to other list
      else {
        console.log('moving card in different list')
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        // assign new listId to moved card
        movedCard.listId = destination.droppableId

        // add card to destination list
        destinationList.cards.splice(destination.index, 0, movedCard)

        // update order for each card
        sourceList.cards.forEach((card, index) => {
          card.order = index
        })

        destinationList.cards.forEach((card, index) => {
          card.order = index
        })

        setOrderedData(newOrderedData)
        // to do: trigger a server action
        executeUpdateCardOrder({
          boardId: boardId,
          items: destinationList.cards,
        })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => {
          return (
            <ol
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-x-3 h-full"
            >
              {orderedData.map((list, index) => {
                return <ListItem key={list.id} index={index} data={list} />
              })}
              {provided.placeholder}
              <ListForm />
              <div className="flex-shrink-0 w-1" />
            </ol>
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}

export default ListContainer
