// Per-page SEO: canonical URL, Open Graph and Twitter tags, all absolute.
// The origin comes from runtimeConfig.public.siteUrl (NUXT_PUBLIC_SITE_URL).

export interface PageSeo {
  /** Route path, e.g. "/" or "/fezrs/". A trailing slash is added if missing. */
  path: string;
  title: string;
  description: string;
  /** Path under public/ (e.g. "/og/fezrs.png") or an imported asset URL. */
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  type?: "website" | "profile" | "article";
}

/** Absolute URL on this site for a path or an imported asset URL. */
export const useAbsoluteUrl = () => {
  const { siteUrl } = useRuntimeConfig().public;
  return (path: string) => (/^https?:\/\//.test(path) ? path : new URL(path, siteUrl).href);
};

export const usePageSeo = (seo: MaybeRefOrGetter<PageSeo>) => {
  const absolute = useAbsoluteUrl();
  const page = computed(() => toValue(seo));
  const url = computed(() => absolute(page.value.path.endsWith("/") ? page.value.path : `${page.value.path}/`));
  const image = computed(() => absolute(page.value.image ?? "/og/feztool.png"));
  // The default card is 1200×630; a custom image without sizes gets none.
  const size = computed(() =>
    page.value.image
      ? { width: page.value.imageWidth, height: page.value.imageHeight }
      : { width: 1200, height: 630 }
  );

  useHead({ link: [{ rel: "canonical", href: url }] });
  useSeoMeta({
    title: () => page.value.title,
    description: () => page.value.description,
    ogType: () => page.value.type ?? "website",
    ogUrl: url,
    ogTitle: () => page.value.title,
    ogDescription: () => page.value.description,
    ogImage: image,
    ogImageWidth: () => size.value.width,
    ogImageHeight: () => size.value.height,
    ogImageAlt: () => page.value.imageAlt ?? "FEZtool: Free & Easy tools for Earth sciences",
    // Square images (team portraits) suit the small card; wide cards the large one.
    twitterCard: () => (size.value.width && size.value.width === size.value.height ? "summary" : "summary_large_image"),
    twitterTitle: () => page.value.title,
    twitterDescription: () => page.value.description,
    twitterImage: image,
  });
};
