import { client } from '@/sanity/lib/client'
import { paginatedPostsQuery } from "@/sanity/lib/queries";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Post } from "../../../../@types/content";

type ArchivePagePost = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt' | 'description' | 'readingTime'> & {
  author: { name: string; image?: SanityImageSource; slug?: { current: string } }
  category: { title: string; slug?: { current: string }; color?: string }
}

export async function getPaginatedPosts({ limit, pageIndex = 0 }: { limit: number; pageIndex?: number }): Promise<ArchivePagePost[]> {
  if (client) {
    return (
      (await client.fetch(paginatedPostsQuery, {
        pageIndex: pageIndex,
        limit: limit
      })) || []
    );
  }
  return [];
}

export type { ArchivePagePost };
