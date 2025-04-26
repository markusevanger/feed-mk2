'use client'

import { Media, Post as PostType } from '@/payload-types'
import { PostImage } from './PostImage'
import { PostVideo } from './PostVideo'
import { cn } from '@/lib/utils'
import { MetadataPopup } from './MetadataPopup'

interface PostProps {
  post: PostType
  key: string
}

export function Post({ post, key }: PostProps) {
  return (
    <div key={key}>
      <div className="flex gap-2 w-full justify-between items-center font-mono border-b-2 pb-2 mb-4">
        <h2>{post.title}</h2>
        <p>{post.date && new Date(post.date).toLocaleDateString()}</p>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4">
        {post.media?.map((media) => {
          if (typeof media.mediaItem !== 'string') {
            return (
              <div
                key={media.id || ''}
                className={cn(
                  `h-full w-full relative`,
                  `${isHorizontal(media.mediaItem) ? 'col-span-2' : ''}`,
                )}
              >
                {media.mediaItem.mimeType?.startsWith('image/') ? (
                  <PostImage key={media.id || ''} media={media.mediaItem} />
                ) : (
                  <PostVideo key={media.id || ''} media={media.mediaItem} />
                )}{' '}
                <div className="absolute bottom-2 left-2">
                  {media.mediaItem.exif?.dateTaken && <MetadataPopup media={media.mediaItem} />}
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

const isHorizontal = (media: Media) => {
  if (media.mimeType?.startsWith('image/')) {
    return media.width && media.height && media.width > media.height
  }
  return media.videoOrientation === 'Horizontal'
}
