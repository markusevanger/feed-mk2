import { Skeleton } from '@/components/ui/skeleton'

export function MediaSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full h-[300px] rounded-md" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}
