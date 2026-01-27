import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({ 
  title, 
  description, 
  keywords = "EdTech, AI, Learning, Education, Future",
  image = "/assets/digital-brain.png",
  url = "https://neuraconcept.com",
  type = "website"
}: SEOProps) => {
  useEffect(() => {
    // Basic Title Update
    const siteTitle = "NeuraConcept | The Future of Learning";
    const fullTitle = title === "Home" ? siteTitle : `${title} | NeuraConcept`;
    document.title = fullTitle;

    // Helper to update or create meta tags
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
    updateMeta('name', 'keywords', keywords);

    // Open Graph
    updateMeta('property', 'og:title', fullTitle);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:image', image);
    updateMeta('property', 'og:url', url);
    updateMeta('property', 'og:type', type);

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
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "NeuraConcept",
          "url": "https://neuraconcept.com",
          "logo": "https://neuraconcept.com/assets/digital-brain.png",
          "sameAs": [
            "https://twitter.com/neuraconcept",
            "https://linkedin.com/company/neuraconcept"
          ]
        },
        {
          "@type": "WebSite",
          "name": "NeuraConcept",
          "url": "https://neuraconcept.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://neuraconcept.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);

  }, [title, description, keywords, image, url, type]);

  // Render nothing
  return null;
};
