import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Post } from '@/components/ui/Post'
import { ModeToggle } from '@/components/ui/modeToggle'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    limit: 10,
  })

  const buildDateRaw = process.env.BUILD_DATE || new Date().toISOString()
  const buildDateObj = new Date(buildDateRaw)

  // Get day, month, year
  const day = buildDateObj.getDate()
  const month = buildDateObj.getMonth() + 1 // Months are zero-indexed
  const year = buildDateObj.getFullYear()

  const formattedBuildDate = `${day}.${month}.${year}`

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center pb-16">
        <h1 className="text-lg font-mono ">
          <span className="italic">feed</span>.markusevanger.no
        </h1>
        <div className="flex justify-center items-center gap-8">
          <p className="text-sm font-mono text-muted-foreground">
            🏗️ Under construction (v. {formattedBuildDate})
          </p>
          <ModeToggle />
        </div>
      </div>

      <div className="flex flex-col gap-36">
        {posts.docs && posts.docs.length > 0 ? (
          posts.docs.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-muted-foreground font-mono">No posts.</p>
          </div>
        )}
      </div>
    </div>
  )
}
