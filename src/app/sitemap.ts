import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aspireacademicco.co.uk';

  const routes = [
    '',
    '/about',
    '/become-tutor',
    '/contact',
    '/faq',
    '/how-it-works',
    '/pricing',
    '/privacy',
    '/store',
    '/subjects',
    '/terms',
    '/tutors',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
