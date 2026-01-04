// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ytpla.in/",
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: "https://ytpla.in/about",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://ytpla.in/privacy",
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: "https://ytpla.in/terms",
      lastModified: new Date(),
      priority: 0.6,
    },
  ];
}
