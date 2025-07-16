// 'use client'

// import { easeOut, motion, useInView } from 'framer-motion'
// import { PostCard } from './postCard'
// import type { Post } from '../../../@types/content'
// import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
// import Link from 'next/link'
// import { Button } from '../ui/button'
// import { useRef } from 'react';

// export type HomePagePost = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt' | 'description' | 'readingTime'> & {
//   author: { name: string; image?: SanityImageSource }
//   category: { title: string }
// }

// const cardAnimationVariants = {
//   fromLeft: {
//     hidden: { x: -20, opacity: 0 }, 
//     visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
//   },
//   fadeIn: {
//     hidden: { opacity: 0, scale: 0.98 }, 
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
//   },
//   fromRight: {
//     hidden: { x: 20, opacity: 0 },
//     visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
//   },
//   fromBottom: {
//     hidden: { y: 30, opacity: 0 }, 
//     visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
//   },
// }



// const gridContainerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15, 
//     },
//   },
// }

// const fadeUpVariant = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.5,
//       ease: easeOut,
//     },
//   },
// }



// export const BlogGrid = ({ posts }: { posts: HomePagePost[] }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, {
//     once: false,
//     amount: 0.2,
//   });

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: easeOut },
//     },
//   };
//    return (
//     <div ref={ref} className="w-full overflow-x-hidden">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 mb-16 md:mb-24 xl:mb-32">
//         <motion.div
//           className=""
//           variants={containerVariants}
//           initial="hidden"
//           animate={isInView ? 'visible' : 'hidden'}
//         >
//           <motion.p
//             className="text-xs sm:text-sm text-[#AF7B5B] font-semibold sm:tracking-wider font-gtpro text-center"
//             variants={itemVariants}
//           >
//             SERIOUS ABOUT DESIGN, FUN ABOUT EVERYTHING ELSE.
//           </motion.p>

//           <motion.h2
//             className="text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-800 mt-2 font-gtpro text-center"
//             variants={itemVariants}
//           >
//             Stay in the{' '}
//             <span className="relative inline-block">
//               know
//               {/* Animated SVG underline */}
//               <motion.svg
//                 width="157"
//                 height="6"
//                 viewBox="0 0 157 6"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute -bottom-1 left-0 w-full h-auto"
//               >
//                 <motion.path
//                   d="M1 4.98631C1 4.98631 34.91 0.947199 56.6647 1.00052C77.6993 1.05208 89.4501 5.26996 110.484 4.98631C128.279 4.74635 156 1.00052 156 1.00052"
//                   stroke="#F2672D"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   initial={{ pathLength: 0 }}
//                   animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
//                   transition={{ duration: 1.2, ease: 'easeInOut' }}
//                 />
//               </motion.svg>
//             </span>
//           </motion.h2>
//         </motion.div>

//         <motion.div
//           className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-16 max-w-xs sm:max-w-3xl lg:max-w-6xl"
//           variants={gridContainerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ amount: 0.1 }}
//         >
//           {posts.map((post, index) => {
//             const variantKey = ['fromLeft', 'fadeIn', 'fromRight'][index % 3];
//             const finalVariants = index >= 3 ? cardAnimationVariants.fromBottom : cardAnimationVariants[variantKey as keyof typeof cardAnimationVariants];
            
//             return (
//               <motion.div key={post._id} variants={finalVariants}>
//                 <PostCard post={post} />
//               </motion.div>
//             )
//           })}
//         </motion.div>

//         {/* Button section */}
//         <motion.div 
//           className="mt-12 text-center sm:mt-16"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }}
//           variants={fadeUpVariant}
//           transition={{ delay: 0.4 }} 
//         >
//           <Link href="/blog">
//             <Button
//               variant="outline"
//               className="cursor-pointer px-6 text-xs text-gray-500 sm:py-5 sm:text-base"
//             >
//               View all posts
//             </Button>
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

'use client'

import { easeOut, motion, useInView } from 'framer-motion'
import { PostCard } from './postCard'
import type { Post } from '../../../@types/content'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Button } from '../ui/button'
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export type HomePagePost = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt' | 'readingTime'> & {
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
  fromBottom: {
    hidden: { y: 30, opacity: 0 }, 
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
  },
}

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, 
    },
  },
}

const fadeUpVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
}

export const BlogGrid = ({ posts }: { posts: HomePagePost[] }) => {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.01,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <div ref={ref} className="w-full overflow-x-hidden">
      <div className="container mx-auto px-6 lg:px-8 2xl:px-12 mb-16 md:mb-24 xl:mb-32 max-w-5xl">
        <motion.div
          className=""
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.p
            className="text-xs sm:text-sm text-[#AF7B5B] font-semibold sm:tracking-wider font-gtpro text-center"
            variants={itemVariants}
          >
            SERIOUS ABOUT DESIGN, FUN ABOUT EVERYTHING ELSE.
          </motion.p>

          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-800 mt-2 font-gtpro text-center"
            variants={itemVariants}
          >
            Stay in the{' '}
            <span className="relative inline-block">
              know
              <motion.svg
                width="157"
                height="6"
                viewBox="0 0 157 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-1 left-0 w-full h-auto"
              >
                <motion.path
                  d="M1 4.98631C1 4.98631 34.91 0.947199 56.6647 1.00052C77.6993 1.05208 89.4501 5.26996 110.484 4.98631C128.279 4.74635 156 1.00052 156 1.00052"
                  stroke="#F2672D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
              </motion.svg>
            </span>
          </motion.h2>
        </motion.div>

        {/* First 2 posts in landscape format */}
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:gap-10 mt-8 sm:mt-16"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
        >
          {posts.slice(0, 2).map((post, index) => {
            const variantKey = index === 0 ? 'fromLeft' : 'fromRight';
            return (
              <motion.div key={post._id} variants={cardAnimationVariants[variantKey]}>
                <PostCard post={post} aspect="landscape" preloadImage={true} />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Remaining posts in square format */}
        {posts.length > 2 && (
          <motion.div
            className="mt-10 grid gap-10 lg:gap-10 sm:grid-cols-3"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            {posts.slice(2, 5).map((post, index) => {
              const adjustedIndex = index + 2; 
              const variantKey = ['fromLeft', 'fadeIn', 'fromRight'][index % 3];
              const finalVariants = adjustedIndex >= 5 ? cardAnimationVariants.fromBottom : cardAnimationVariants[variantKey as keyof typeof cardAnimationVariants];

  

              return (
                <motion.div key={post._id} variants={finalVariants}>
                  <PostCard post={post} aspect="square" />
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Button section */}
        <motion.div 
          className="mt-12 text-center sm:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariant}
          transition={{ delay: 0.4 }} 
        >  
            <Button
              onClick={() => router.push('/blog')}
              className="cursor-pointer px-6 text-xs sm:py-5 sm:text-base bg-[#F86642] hover:bg-orange-600 shadow-[2px_6px_20px_-3px_#F86642]/60 rounded-xl"
            >
              View all posts
            </Button>
        </motion.div>
        <motion.div 
          className="mt-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariant}
          transition={{ delay: 0.4 }} 
        >
            <Button
              onClick={() => router.push('/calculator')}
              className="cursor-pointer px-6 text-xs sm:py-5 sm:text-base bg-[#F86642] hover:bg-orange-600 shadow-[2px_6px_20px_-3px_#F86642]/60 rounded-xl"
            >
              Calculator
            </Button>
        </motion.div>
      </div>
    </div>
  )
}
