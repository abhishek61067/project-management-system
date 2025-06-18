import { AuditLog } from '@prisma/client'
import { Avatar, AvatarImage } from './ui/avatar'
import { generateLogMessage } from '@/lib/generate-log-message'
import { format } from 'date-fns'

interface ActivityItemProp {
  data: AuditLog
}

export const ActivityItem = ({ data }: ActivityItemProp) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-1">
        <p className="text-sm text-muted-foreground">
          <span className="text-neutral-700">{data.userName + ' '}</span>
          {generateLogMessage(data)}
        </p>
        <p>{format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
      </div>
    </li>
  )
}
