'use client'

import { useEffect } from 'react'

export default function GuideEffects() {
  useEffect(() => {
    // Scroll reveal animations
    const revealEls = document.querySelectorAll('.reveal')
    if (revealEls.length > 0) {
      document.documentElement.classList.add('reveal-anim')
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' })
      revealEls.forEach(el => revealObs.observe(el))
    }

    // Bar fill animations
    const bars = document.querySelectorAll('.bar-fill[data-width]')
    if (bars.length > 0) {
      const barObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.width + '%'
            barObs.unobserve(e.target)
          }
        })
      }, { threshold: 0.3 })
      bars.forEach(b => barObs.observe(b))
    }
  }, [])

  return null
}
