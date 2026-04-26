import { useEffect } from 'react';
import { useT } from 'talkr';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEO = ({
  title,
  description,
  keywords,
  image = "/assets/digital-brain.webp",
  url = "https://neuraconcept.com",
  type = "website",
  jsonLd,
}: SEOProps) => {
  const { T, locale } = useT();
  const defaultKeywords = T("seo.default_keywords");
  const resolvedKeywords = keywords || defaultKeywords;

  useEffect(() => {
    const siteTitle = T("seo.site_title");
    const fullTitle = title === "Home" ? siteTitle : `${title} | NeuraConcept`;
    document.title = fullTitle;

    const updateMeta = (attribute: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    updateMeta('name', 'description', description);
    updateMeta('name', 'keywords', resolvedKeywords);

    // Open Graph
    updateMeta('property', 'og:title', fullTitle);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:image', image);
    updateMeta('property', 'og:url', url);
    updateMeta('property', 'og:type', type);
    updateMeta('property', 'og:locale', locale === 'hi' ? 'hi_IN' : 'en_US');

    // Twitter
    updateMeta('name', 'twitter:title', fullTitle);
    updateMeta('name', 'twitter:description', description);

    // Canonical Link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
    }
    link.setAttribute('href', url);

    // JSON-LD Structured Data
    const baseGraph: Array<Record<string, unknown>> = [
      {
        "@type": "Organization",
        "name": "NeuraConcept",
        "description": T("seo.org_desc"),
        "url": "https://neuraconcept.com",
        "logo": "https://neuraconcept.com/assets/digital-brain.webp",
        "sameAs": [
          "https://twitter.com/neuraconcept",
          "https://linkedin.com/company/neuraconcept"
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "GradeOwl",
        "description": T("seo.app_desc"),
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Android, iOS",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "description": T("seo.free_offer")
        }
      },
      {
        "@type": "WebSite",
        "name": "NeuraConcept",
        "url": "https://neuraconcept.com"
      }
    ];

    // Merge any page-specific structured data into the @graph array
    const pageGraph: Array<Record<string, unknown>> = jsonLd
      ? Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      : [];

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [...baseGraph, ...pageGraph]
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);

  }, [title, description, resolvedKeywords, image, url, type, locale, jsonLd]);

  return null;
};
