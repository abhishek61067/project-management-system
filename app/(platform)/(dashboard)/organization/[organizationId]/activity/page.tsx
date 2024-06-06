import { Separator } from '@/components/ui/separator'
import { ActivityList } from './components/ActivityList'
import { Suspense } from 'react'
import { Info } from '../components/info'

const ActivityPage = () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <Suspense fallback= {<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  )
}

export default ActivityPage
