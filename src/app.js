import 'normalize.css';
import './css/general.css';
import './css/guitar.css';
import './css/controls.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './js/polyfill.classlist.js';
import './js/polyfill.matches.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

require('./js/main.js');
