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
    const manifestUrl = manifestLink ? manifestLink.href : 'manifest.json';
    const response = await fetch(manifestUrl);
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

    // Description meta
    if (manifest.description) {
      createMeta('name', 'description', manifest.description);
    }

    // Open Graph meta tags
    if (manifest.name) {
      createMeta('property', 'og:title', manifest.name);
    }
    if (manifest.description) {
      createMeta('property', 'og:description', manifest.description);
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
        const imgUrl = new URL(wallpaper.src, window.location.href).href;
        createMeta('property', 'og:image', imgUrl);
      }
    }

    // Get the current URL and default page for proper concatenation
    const currentUrl = new URL(window.location.href);
    const defaultPage = new URL('../', currentUrl).pathname;

    // Use manifest.start_url (resolved against currentUrl) for og:url and canonical link
    if (manifest.start_url) {
      const resolvedStartUrl = new URL(manifest.start_url, currentUrl).href;
      createMeta('property', 'og:url', resolvedStartUrl);
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = resolvedStartUrl;
      document.head.appendChild(canonical);
    }

    // Theme and background colors
    if (manifest.theme_color) {
      createMeta('name', 'theme-color', manifest.theme_color);
    }
    if (manifest.background_color) {
      createMeta('name', 'background-color', manifest.background_color);
    }

    // Add icons as link tags (resolve their URLs as needed)
    if (Array.isArray(manifest.icons)) {
      manifest.icons.forEach(icon => {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = new URL(icon.src, window.location.href).href;
        if (icon.sizes) link.sizes = icon.sizes;
        if (icon.type) link.type = icon.type;
        document.head.appendChild(link);
      });
    }

    // Now, add JSON‑LD structured data at runtime
    function createJsonLd(jsonObj) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonObj);
      document.head.appendChild(script);
    }

    // Construct JSON‑LD using manifest data and your URL logic.
    // Note: Adjust the image path as needed; here we concatenate defaultPage with a fixed image path.
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": manifest.name || "Website",
      "url": manifest.start_url ? new URL(manifest.start_url, currentUrl).href : currentUrl.href,
      "description": manifest.description,
      "image": new URL(`${defaultPage}static/public/graph/512x512.jpg`, currentUrl).href,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${currentUrl.href}search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
    createJsonLd(jsonLdData);

  } catch (error) {
    console.error("Error loading manifest:", error);
  }
};
await loadManifestMeta();
