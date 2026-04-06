import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'profile';
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  keywords = [], 
  image = 'https://image.mojib.me/uploads/General/1775299892_aece70c0-28d9-4dc1-8e43-3fa8491228a3.png',
  type = 'website'
}) => {
  const siteUrl = window.location.origin;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const url = window.location.href;

  // JSON-LD Structured Data (Graph structure as requested)
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Lutfur Rahman Kajal",
        "alternateName": ["লুৎফুর রহমান কাজল", "Kajal MP", "কাজল এমপি"],
        "url": "http://kazal.pro.bd/",
        "image": "http://kazal.pro.bd/profile.jpg",
        "jobTitle": "Member of Parliament",
        "worksFor": {
          "@type": "Organization",
          "name": "Bangladesh Nationalist Party"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Cox's Bazar-3",
          "addressRegion": "Cox's Bazar",
          "addressCountry": "Bangladesh"
        },
        "knowsAbout": [
          "Politics", "Bangladesh politics", "Cox's Bazar politics",
          "Election", "Political career", "Public speech"
        ],
        "sameAs": [
          "http://kazal.pro.bd/"
        ]
      },
      {
        "@type": "WebSite",
        "name": "Kazal Official Website",
        "url": "http://kazal.pro.bd/",
        "publisher": {
          "@type": "Person",
          "name": "Mojib Rsm",
          "url": "https://www.mojib.me"
        },
        "inLanguage": "bn-BD"
      },
      {
        "@type": "Organization",
        "name": "Kazal Media",
        "url": "http://kazal.pro.bd/",
        "founder": {
          "@type": "Person",
          "name": "Mojib Rsm",
          "url": "https://www.mojib.me"
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="google-site-verification" content="7bEm-ae1S5qDih74Q2jk8Exm0YVb1PGhaqxEW86M05E" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <meta name="author" content="Lutfur Rahman Kajal" />
      <meta name="publisher" content="Mojib Rsm" />
      
      {/* Canonical Link */}
      <link rel="canonical" href={canonical || "http://kazal.pro.bd/"} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl || "http://kazal.pro.bd/preview.jpg"} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Lutfur Rahman Kajal Official" />
      <meta property="og:locale" content="bn_BD" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl || "http://kazal.pro.bd/preview.jpg"} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaGraph)}
      </script>
    </Helmet>
  );
};

export default SEO;