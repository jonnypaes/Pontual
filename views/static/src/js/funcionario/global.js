// src/js/funcionario/global.js

var latitude;
var longitude;
var userInput;

var userInput = document.querySelector('input[type="text"]');
var message = document.getElementById('message');

var now = new Date();
var currentHour = now.getHours();
var currentMinute = now.getMinutes();

var currentUrl = new URL(window.location.href);
var defaultPage = new URL('../', currentUrl).pathname;	  
var language = navigator.languages || navigator.language || navigator.userLanguage;	  
var languagesAvailable = ["pt-BR", "en-US", "es-ES", "ru-RU"];
var languagesMatched = (navigator.languages || [navigator.language]).find(lang => languagesAvailable.includes(lang)) || languagesAvailable[0];

async function loadManifestMeta() {
  try {
    // Resolve the manifest URL via the link tag or default to "manifest.json"
    const manifestLink = document.querySelector('link[rel="manifest"]');
    const manifestHref = manifestLink ? manifestLink.href : 'manifest.json';
    const manifestBaseUrl = new URL(manifestHref, window.location.href);
    const response = await fetch(manifestBaseUrl);
    const manifest = await response.json();

    // Set HTML language and text direction
    if (manifest.lang) document.documentElement.lang = manifest.lang;
    if (manifest.dir) document.documentElement.dir = manifest.dir;

    // Set the document title from the manifest
    if (manifest.name) document.title = manifest.name;

    // Helper to create meta tags
    function createMeta(attrType, attrValue, content) {
      const meta = document.createElement('meta');
      meta.setAttribute(attrType, attrValue);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }

    // Helper to create link tags
    function createLink(rel, href, sizes = '', type = '') {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (sizes) link.sizes = sizes;
      if (type) link.type = type;
      document.head.appendChild(link);
    }

    // Helper to create comments with a line break before
    function createCommentWithLineBreak(commentText) {
      const comment = document.createComment(commentText);
      document.head.appendChild(document.createTextNode('\n'));
      document.head.appendChild(comment);
    }

    // Begin adding meta tags
    createCommentWithLineBreak("Open Graph / Meta tags (dynamic)");

    // Description meta
    if (manifest.description) {
      createMeta('name', 'description', manifest.description);
      createMeta('property', 'og:description', manifest.description);
    }

    // Open Graph meta tags
    if (manifest.name) {
      createMeta('property', 'og:title', manifest.name);
    }
    createMeta('property', 'og:type', 'website');
    if (manifest.lang) {
      createMeta('property', 'og:locale', manifest.lang);
    }
    // Use the "Wallpaper" screenshot as og:image (if available)
    if (Array.isArray(manifest.screenshots)) {
      const wallpaper = manifest.screenshots.find(s => s.label === "Wallpaper");
      if (wallpaper && wallpaper.src) {
        // Resolve the screenshot's relative URL to an absolute one
        const imgUrl = new URL(wallpaper.src, currentUrl).href;
        createMeta('property', 'og:image', imgUrl);
      }
    }

    // Open Graph and Canonical URLs (with dynamic concatenation)
    if (manifest.start_url) {
      createMeta('property', 'og:url', currentUrl);
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = currentUrl;
      document.head.appendChild(canonical);
    }

    // Add theme color and background color
    if (manifest.theme_color) {
      createMeta('name', 'theme-color', manifest.theme_color);
    }
    if (manifest.background_color) {
      createMeta('name', 'background-color', manifest.background_color);
    }

    // Begin adding link tags for icons
    createCommentWithLineBreak("Link tags for icons (dynamic)");

    // Add icons as link tags (resolve their URLs as needed)
    if (Array.isArray(manifest.icons)) {
      manifest.icons.forEach(icon => {
        const iconUrl = new URL(icon.src, manifestBaseUrl).href;
        createLink('icon', iconUrl, icon.sizes, icon.type);
      });
    }

    // Begin adding JSON-LD structured data
    createCommentWithLineBreak("JSON-LD Structured Data (dynamic)");

    // Construct JSON‑LD using manifest data and your URL logic.
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": manifest.name || "Website",
      "url": manifest.start_url ? new URL(manifest.start_url, currentUrl).href : currentUrl.href,
      "description": manifest.description,
      "image": new URL(`${defaultPage}static/public/graph/512x512.jpg`, currentUrl).href
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

  } catch (error) {
    console.error("Error loading manifest:", error);
  }
}
await loadManifestMeta();
