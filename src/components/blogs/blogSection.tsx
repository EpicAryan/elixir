import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import type { Post } from '../../../@types/content'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { BlogGrid } from '../blogs/blogGrid'

type HomePagePost = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt'> & {
  author: { name: string; image?: SanityImageSource }
  category: { title: string }
}

export const revalidate = 60

async function getFeaturedPosts() {
  const posts = await client.fetch<HomePagePost[]>(postsQuery)
  return posts
}

export const BlogSection = async () => {
  const posts = await getFeaturedPosts()

  return (
    <section className='pb-16 sm:pb-0 '>
      <BlogGrid posts={posts} />
    </section>
  )
}
