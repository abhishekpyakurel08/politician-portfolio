import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
  defaultColors,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const stringToStyle = (styleString: string): React.CSSProperties => {
  const styleObj: Record<string, string> = {}
  styleString.split(';').forEach((item) => {
    const colonIndex = item.indexOf(':')
    if (colonIndex > -1) {
      const key = item.substring(0, colonIndex).trim()
      const value = item.substring(colonIndex + 1).trim()
      const camelCaseKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      styleObj[camelCaseKey] = value
    }
  })
  return styleObj as React.CSSProperties
}

const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16
const IS_SUBSCRIPT = 32
const IS_SUPERSCRIPT = 64

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  text: ({ node }) => {
    let text = <>{node.text}</>
    if (node.format & IS_BOLD) text = <strong key="bold">{text}</strong>
    if (node.format & IS_ITALIC) text = <em key="italic">{text}</em>
    if (node.format & IS_STRIKETHROUGH)
      text = (
        <span key="strike" style={{ textDecoration: 'line-through' }}>
          {text}
        </span>
      )
    if (node.format & IS_UNDERLINE)
      text = (
        <span key="underline" style={{ textDecoration: 'underline' }}>
          {text}
        </span>
      )
    if (node.format & IS_CODE) text = <code key="code">{text}</code>
    if (node.format & IS_SUBSCRIPT) text = <sub key="sub">{text}</sub>
    if (node.format & IS_SUPERSCRIPT) text = <sup key="sup">{text}</sup>

    const styleObj: React.CSSProperties = {}

    // First handle standard node.style string
    if (node.style) {
      Object.assign(styleObj, stringToStyle(node.style))
    }

    // Then handle the '$' attribute from TextStateFeature
    if ((node as any).$) {
      Object.entries((node as any).$).forEach(([attr, value]) => {
        const styleConfig = (defaultColors as any)[attr]?.[value as string]
        if (styleConfig?.css) {
          Object.assign(styleObj, styleConfig.css)
        }
      })
    }

    if (Object.keys(styleObj).length > 0) {
      return (
        <span key="style" style={styleObj}>
          {text}
        </span>
      )
    }
    return text
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
