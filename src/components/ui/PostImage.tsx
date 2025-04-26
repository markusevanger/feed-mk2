'use client'

import Image from 'next/image'
import { Media } from '@/payload-types'
import { Suspense } from 'react'
import { MediaSkeleton } from './skeletons/MediaSkeleton'
interface PostImageProps {
  media: Media
}

export function PostImage({ media }: PostImageProps) {
  return (
    <Suspense fallback={<MediaSkeleton />}>
      {media.url && (
        <>
          <Image
            className={`rounded-md object-cover h-full w-full`}
            src={media.url}
            alt={media.alt || ''}
            width={media.width || 0}
            height={media.height || 0}
          />
        </>
      )}
    </Suspense>
  )
}
