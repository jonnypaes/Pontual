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

function createMetaTag(name, content, isProperty = false) {
    const meta = document.createElement('meta');
    if (isProperty) {
        meta.setAttribute('property', name);
    } else {
        meta.setAttribute('name', name);
    }
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
};

function createLinkTag(rel, href) {
    const link = document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('href', href);
    document.head.appendChild(link);
};

createMetaTag('title', 'O Pontual');
createMetaTag('og:title', 'O Pontual');
createMetaTag('og:url', currentUrl, true);
createMetaTag('og:image', `${defaultPage}static/public/graph/512x512.jpg`, true);
createMetaTag('og:type', 'website', true);
createMetaTag('description', 'O Pontual - Um aplicativo minimalista para apontamento');
createMetaTag('og:description', 'O Pontual - Um aplicativo minimalista para apontamento');
createLinkTag('canonical', currentUrl);
