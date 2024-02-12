import { User2 } from 'lucide-react'

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg gap-2 text-neutral-700">
        <User2 className="h-6 w-6" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          role="button"
          className="flex flex-col justify-center items-center aspect-video relative h-full w-full bg-muted rounded-sm gap-y-1 hover:opacity-75 transition p-2"
        >
          <p className="text-sm">Create new board</p>
          <span className="text-xs">5 remaining</span>
        </div>
      </div>
    </div>
  )
}
