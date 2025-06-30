import { groq } from 'next-sanity'

// Query for the blog index page (gets the first 6 posts)
export const postsQuery = groq`
*[_type == "post"] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  "author": author->{name, image},
  "category": categories[0]->{title}
}`

// Query for a single post by its slug
export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  description,
  mainImage,
  publishedAt,
  readingTime,
  body,
  "author": author->{name, image},
  "categories": categories[]->{title}
}`

//query slugs for dynamic routes
export const postPathsQuery = groq`
*[_type == "post" && defined(slug.current)][]{
  "slug": slug.current
}`

export const allPostsQuery = groq`
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  "author": author->{name, image},
  "category": categories[0]->{title}
}`
