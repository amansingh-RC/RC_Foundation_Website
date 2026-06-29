import { useEffect, useState } from 'react'

// Point this at your running CMS server (see README.md for setup).
// In production, set this via an environment variable instead of hardcoding it.
const CMS_BASE_URL = process.env.REACT_APP_CMS_URL || 'http://localhost:4000'

/**
 * Fetches a single page's editable content + SEO tags from the CMS.
 *
 * const { content, seo, loading, error } = usePageContent('home')
 * if (loading) return <LoadingState />
 * <Typography>{content.hero.title}</Typography>
 */
export function usePageContent(slug) {
  const [state, setState] = useState({ content: null, seo: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))

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
