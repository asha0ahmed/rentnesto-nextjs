export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/properties/create',
        '/properties/edit/',
        '/api/',
      ],
    },
    sitemap: 'https://rentnesto.xyz/sitemap.xml',
  };
}