import { useEffect, useState } from 'react'

// Base URL of the running CMS server. Set VITE_CMS_URL in Frontend/.env
// (defaults to localhost for dev). See Frontend/.env.example.
export const CMS_BASE_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:4000'

/**
 * Fetches a single page's editable content + SEO tags from the CMS.
 *
 *   const { content, seo, loading, error } = usePageContent('home')
 *   if (loading || !content) return <LoadingState />
 *   <Typography>{content.hero.title}</Typography>
 */
export function usePageContent(slug) {
  const [state, setState] = useState({ content: null, seo: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    fetch(`${CMS_BASE_URL}/api/pages/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load content for "${slug}"`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setState({ content: data.content, seo: data.seo, loading: false, error: null })
      })
      .catch((err) => {
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: err.message }))
      })

    return () => { cancelled = true }
  }, [slug])

  return state
}
