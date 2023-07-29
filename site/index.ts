import './style.scss';
import 'zone.js/dist/zone';
import { addGlobalUncaughtErrorHandler, registerMicroApps as r, start as s } from 'qiankun';
import { examples } from './config';
import { htmlEncode } from 'js-htmlencode';

const axios = require('axios');
const showdown = require('showdown');

function includeHTML() {
  var z, i, file, xhttp;
  let elmnt: HTMLElement;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i] as HTMLElement;
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-file");
    const asCode = elmnt.getAttribute("w3-html-encode") === ''; 
    if (file) {
      // set loading
      if (asCode) {
        const loadingHtml = `<div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span></div>`;
        elmnt.innerHTML = loadingHtml;
      }
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = asCode ? htmlEncode(this.responseText) : this.responseText;
            hljs?.highlightAll();
          }
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-file");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
includeHTML();

function getAsset(assetFile: string): string {
  return BASE_URL ? `${BASE_URL}${assetFile}` : assetFile;
}

function getQueryValue(key: string): string {
  const qs = location.search.replace('?', '').split('&');
  return qs.find(q => q.toLowerCase().startsWith(key.toLowerCase()))?.split('=')[1] || '';
}

if (!location.pathname.endsWith('.html') || location.pathname.indexOf('index.html') > 0) {
  // home page
  document.querySelectorAll('.typewriter').forEach(ele => {
    const text = ele.textContent;
    new Typewriter(ele, {
      loop: false,
      cursor: '_',
      delay: 75,
    })
    .typeString(text.trim())
    .pauseFor(500)
    .start();
  });
}

if (location.pathname.indexOf('md.html') > 0) {
  // md page
  document.getElementById('nav-title').innerHTML = decodeURI(getQueryValue('title'));
  document.body.classList.add(`body-${getQueryValue('theme') || 'primary'}`);
  const md = getQueryValue('file');
  if (md) {
    axios.get(getAsset(md)).then((response: any) => {
      var converter = new showdown.Converter();
      const elem = document.getElementById('file-content');
      if (elem) {
        elem.innerHTML = converter.makeHtml(response.data);
      }
    }); 
  }
}

if (location.pathname.indexOf('components.html') > 0) {
  const navExamples = document.querySelector('#doc-menu');
  if (navExamples) {
    const sectionExamples = document.querySelector('#doc-content');
    examples.forEach((ex) => {
      const nav = document.createElement('li');
      nav.classList.add('nav-item');
      const navA = document.createElement('a');
      navA.classList.add('nav-link');
      navA.classList.add('scrollto');
      navA.href = `components.html#${ex.name}`;
      navA.textContent = ex.title;
      nav.appendChild(navA);
      navExamples.appendChild(nav);

      const section = document.createElement('section');
      section.id = ex.name;
      section.classList.add('doc-section');
      sectionExamples.appendChild(section);


      const title = document.createElement('h2');
      title.classList.add('section-title');
      title.textContent = ex.title;
      section.appendChild(title);

      const container = document.createElement('div');
      container.id = `${ex.name}-container`;
      container.classList.add('section-block');
      section.appendChild(container);
    });
  }

  r(
    examples.map((ex) => ({ name: ex.name, entry: (BASE_URL + ex.path).replace('//', '/'), container: `#${ex.name}-container`, activeRule: `` })),
    {
      beforeLoad: (app: any) => {
        console.log('before load', app.name);
        return Promise.resolve();
      },
      afterMount: (app: any) => {
        console.log('after mount', app.name);
        return Promise.resolve();
      },
    },
  );
  
  addGlobalUncaughtErrorHandler((event: Event | string) => {
    console.error(event);
  });
  
  setTimeout(() => {
    s({ prefetch: 'all', singular: false });
  }, 1000);
}

