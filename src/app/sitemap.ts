// src/app/sitemap.ts
import { MetadataRoute } from 'next';

const APP_URL = 'https://data-analyst-learning.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/help',
    '/learning',
    '/daily',
    '/progress',
    '/analytics',
    '/projects',
    '/resources',
    '/settings',
  ];

  return routes.map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
