// Breadcrumbs JSON-LD helper.
//
// Returns a single BreadcrumbList object representing
//   Home › <label>
// for any non-home page. Pages call:
//
//   <SEO ... jsonLd={breadcrumbsJsonLd("About", "/about")} />
//
// SEO.tsx merges this into the page-level @graph so Google can render the
// breadcrumb trail in SERPs.
//
// Kept as plain TS (not .tsx) because there is no JSX here; that lets the
// Vite tree-shaker drop it from any chunk that doesn't use it.

const SITE_ORIGIN = "https://neuraconcept.com";

export const breadcrumbsJsonLd = (
  label: string,
  path: string,
): Record<string, unknown> => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${SITE_ORIGIN}/`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": label,
        "item": `${SITE_ORIGIN}${normalizedPath}`,
      },
    ],
  };
};
