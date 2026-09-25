export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://haykhalportfolio.vercel.app';

  const projects = [
    'e2ee-secure-api',
    'steganography',
    'lab-inventory',
    'prostream',
  ];

  const projectUrls = projects.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...projectUrls,
  ];
}
