import { defineField, defineType } from "sanity";

export const post = defineType({
    name: "post",
    title: "Post",
    type: "document",
    fieldsets: [
        {
            name: "seo",
            title: "SEO",
            options: { collapsible: true, collapsed: true },
        },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required().error("A title is required."),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            description: 'Make this description brief so the visitor can quickly understand the content of the post.',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.max(250).error('Description must be less than 250 characters.'),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "author" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "mainImage",
            title: "Main Image",
            type: "image",
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Important for SEO and accessibility.',
                    validation: Rule => Rule.required(),
                }
            ]
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
            description: 'An estimated reading time. Can be calculated automatically on the frontend.',
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "blockContent",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage'
        },
        prepare(selection) {
            const {author} = selection
            return {...selection, subtitle: author && `by ${author}`}
        }
    }
});
