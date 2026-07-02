import { useEffect } from 'react'

/**
 * Writes a page's SEO fields (from the CMS) into <head> tags.
 *
 *   <SeoTags seo={seo} />
 */
export default function SeoTags({ seo }) {
  useEffect(() => {
    if (!seo) return

    document.title = seo.metaTitle || document.title

    setMeta('description', seo.metaDescription)
    setMeta('keywords', seo.keywords)
    setMeta('robots', seo.noindex ? 'noindex, nofollow' : 'index, follow')

    setMeta('og:title', seo.ogTitle || seo.metaTitle, true)
    setMeta('og:description', seo.ogDescription || seo.metaDescription, true)
    setMeta('og:image', seo.ogImage, true)

    setLink('canonical', seo.canonicalUrl)
  }, [seo])

  return null
}

function setMeta(name, content, isProperty) {
  if (!content) return
  const attr = isProperty ? 'property' : 'name'
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}
