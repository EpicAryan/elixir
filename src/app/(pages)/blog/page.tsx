import { Suspense } from "react";
import { client } from '@/sanity/lib/client'
import { BlogArchive } from '@/components/blogs/blogArchive'
import { paginatedPostsQuery } from "@/sanity/lib/queries";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Post } from "../../../../@types/content";

export const revalidate = 0; 

type ArchivePagePost = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt' | 'description' | 'readingTime'> & {
  author: { name: string; image?: SanityImageSource; slug?: { current: string } }
  category: { title: string; slug?: { current: string }; color?: string }
}

async function getPaginatedPosts({ limit, pageIndex = 0 }: { limit: number; pageIndex?: number }): Promise<ArchivePagePost[]> {
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

export default async function BlogArchivePage({ searchParams }: { searchParams: Promise<{ page?: string }>}) {
  const searchParamsResolved = await searchParams;
  const page = searchParamsResolved.page || "1";
  const pageIndex = parseInt(page, 10) || 1;
  const POSTS_PER_PAGE = 6;

  const params = {
    pageIndex: (pageIndex - 1) * POSTS_PER_PAGE,
    limit: pageIndex * POSTS_PER_PAGE
  };

  const posts = await getPaginatedPosts(params);
  const isFirstPage = pageIndex < 2;
  const isLastPage = posts.length < POSTS_PER_PAGE;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:px-8 2xl:px-12 relative max-w-6xl">
        <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug font-manrope">
          Archive
        </h1>
        <div className="text-center">
          <p className="mt-1 text-lg font-gtpro">
            See all posts we have ever written.
          </p>
        </div>
        <Suspense
          key={searchParamsResolved.page || "1"}
          fallback={<div className="flex h-40 items-center justify-center"><span className="text-lg text-gray-500">Loading...</span></div>}>
          <BlogArchive 
            posts={posts} 
            pageIndex={pageIndex}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
          />
        </Suspense>
      </div>
    </>
  );
}
