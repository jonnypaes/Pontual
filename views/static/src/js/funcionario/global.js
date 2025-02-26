// src/js/funcionario/global.js

var latitude;
var longitude;
var userInput;
var isChecked;

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

const CACHE_VERSION = 'version-3'; // Increment the version for cache updates
const CACHE_NAME = `${CACHE_VERSION}-static`;
