import './style.css';
import 'zone.js/dist/zone';
import { addGlobalUncaughtErrorHandler, registerMicroApps as r, start as s } from 'qiankun';
import { examples } from './config';

const axios = require('axios');
const showdown = require('showdown');

axios.get('../README.md').then((response: any) => {
  var converter = new showdown.Converter();
  document.getElementById('readme').innerHTML = converter.makeHtml(response.data);
});

axios.get('../CHANGELOG.md').then((response: any) => {
  var converter = new showdown.Converter();
  document.getElementById('changelog-body').innerHTML = converter.makeHtml(response.data);
});

document.querySelector('#brand').addEventListener('click', (e) => {
  document.body.classList.remove('has-iframe');
});

let iframe = document.querySelector('iframe');
if (!iframe) {
  iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
}
document.querySelectorAll('#navbarMain a').forEach((a) => {
  a.addEventListener('click', (e) => {
    document.body.classList.add('has-iframe');
    const url = (e.target as HTMLElement).getAttribute('data-url');
    iframe.setAttribute('src', url);
  });
});

const navExamples = document.querySelector('#examples-nav');
const sectionExamples = document.querySelector('#examples');
examples.forEach((ex) => {
  const nav = document.createElement('a');
  nav.classList.add('nav-link');
  nav.href = `#${ex.name}`;
  nav.textContent = ex.title;
  navExamples.appendChild(nav);

  const title = document.createElement('h2');
  title.textContent = ex.title;
  const container = document.createElement('div');
  container.id = ex.name;
  sectionExamples.appendChild(title);
  sectionExamples.appendChild(container);
});

r(
  examples.map((ex) => ({ name: ex.name, entry: ex.path, container: `#${ex.name}`, activeRule: `` })),
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
}, 1000)
