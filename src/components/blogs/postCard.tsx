// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import { easeOut, motion } from 'motion/react'
// import { format } from 'date-fns'
// import { urlForImage } from '@/sanity/lib/image'
// import type { Post } from '../../../@types/content'
// import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// const titleContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.01,
//     },
//   },
// }

// const letterVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.4, ease: easeOut }
//   },
// }

// const AnimatedTitle = ({ title }: { title: string }) => {
//   return (
//     <motion.h3
//       className="text-base font-bold leading-tight font-manrope md:text-lg text-gray-800 group-hover:text-[#F86642]/90 transition-colors duration-300 ease-in-out text-pretty"
//       variants={titleContainerVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.1 }}
//     >
//       {title.split(' ').map((word, wordIndex) => (
//         <span key={wordIndex} className="inline-block mr-1">
//           {word.split('').map((char, charIndex) => (
//             <motion.span key={charIndex} variants={letterVariants} className="inline-block">
//               {char}
//             </motion.span>
//           ))}
//         </span>
//       ))}
//     </motion.h3>
//   )
// }


// type PostCardProps = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt' | 'description' | 'readingTime'> & {
//   author: { name: string; image?: SanityImageSource }
//   category: { title: string }
// }

// export const PostCard = ({ post }: { post: PostCardProps }) => {
//   // const authorImage = post.author.image ? urlForImage(post.author.image).width(40).height(40).fit('crop').url() : '/default-avatar.png';
//   console.log('Rendering:', { readingTime: post.readingTime, typeof: typeof post.readingTime })
//   return (
//     <motion.div
//       whileHover={{ y: -5, scale: 1.01  }}
//       transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//       className="h-full "
//     >
//       <Link href={`/blog/${post.slug.current}`} className="group flex h-full flex-col border border-gray-200 p-4 rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)]">
//         <div className="relative mb-2 w-full overflow-hidden rounded-lg sm:mb-4 h-48 sm:h-60">
//           <Image
//             src={urlForImage(post.mainImage).width(500).height(350).url()}
//             alt={post.mainImage.alt || 'Blog post image'}
//             fill
//             className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           />
//         </div>
//         <div className="flex flex-1 flex-col gap-2 ">
//           <p className="text-xs font-semibold uppercase tracking-wider text-[#F86642] font-gtpro md:text-sm mb-1">
//             {post.category.title}
//           </p>
//           <AnimatedTitle title={post.title} />
//           <div className='text-gray-600 text-xs md:text-sm line-clamp-3 my-2'>{post.description}</div>
//           <div className="mt-auto flex items-center gap-x-3 text-xs md:text-sm text-gray-800 font-semibold justify-between">
//             <time dateTime={post.publishedAt}>
//               {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
//             </time>
//             <span>• {post.readingTime} Min Read</span>
            
//             <span>{post.author.name}</span>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   )
// }

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

const AnimatedTitle = ({ title, aspect, slug }: { title: string; aspect?: string; slug: string }) => {
  return (
    <motion.h2
      className={`${
        aspect === 'landscape' 
          ? 'text-xl md:text-2xl' 
          : 'text-lg'
      } font-semibold leading-snug tracking-tight mt-2 text-black dark:text-white`}
      variants={titleContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Link href={`/blog/${slug}`}>
        <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
          {title.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-1">
              {word.split('').map((char, charIndex) => (
                <motion.span 
                  key={charIndex} 
                  variants={letterVariants} 
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      </Link>
    </motion.h2>
  )
}


type PostCardProps = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt' | 'readingTime'> & {
  author: { name: string; image?: SanityImageSource; slug?: { current: string } }
  category: { title: string; slug?: { current: string }; color?: string }
  aspect?: 'landscape' | 'square'
  preloadImage?: boolean
}

export const PostCard = ({ post, aspect = 'square', preloadImage = false }: { post: PostCardProps; aspect?: 'landscape' | 'square'; preloadImage?: boolean }) => {
  const authorImageProps = post.author.image ? urlForImage(post.author.image) : null;
  
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group cursor-pointer h-full"
    >
      <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
        <Link
          className={`relative block ${
            aspect === 'landscape' ? 'aspect-video' : 'aspect-square'
          }`}
          href={`/blog/${post.slug.current}`}
        >
          <Image
            src={urlForImage(post.mainImage).width(500).height(350).url()}
            alt={post.mainImage.alt || 'Blog post image'}
            fill
            priority={preloadImage}
            className="object-cover transition-all"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>

      <div className="mt-4">
        {/* Category */}
        <div className="flex gap-3 mb-2">
          {post.category && (
            <Link href={`/category/${post.category.slug?.current || '#'}`}>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F86642] font-gtpro md:text-sm">
                {post.category.title}
              </span>
            </Link>
          )}
        </div>

        {/* Animated Title */}
         <AnimatedTitle title={post.title} aspect={aspect} slug={post.slug.current} />

        {/* Author and Date */}
        <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
          <Link href={`/author/${post.author.slug?.current || '#'}`}>
            <div className="flex items-center gap-3">
              {authorImageProps && (
                <div className="relative h-5 w-5 flex-shrink-0">
                  <Image
                    src={authorImageProps.url()}
                    alt={post.author.name}
                    className="rounded-full object-cover"
                    fill
                    sizes="20px"
                  />
                </div>
              )}
              <span className="truncate text-sm">
                {post.author.name}
              </span>
            </div>
          </Link>
          <span className="text-xs text-gray-300 dark:text-gray-600">
            &bull;
          </span>
          <time
            className="truncate text-sm"
            dateTime={post.publishedAt}
          >
            {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
          </time>
        </div>
      </div>
    </motion.div>
  )
}
