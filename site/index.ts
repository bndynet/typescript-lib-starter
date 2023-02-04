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
