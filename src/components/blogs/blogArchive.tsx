'use client'

import { easeOut, motion } from 'motion/react'
import { PostCard } from './postCard'
import { Pagination } from './pagination'
import type { Post } from '../../../@types/content' 
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { useEffect, useState } from 'react'

type ArchivePagePost = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt' | 'description' | 'readingTime'> & {
  author: { name: string; image?: SanityImageSource; slug?: { current: string } }
  category: { title: string; slug?: { current: string }; color?: string }
}

const cardAnimationVariants = {
  fromLeft: {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
  },
  fadeIn: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
  },
  fromRight: {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
  },
}

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, 
    },
  },
}

interface BlogArchiveProps {
  posts: ArchivePagePost[]
  pageIndex: number
  isFirstPage: boolean
  isLastPage: boolean
}

export const BlogArchive = ({ posts, pageIndex, isFirstPage, isLastPage }: BlogArchiveProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
   if (!isClient) {
    return (
      <div>
        {posts && posts.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <span className="text-lg text-gray-500">End of the result!</span>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {posts.map((post: ArchivePagePost) => (
              <div key={post._id} className="w-full">
                <PostCard post={post} aspect="square" />
              </div>
            ))}
          </div>
        )}
        <Pagination
          pageIndex={pageIndex}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
        />
      </div>
    );
  }

  return (
    <>
      {/* Empty state */}
      {posts && posts?.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500">
            End of the result!
          </span>
        </div>
      )}

      {/* Animated Grid */}
      <motion.div
        className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3"
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
      >
        {posts.map((post: ArchivePagePost, index: number) => {
          const variantKey = ['fromLeft', 'fadeIn', 'fromRight'][index % 3];
          const finalVariants = cardAnimationVariants[variantKey as keyof typeof cardAnimationVariants];

          return (
            <motion.div key={post._id} variants={finalVariants} className="w-full">
              <PostCard post={post} aspect="square" />
            </motion.div>
          )
        })}
      </motion.div>

      {/* Pagination */}
      <Pagination
        pageIndex={pageIndex}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  )
}
