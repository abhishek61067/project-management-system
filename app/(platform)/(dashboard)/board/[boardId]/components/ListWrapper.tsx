import React from 'react'

interface ListWrapperProps {
  children: React.ReactNode
}

const ListWrapper = ({ children }: ListWrapperProps) => {
  return <li className="select-none h-full shrink-0 w-[272px]">{children}</li>
}

export default ListWrapper
