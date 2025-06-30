import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { postBySlugQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import type { Post } from '../../../../../@types/content'
import { PortableText } from '@portabletext/react'
import { PortableTextComponent } from '@/components/blogs/portableTextComponents' 
import Image from 'next/image'
import { format } from 'date-fns'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { Metadata } from 'next'


type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

type SinglePost = Omit<Post, 'author' | 'categories'> & {
  author: { name: string, image?: SanityImageSource };
  categories: { title: string }[];
}


export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = await params
  const data = await getPost(slug);
  
  return {
    applicationName: "Elixir",
    creator: "elixir",
    title: data?.title,
    description: data?.description,
    openGraph: {
      title: data?.title,
      description: data?.description,
      images: data?.mainImage ? [urlForImage(data.mainImage).url()] : [],
      type: 'article',
      locale: 'en_IN'
    },
    authors: [{ name: 'Elixir'}]    
  }
}


async function getPost(slug: string) {
  const post = await client.fetch<SinglePost | null>(postBySlugQuery, { slug })
  return post
}

export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: string }[]>(`*[_type == "post" && defined(slug.current)][]{ "slug": slug.current }`);
  return posts.map(post => ({ slug: post.slug }));
}

export const revalidate = 60

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }
  
  const authorImage = post.author.image ? urlForImage(post.author.image).width(50).height(50).fit('crop').url() : '/default-avatar.png';

  return (
    <main className="bg-white">
      <article className="mx-auto max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
        <header className="mb-12 text-center md:px-8 lg:px-18 xl:px-28">
            {post.categories?.map(cat => (
                <span key={cat.title} className="text-sm font-semibold uppercase tracking-wider text-[#F86642] font-gtpro">
                    {cat.title}{' '}
                </span>
            ))}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl font-gtpro">
                {post.title}
            </h1>
            <p className="mt-4 sm:text-lg text-gray-600">{post.description}</p>
            <div className="mt-8 flex items-center justify-center gap-x-3 text-xs sm:text-base text-gray-500">
                <div className="flex items-center gap-x-3">
                    <Image
                        src={authorImage}
                        alt={post.author.name || 'Author'}
                        width={40}
                        height={40}
                        className="w-auto h-6 sm:h-10 rounded-full object-cover bg-gray-200"
                    />
                    <span>{post.author.name}</span>
                </div>
                <span className="text-gray-400">•</span>
                <time dateTime={post.publishedAt}>
                    {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                </time>
                {post.readingTime && (
                    <>
                        <span className="text-gray-400">•</span>
                        <span>{post.readingTime} min read</span>
                    </>
                )}
            </div>
        </header>

        <div className="relative mb-12 h-auto max-h-[500px] w-full overflow-hidden rounded-lg">
            <Image
                src={urlForImage(post.mainImage).width(1200).height(500).url()}
                alt={post.mainImage.alt || 'Main blog post image'}
                width={1200}
                height={500}
                className="object-cover w-full h-auto"
                priority 
            />
        </div>


        <div className="mx-auto max-w-none md:px-8 lg:px-20 xl:px-28">
            <PortableText
                value={post.body}
                components={PortableTextComponent} 
            />
        </div>
      </article>
    </main>
  )
}
