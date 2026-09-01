import type { MetadataRoute } from "next";
import { albums } from "@/lib/albums";
import { services, site } from "@/lib/site";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/portfolio/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const albumPages: MetadataRoute.Sitemap = albums.map((a) => ({
    url: `${BASE}/portfolio/${a.slug}/`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...albumPages];
}
