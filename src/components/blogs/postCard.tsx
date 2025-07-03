'use client'

import Image from 'next/image'
import Link from 'next/link'
import { easeOut, motion } from 'motion/react'
import { format } from 'date-fns'
import { urlForImage } from '@/sanity/lib/image'
import type { Post } from '../../../@types/content'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.01,
    },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: easeOut }
  },
}

const AnimatedTitle = ({ title }: { title: string }) => {
  return (
    <motion.h3
      className="text-base font-bold leading-tight font-manrope md:text-lg text-gray-800 group-hover:text-[#F86642]/90 transition-colors duration-300 ease-in-out text-pretty"
      variants={titleContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {title.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-1">
          {word.split('').map((char, charIndex) => (
            <motion.span key={charIndex} variants={letterVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h3>
  )
}


type PostCardProps = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt' | 'description' | 'readingTime'> & {
  author: { name: string; image?: SanityImageSource }
  category: { title: string }
}

export const PostCard = ({ post }: { post: PostCardProps }) => {
  // const authorImage = post.author.image ? urlForImage(post.author.image).width(40).height(40).fit('crop').url() : '/default-avatar.png';
  console.log('Rendering:', { readingTime: post.readingTime, typeof: typeof post.readingTime })
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01  }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="h-full "
    >
      <Link href={`/blog/${post.slug.current}`} className="group flex h-full flex-col border border-gray-200 p-4 rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)]">
        <div className="relative mb-2 w-full overflow-hidden rounded-lg sm:mb-4 h-48 sm:h-60">
          <Image
            src={urlForImage(post.mainImage).width(500).height(350).url()}
            alt={post.mainImage.alt || 'Blog post image'}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 ">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#F86642] font-gtpro md:text-sm">
            {post.category.title}
          </p>
          <AnimatedTitle title={post.title} />
          <div className='text-gray-600 text-xs md:text-sm line-clamp-3'>{post.description}</div>
          <div className="mt-auto flex items-center gap-x-3 text-xs md:text-sm text-gray-800 font-semibold justify-between">
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
            </time>
            <span>• {post.readingTime} Min Read</span>
            
            <span>{post.author.name}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
