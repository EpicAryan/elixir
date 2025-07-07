import { groq } from 'next-sanity'

// Query for the blog index page (gets the first 8 posts)
export const postsQuery = groq`
*[_type == "post"] | order(publishedAt desc) [0...8] {
  _id,
  title,
  description,
  slug,
  mainImage,
  readingTime,
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
  description,
  readingTime,
  publishedAt,
  "author": author->{name, image},
  "category": categories[0]->{title}
}`

export const paginatedPostsQuery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  _id,
  title,
  slug,
  mainImage,
  description,
  readingTime,
  publishedAt,
  "author": author->{name, image, slug},
  "category": categories[0]->{title, slug, color}
}`;
