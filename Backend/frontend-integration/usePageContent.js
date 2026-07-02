import { useEffect, useState } from 'react'

const CMS_BASE_URL = process.env.REACT_APP_CMS_URL || 'http://localhost:4000'

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
