import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default async function sitemap() {
  // Static pages
  const staticPages = [
    {
      url: 'https://rentnesto.xyz',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://rentnesto.xyz/properties',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://rentnesto.xyz/signup',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://rentnesto.xyz/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic property pages
  try {
    const response = await axios.get(`${API_URL}/api/properties?limit=1000`);
    const properties = response.data.data.properties || [];

    const propertyPages = properties.map((property) => ({
      url: `https://rentnesto.xyz/properties/${property._id}`,
      lastModified: new Date(property.updatedAt || property.createdAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticPages, ...propertyPages];
  } catch (error) {
    console.error('Sitemap: failed to fetch properties', error);
    return staticPages;
  }
}