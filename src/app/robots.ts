import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/messages/', '/book/'],
    },
    sitemap: 'https://aspireacademicco.co.uk/sitemap.xml',
  };
}
