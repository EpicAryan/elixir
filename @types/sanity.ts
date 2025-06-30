export type Slug = {
  _type: 'slug'
  current: string
}

export type SanityImage = {
  _type: 'image'
  alt?: string
  caption?: string
  asset: {
    _type: 'reference'
    _ref: string
  }
}

export type Reference = {
  _type: 'reference'
  _ref: string
}

export type BlockSpan = {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}

export type LinkMarkDef = {
  _key: string
  _type: 'link'
  href: string
}

export type BlockText = {
  _type: 'block'
  _key: string
  children: BlockSpan[]
  markDefs: LinkMarkDef[]
  style: string
}

export type CodeBlock = {
  _type: 'codeBlock'
  _key: string
  code: string
  language: string
}

export type CalloutBlock = {
  _type: 'callout'
  _key: string
  style: 'info' | 'success' | 'warning' | 'danger'
  text: string
}

export type ImageBlock = SanityImage & {
  _key: string
}

export type BodyContent = (BlockText | CodeBlock | CalloutBlock | ImageBlock)[]
