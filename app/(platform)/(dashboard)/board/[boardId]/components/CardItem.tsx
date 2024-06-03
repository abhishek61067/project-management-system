'use client'

import { Card } from '@prisma/client'

interface CardItemProp {
  data: Card
  index: number
}
const CardItem = ({ data, index }: CardItemProp) => {
  return <div className="p-2 bg-white rounded shadow-sm">{data.title}</div>
}

export default CardItem
