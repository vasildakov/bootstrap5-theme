// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import SelectorEngine from 'bootstrap/js/src/dom/selector-engine';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';

//import { MathJax } from 'mathjax/es5/tex-mml-chtml.js';
import AlbertEinsteinImage from '../images/albert-einstein.jpg';

const demo = () =>
  'Webpack Bootstrap5 Starter - A starter frontend boilerplate using Webpack 5, Bootstrap 5, SASS, PostCSS, Babel, ESLint, Stylelint, Prettier and more.';

const sayHello = () => `Hello World and ${process.env.HELLO}!`;

console.log(demo());
console.log(sayHello());
console.log(AlbertEinsteinImage);

// --------
// Dropdowns
// --------
const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
dropdownElementList.forEach((dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl));

// --------
// Tooltips
// --------
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipTriggerList.forEach((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

// --------
// Popovers
// --------
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
popoverTriggerList.forEach((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));

// --------
// Toasts
// --------
const toastTriggerList = document.querySelectorAll('[data-bs-toggle="toast"]');
toastTriggerList.forEach((toastTriggerEl) => {
  // Define the target property
  const toastTargetEl = SelectorEngine.getElementFromSelector(toastTriggerEl);

  if (!toastTargetEl) {
    return;
  }

  // Initialize toast
  const toast = new bootstrap.Toast(toastTargetEl);

  // Add click even to trigger
  toastTriggerEl.addEventListener('click', function (event) {
    event.preventDefault();
    toast.show();
  });
});

// --------
// Toggle theme
// --------
document.querySelector('.js-bs-theme-toggle').addEventListener('click', () => {
  if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    localStorage.setItem('data-bs-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    localStorage.setItem('data-bs-theme', 'dark');
  }
});

(function () {
  const theme = localStorage.getItem('data-bs-theme') || 'light';
  document.getElementsByTagName('html')[0].setAttribute('data-bs-theme', theme);
})();

// --------
// Font Size
// --------
const affectedElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');

// Store the original size in a data attribute
affectedElements.forEach((element) => {
  element.dataset.origSize = window.getComputedStyle(element).fontSize;
});

document.getElementById('btn-increase').addEventListener('click', () => changeFontSize(1));
document.getElementById('btn-decrease').addEventListener('click', () => changeFontSize(-1));
document.getElementById('btn-original').addEventListener('click', () => {
  affectedElements.forEach((element) => {
    element.style.fontSize = element.dataset.origSize;
  });
});

function changeFontSize(direction) {
  affectedElements.forEach((element) => {
    const currentSize = parseInt(window.getComputedStyle(element).fontSize);
    element.style.fontSize = `${currentSize + direction}px`;
  });
}
