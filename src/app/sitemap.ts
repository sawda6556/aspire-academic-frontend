import { MetadataRoute } from 'next';

const baseUrl = 'https://aspireacademicco.co.uk';
const apiUrl = 'https://api.aspireacademicco.co.uk';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes: Tutors
  let tutorRoutes: MetadataRoute.Sitemap = [];
  try {
    const tutorsRes = await fetch(`${apiUrl}/tutor-profiles/marketplace`);
    const tutors = await tutorsRes.json();
    if (Array.isArray(tutors)) {
      tutorRoutes = tutors.map((tutor: any) => ({
        url: `${baseUrl}/tutors/${tutor.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch tutors for sitemap:', error);
  }

  // Dynamic routes: Resources
  let resourceRoutes: MetadataRoute.Sitemap = [];
  try {
    const resourcesRes = await fetch(`${apiUrl}/resources`);
    const resourcesData = await resourcesRes.json();
    const resources = resourcesData.items || [];
    if (Array.isArray(resources)) {
      resourceRoutes = resources.map((resource: any) => ({
        url: `${baseUrl}/store/${resource.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch resources for sitemap:', error);
  }

  return [...staticRoutes, ...tutorRoutes, ...resourceRoutes];
}
