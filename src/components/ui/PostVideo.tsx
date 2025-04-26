'use client'

import { Media } from '@/payload-types'
import { Suspense } from 'react'
import { MediaSkeleton } from './skeletons/MediaSkeleton'
interface PostVideoProps {
  media: Media
}

export function PostVideo({ media }: PostVideoProps) {
  return (
    <Suspense fallback={<MediaSkeleton />}>
      {media.url && (
        <video
          className="rounded-md w-full h-full object-cover"
          muted
          autoPlay
          loop
          src={media.url}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </Suspense>
  )
}
