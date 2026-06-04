(function () {
  var grid = document.getElementById('inspiration-grid');
  if (!grid) return;

  var base = document.body.getAttribute('data-inspiration-base') || '/inspiration/';
  var jsonUrl = base.replace(/\/?$/, '/') + 'churches.json';

  fetch(jsonUrl)
    .then(function (r) {
      if (!r.ok) throw new Error('churches.json');
      return r.json();
    })
    .then(function (churches) {
      churches.forEach(function (c) {
        var card = document.createElement('article');
        card.className = 'inspiration-card reveal';
        card.innerHTML =
          '<figure class="inspiration-card-figure">' +
          '<img src="' +
          c.image +
          '" alt="' +
          escapeHtml(c.name + ', ' + c.location) +
          '" loading="lazy" width="1600" height="1067">' +
          '</figure>' +
          '<div class="inspiration-card-body">' +
          '<h2 class="inspiration-card-name">' +
          escapeHtml(c.name) +
          '</h2>' +
          '<p class="inspiration-card-location">' +
          escapeHtml(c.location) +
          '</p>' +
          (c.caption
            ? '<p class="inspiration-card-caption">' + escapeHtml(c.caption) + '</p>'
            : '') +
          '</div>';
        grid.appendChild(card);
      });
      if (typeof window.__ecksteinReveal === 'function') window.__ecksteinReveal();
    })
    .catch(function () {
      grid.innerHTML =
        '<p class="inspiration-error">Galerie konnte nicht geladen werden. Bitte später erneut versuchen.</p>';
    });

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
