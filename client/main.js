import './style.css'
import Alpine from 'alpinejs';
import './login';
import './app';
//import { MovieApi } from './app';
window.Alpine = Alpine
//Alpine.data('login', Login);

//Alpine.data('movieApi', MovieApi);
Alpine.start()
document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
