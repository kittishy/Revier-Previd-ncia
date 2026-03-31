import { getAllGuideSlugs } from '@/data/guide-loader'

const baseUrl = 'https://revier-academy.vercel.app'

export const dynamic = 'force-static'

export default function sitemap() {
  const guideUrls = getAllGuideSlugs().map((slug) => ({
    url: `${baseUrl}/guias/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...guideUrls,
  ]
}
