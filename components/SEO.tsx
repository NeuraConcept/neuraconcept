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

// Canonical URLs of pages where identity schemas (Organization, WebSite,
// SoftwareApplication) attach. Anything else falls through to whatever the
// page passes via the `jsonLd` prop.
const HOME_URL = "https://neuraconcept.com/";
const GRADEOWL_URL = "https://neuraconcept.com/gradeowl";

export const SEO = ({
  title,
  description,
  keywords,
  image = "/assets/digital-brain.webp",
  url,
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
    updateMeta('property', 'og:type', type);
    const ogLocale = locale === 'hi' ? 'hi_IN' : locale === 'kn' ? 'kn_IN' : 'en_US';
    updateMeta('property', 'og:locale', ogLocale);
    if (url) {
      updateMeta('property', 'og:url', url);
    }

    // Twitter
    updateMeta('name', 'twitter:title', fullTitle);
    updateMeta('name', 'twitter:description', description);
    updateMeta('name', 'twitter:image', image);

    // Canonical Link — only emit when the page provides an explicit URL.
    // Pages without an explicit canonical (e.g. NotFound) intentionally
    // emit none to avoid pointing every URL at the homepage.
    if (url) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    }

    // JSON-LD Structured Data
    //
    // Identity schemas land on the page where they're canonical, so Google
    // associates them with the correct URL:
    //   - Organization + WebSite → home (/)
    //   - SoftwareApplication    → /gradeowl
    //
    // Everything else (FAQPage, BreadcrumbList, Service) comes through the
    // `jsonLd` prop and gets appended to the @graph below.
    const baseGraph: Array<Record<string, unknown>> = [];

    if (url === HOME_URL) {
      baseGraph.push({
        "@type": "Organization",
        "name": "NeuraConcept",
        "url": "https://neuraconcept.com",
        "logo": "https://neuraconcept.com/assets/digital-brain.webp",
        "description": T("seo.org_desc"),
        "founder": {
          "@type": "Person",
          "name": "Dip Turkar",
          "jobTitle": "Founder",
        },
        // Only include URLs that actually resolve. Twitter / LinkedIn
        // company pages don't exist yet — listing fake `sameAs` URLs is
        // worse than empty for entity disambiguation.
        "sameAs": [
          "https://chat.whatsapp.com/HgeTpYJgkksAZYYOxwYMDj",
        ],
      });
      baseGraph.push({
        "@type": "WebSite",
        "name": "NeuraConcept",
        "url": "https://neuraconcept.com",
      });
    }

    if (url === GRADEOWL_URL) {
      baseGraph.push({
        "@type": "SoftwareApplication",
        "name": "GradeOwl",
        "description": T("gradeowl.seo_desc"),
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web, iOS, Android",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/PreOrder",
          "description": T("seo.free_offer"),
        },
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "teacher",
        },
        "publisher": {
          "@type": "Organization",
          "name": "NeuraConcept",
          "url": "https://neuraconcept.com",
        },
      });
    }

    // Merge any page-specific structured data into the @graph array
    const pageGraph: Array<Record<string, unknown>> = jsonLd
      ? Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      : [];

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [...baseGraph, ...pageGraph],
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
