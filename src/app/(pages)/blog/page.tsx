import { client } from '@/sanity/lib/client'
import { allPostsQuery } from '@/sanity/lib/queries'
import type { Post } from '../../../../@types/content'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import { BlogArchive } from '@/components/blogs/blogArchive'

type ArchivePagePost = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt' | 'description' | 'readingTime'> & {
  author: { name: string; image?: SanityImageSource }
  category: { title: string }
}

async function getAllPosts() {
  const posts = await client.fetch<ArchivePagePost[]>(allPostsQuery)
  return posts
}

export const revalidate = 60 

const BlogArchivePage = async () => {
  const posts = await getAllPosts()
  return <BlogArchive posts={posts} />
}

export default BlogArchivePage
