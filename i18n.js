(function () {
  var ATTRS = ['title', 'aria-label', 'alt', 'placeholder', 'data-caption'];

  function getLang() {
    try { return localStorage.getItem('lang') || 'th'; } catch (e) { return 'th'; }
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);

    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (lang === 'en') {
        if (el.dataset.th === undefined) el.dataset.th = el.innerHTML;
        el.innerHTML = el.dataset.en;
      } else if (el.dataset.th !== undefined) {
        el.innerHTML = el.dataset.th;
      }
    });

    ATTRS.forEach(function (attr) {
      var sel = '[data-en-' + attr + ']';
      var cacheKey = 'orig' + attr.charAt(0).toUpperCase() + attr.slice(1).replace(/-([a-z])/g, function (m, c) { return c.toUpperCase(); });
      document.querySelectorAll(sel).forEach(function (el) {
        var enVal = el.getAttribute('data-en-' + attr);
        if (lang === 'en') {
          if (el.dataset[cacheKey] === undefined) el.dataset[cacheKey] = el.getAttribute(attr) || '';
          el.setAttribute(attr, enVal);
        } else if (el.dataset[cacheKey] !== undefined) {
          el.setAttribute(attr, el.dataset[cacheKey]);
        }
      });
    });
  }

  function setLang(lang) {
    try { localStorage.setItem('lang', lang); } catch (e) {}
    applyLang(lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang());
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        setLang(getLang() === 'th' ? 'en' : 'th');
      });
    }
  });
})();
