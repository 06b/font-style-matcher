(function() {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(_ => {
      console.log('service worker is all cool 🐳');
    }).catch(e => {
      console.error('service worker is not so cool 🔥', e);
      throw e;
    });

    // if (navigator.serviceWorker.controller) {
    //   // Correctly prompt the user to reload during SW phase change.
    //   navigator.serviceWorker.controller.onstatechange = e => {
    //     if (e.target.state === 'redundant') {
    //       document.querySelector('#reload-prompt').style.visibility = 'visible';
    //     }
    //   }
    // }
  }

  checkbox.addEventListener('change', fout);

  fallback.style.fontFamily = fallbackOutput.style.fontFamily = fallbackName.value;
  webfont.style.fontFamily = webfontOutput.style.fontFamily = webfontName.value;
  fallback.style.fontSize = fallbackOutput.style.fontSize = '16px';
  webfont.style.fontSize = webfontOutput.style.fontSize = '16px';

  fallbackName.addEventListener('change', updateFontFamily);
  webfontName.addEventListener('change', updateFontFamily);

  fallbackSize.addEventListener('change', updateFontSize);
  fallbackSize.addEventListener('input', updateFontSize);
  webfontSize.addEventListener('change', updateFontSize);
  webfontSize.addEventListener('input', updateFontSize);

  fallbackSpacing.addEventListener('change', updateFontSpacing);
  fallbackSpacing.addEventListener('input', updateFontSpacing);
  webfontSpacing.addEventListener('change', updateFontSpacing);
  webfontSpacing.addEventListener('input', updateFontSpacing);

  fallbackWeight.addEventListener('change', updateFontWeight);
  fallbackWeight.addEventListener('input', updateFontWeight);
  webfontWeight.addEventListener('change', updateFontWeight);
  webfontWeight.addEventListener('input', updateFontWeight);

  function updateFontSize(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('font-size', which, value);
    updateStyle('font-size', which + 'Output', value);
  }

  function updateFontSpacing(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('letter-spacing', which, value);
    updateStyle('letter-spacing', which + 'Output', value);
  }

  function updateFontFamily(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('font-family', which, value);
    updateStyle('font-family', which + 'Output', value);
  }

  function updateFontWeight(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('font-weight', which, value);
    updateStyle('font-weight', which + 'Output', value);
    document.getElementById(which + 'WeightDisplay').textContent = value;
  }

  function updateStyle(name, element, value) {
    document.getElementById(element).style[name] = value;
  }

  function fout(event) {
    if (!event.target.checked) {
      clearTimeout(window.__timeout1);
      clearTimeout(window.__timeout2);
      fallbackOutput.style.visibility = 'visible';
      webfontOutput.style.visibility = 'visible';
    } else {
      startFout();
    }
  }

  function startFout() {
    fallbackOutput.style.visibility = 'hidden';
    webfontOutput.style.visibility = 'hidden';

    window.__timeout1 = setTimeout(function() {
      fallbackOutput.style.visibility = 'visible';

      setTimeout(function() {
        fallbackOutput.style.visibility = 'hidden';
        webfontOutput.style.visibility = 'visible';
        window.__timeout2 = setTimeout(startFout, 1000);
      }, 500);
    }, 100)
  }
})();
