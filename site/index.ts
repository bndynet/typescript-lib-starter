import './style.css';

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
document.querySelectorAll('#navbarMain a').forEach(a => { 
  a.addEventListener('click', (e) => {
    document.body.classList.add('has-iframe');
    const url = (e.target as HTMLElement).getAttribute('data-url');
    iframe.setAttribute('src', url);
  });
});
