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

// Use top-level await in this module to load and process the manifest
async function loadManifestMeta() {
  try {
    // Use the manifest link tag if available, else default to "manifest.json"
    const manifestLink = document.querySelector('link[rel="manifest"]');
    const manifestUrl = manifestLink ? manifestLink.href : 'manifest.json';
    const response = await fetch(manifestUrl);
    const manifest = await response.json();

    // Set the HTML lang and direction
    if (manifest.lang) {
      document.documentElement.lang = manifest.lang;
    }
    if (manifest.dir) {
      document.documentElement.dir = manifest.dir;
    }

    // Set the document title from the manifest "name"
    if (manifest.name) {
      document.title = manifest.name;
    }

    // Helper to create meta tags and append them to head
    function createMeta(attributeType, attributeValue, content) {
      const meta = document.createElement('meta');
      meta.setAttribute(attributeType, attributeValue);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }

    // Description meta tag
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
    // Set og:type to "website"
    createMeta('property', 'og:type', 'website');
    // Set og:locale using the manifest language
    if (manifest.lang) {
      createMeta('property', 'og:locale', manifest.lang);
    }
    // Use the screenshot with label "Wallpaper" for og:image
    if (Array.isArray(manifest.screenshots)) {
      const wallpaper = manifest.screenshots.find(s => s.label === "Wallpaper");
      if (wallpaper && wallpaper.src) {
        createMeta('property', 'og:image', wallpaper.src);
      }
    }
    // Optionally, use "start_url" as og:url and add a canonical link
    if (manifest.start_url) {
      createMeta('property', 'og:url', manifest.start_url);
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = manifest.start_url;
      document.head.appendChild(canonical);
    }

    // Theme and background color meta tags
    if (manifest.theme_color) {
      createMeta('name', 'theme-color', manifest.theme_color);
    }
    if (manifest.background_color) {
      createMeta('name', 'background-color', manifest.background_color);
    }

    // Add icons as link tags (including favicon)
    if (Array.isArray(manifest.icons)) {
      manifest.icons.forEach(icon => {
        const link = document.createElement('link');
        // For favicon purposes, we add every icon (browsers may pick the best match)
        link.rel = 'icon';
        link.href = icon.src;
        if (icon.sizes) {
          link.sizes = icon.sizes;
        }
        if (icon.type) {
          link.type = icon.type;
        }
        document.head.appendChild(link);
      });
    }
  } catch (error) {
    console.error("Error loading manifest:", error);
  }
};

// Await the manifest meta loading so that it executes before further rendering if possible.
await loadManifestMeta();
