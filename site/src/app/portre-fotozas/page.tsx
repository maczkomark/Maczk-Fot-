import { ServicePage } from "@/components/site/service-page";
import { pageMeta } from "@/lib/seo";
import { getService } from "@/lib/site";
import { getAlbum } from "@/lib/albums";

const service = getService("portre-fotozas")!;

export const metadata = pageMeta({
  title: service.title,
  description: service.description,
  path: "/portre-fotozas",
  image: getAlbum(service.heroAlbum)?.cover,
});

export default function Page() {
  return <ServicePage service={service} />;
}
