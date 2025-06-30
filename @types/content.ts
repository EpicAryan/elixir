
import type {
  BodyContent,
  Reference,
  SanityImage,
  Slug
} from './sanity'

export type Post = {
  _id: string
  _type: 'post'
  _createdAt: string
  _updatedAt: string
  title: string
  description: string
  slug: Slug
  author: Reference
  mainImage: SanityImage
  categories: Reference[]
  publishedAt: string
  readingTime: number
  body: BodyContent
}

export type Author = {
  _id: string
  _type: 'author'
  name: string
  image?: {
    asset: {
      _ref: string
    }
  }
}

export type Category = {
  _id: string
  _type: 'category'
  title: string
  description?: string
}
