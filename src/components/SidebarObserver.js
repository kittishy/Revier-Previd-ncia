'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from './SidebarObserver.module.css'

export default function SidebarObserver({ items = [], checklistId = 'checklist', title = 'Guia' }) {
  const [activeId, setActiveId] = useState(items[0]?.id || '')
  const [open, setOpen] = useState(false)

  const activeIndex = useMemo(() => {
    const index = items.findIndex((item) => item.id === activeId)
    return index >= 0 ? index : 0
  }, [activeId, items])

  const progress = items.length ? Math.round(((activeIndex + 1) / items.length) * 100) : 0
  const currentItem = items[activeIndex] || items[0]

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.guide-section[id]'))
    if (!sections.length) return undefined

    const syncLinks = (id) => {
      const links = document.querySelectorAll('a[href^="#"]')

      links.forEach((link) => {
        const href = link.getAttribute('href')
        const isActive = href === `#${id}`

        link.setAttribute('data-active', isActive ? 'true' : 'false')

        if (isActive) {
          link.setAttribute('aria-current', 'location')
        } else {
          link.removeAttribute('aria-current')
        }
      })
    }

    const updateActive = (id) => {
      setActiveId(id)
      syncLinks(id)
    }

    const initialId = window.location.hash.replace('#', '') || items[0]?.id || sections[0].id
    updateActive(initialId)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visibleSections[0]?.target?.id) {
          updateActive(visibleSections[0].target.id)
        }
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0.15, 0.35, 0.55] }
    )

    sections.forEach((section) => observer.observe(section))

    const handleHashChange = () => {
      const id = window.location.hash.replace('#', '')
      if (id) updateActive(id)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [items])

  const handleNavClick = () => {
    setOpen(false)
  }

  if (!items.length) return null

  return (
    <div className={styles.mobileGuideNav} id="guide-mobile-nav">
      <details className={styles.mobileGuideDetails} open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
        <summary className={styles.mobileGuideSummary}>
          <span className={styles.summaryEyebrow}>Neste guia</span>
          <span className={styles.summaryMain}>
            <span className={styles.summarySection}>{currentItem?.num || '01'} {currentItem?.label || title}</span>
            <span className={styles.summaryMetaWrap}>
              <span className={styles.summaryProgress}>{progress}% percorrido</span>
              <span className={styles.summaryChevron} aria-hidden="true">+</span>
            </span>
          </span>
        </summary>

        <div className={styles.mobileGuidePanel}>
          <div className={styles.mobileGuidePanelMeta}>
            <div>
              <span className={styles.panelLabel}>Secao atual</span>
              <strong className={styles.panelValue}>{currentItem?.label || title}</strong>
            </div>
            <a className={styles.checklistLink} href={`#${checklistId}`} onClick={handleNavClick}>
              Abrir checklist
            </a>
          </div>

          <ul className={styles.mobileGuideList} aria-label={`Indice do guia ${title}`}>
            {items.map((item) => (
              <li key={item.id}>
                <a className={styles.mobileGuideLink} href={`#${item.id}`} onClick={handleNavClick}>
                  <span className={styles.mobileGuideNum}>{item.num}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <div className={styles.mobileGuideProgress} aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
