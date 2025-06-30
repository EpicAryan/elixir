import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { post } from './post'
import category from './category'
import blockContent from './blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent],
}
