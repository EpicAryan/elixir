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
      className="mb-3 text-lg font-bold leading-tight font-manrope line-clamp-2 min-h-[3rem] sm:text-xl
      text-gray-800 group-hover:text-[#F86642]/90 transition-colors duration-300 ease-in-out"
      
      variants={titleContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {title.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariants} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h3>
  )
}


type PostCardProps = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt'> & {
  author: { name: string; image?: SanityImageSource }
  category: { title: string }
}

export const PostCard = ({ post }: { post: PostCardProps }) => {
  const authorImage = post.author.image ? urlForImage(post.author.image).width(40).height(40).fit('crop').url() : '/default-avatar.png';

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02, boxShadow: "0px 10px 20px -5px rgba(0,0,0,0.1)" }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug.current}`} className="group flex h-full flex-col border border-gray-200/80 p-2 rounded-lg bg-gray-50/70 shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="relative mb-2 w-full overflow-hidden rounded-lg sm:mb-4 h-48 sm:h-56">
          <Image
            src={urlForImage(post.mainImage).width(500).height(350).url()}
            alt={post.mainImage.alt || 'Blog post image'}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-2">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#F86642] font-gtpro sm:text-sm">
            {post.category.title}
          </p>
          <AnimatedTitle title={post.title} />
          <div className="mt-auto flex items-center gap-x-3 text-sm text-gray-500">
            <Image
              src={authorImage}
              alt={post.author.name || 'Author'}
              width={40}
              height={40}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-sm">{post.author.name}</span>
            <span className="text-gray-400">•</span>
            <time dateTime={post.publishedAt} className="text-xs">
              {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
            </time>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
