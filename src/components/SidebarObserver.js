'use client'

import { useEffect } from 'react'

export default function SidebarObserver() {
  useEffect(() => {
    const sections = document.querySelectorAll('.guide-section[id]')
    if (!sections.length) return

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        const link = document.querySelector(`a[href="#${e.target.id}"]`)
        if (link) link.setAttribute('data-active', e.isIntersecting ? 'true' : 'false')
      }),
      { rootMargin: '-10% 0px -80% 0px' }
    )

    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return null
}
