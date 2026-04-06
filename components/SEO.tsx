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

  // JSON-LD Structured Data for "Person" (Helps with Knowledge Graph)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lutfur Rahman Kajal",
    "alternateName": ["লুৎফুর রহমান কাজল", "Kajal MP", "Lutfur Rahman"],
    "jobTitle": "Member of Parliament",
    "description": "Member of Parliament, Cox's Bazar-3. Central Fisheries Affairs Secretary, BNP.",
    "affiliation": {
      "@type": "Organization",
      "name": "Bangladesh Nationalist Party (BNP)"
    },
    "url": "https://kazal.com", 
    "image": "https://image.mojib.me/uploads/General/1775299892_aece70c0-28d9-4dc1-8e43-3fa8491228a3.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cox's Bazar",
      "addressCountry": "Bangladesh"
    },
    "sameAs": [
      "https://facebook.com",
      "https://youtube.com",
      "https://en.wikipedia.org/wiki/Lutfur_Rahman_Kajal" 
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Lutfur Rahman Kajal" />
      <meta name="publisher" content="Mojib Rsm" />
      
      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Lutfur Rahman Kajal Official" />
      <meta property="og:locale" content="bn_BD" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;