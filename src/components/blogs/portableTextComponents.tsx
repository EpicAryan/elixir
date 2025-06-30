import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { type PortableTextComponents } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

const Callout = ({ value }: { value: { style: string; text: string } }) => {
  const styles = {
    info: {
      icon: <Info className="text-blue-500" />,
      classes: "bg-blue-50 border-l-4 border-blue-500 text-blue-800",
    },
    success: {
      icon: <CheckCircle2 className="text-green-500" />,
      classes: "bg-green-50 border-l-4 border-green-500 text-green-800",
    },
    warning: {
      icon: <AlertTriangle className="text-yellow-500" />,
      classes: "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800",
    },
    danger: {
      icon: <XCircle className="text-red-500" />,
      classes: "bg-red-50 border-l-4 border-red-500 text-red-800",
    },
  }

  const calloutStyle = styles[value.style as keyof typeof styles] || styles.info

  return (
    <div className={`my-6 flex items-start gap-x-4 rounded-r-lg p-4 text-base ${calloutStyle.classes}`}>
      <div className="flex-shrink-0 pt-0.5">{calloutStyle.icon}</div>
      <div className="flex-1">{value.text}</div>
    </div>
  )
}

export const PortableTextComponent: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <div className="relative h-auto w-full">
            <Image
              src={urlForImage(value).fit('max').auto('format').url()}
              alt={value.alt || 'Blog Post Image'}
              width={800}
              height={600}
              className="rounded-lg object-contain mx-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    codeBlock: ({ value }) => (
      <div className="my-6 text-sm">
        <SyntaxHighlighter language={value.language || 'text'} style={vscDarkPlus} showLineNumbers>
          {String(value.code).trim()}
        </SyntaxHighlighter>
      </div>
    ),
    callout: ({ value }) => <Callout value={value} />,
  },

  block: {
    h1: ({ children }) => <h1 className="mt-10 mb-4 text-4xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-8 mb-4 text-3xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-4 text-2xl font-bold">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-6 mb-4 text-xl font-semibold">{children}</h4>,
    h5: ({ children }) => <h5 className="mt-4 mb-2 text-lg font-semibold">{children}</h5>,
    h6: ({ children }) => <h6 className="mt-4 mb-2 text-base font-semibold">{children}</h6>,
    normal: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="my-4 list-disc list-inside space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="my-4 list-decimal list-inside space-y-2">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },

  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : ''}
          className="text-blue-600 underline decoration-blue-300 hover:decoration-blue-500"
        >
          {children}
        </a>
      )
    },
  },
}
