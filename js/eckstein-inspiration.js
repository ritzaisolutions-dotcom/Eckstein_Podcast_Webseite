(function () {
  var grid = document.getElementById('inspiration-grid');
  if (!grid) return;

  var base = document.body.getAttribute('data-inspiration-base') || '/inspiration/';
  var jsonUrl = base.replace(/\/?$/, '/') + 'churches.json';

  var lightbox = document.getElementById('inspiration-lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var lightboxCaption = lightbox ? lightbox.querySelector('.inspiration-lightbox-caption') : null;

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.closest('[data-lightbox-close]')) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  fetch(jsonUrl)
    .then(function (r) {
      if (!r.ok) throw new Error('churches.json');
      return r.json();
    })
    .then(function (churches) {
      churches.forEach(function (c) {
        var card = document.createElement('article');
        card.className = 'inspiration-card reveal';
        card.id = c.slug;
        card.style.scrollMarginTop = '5rem';

        var caption = c.name + ', ' + c.location;
        var figure = document.createElement('figure');
        figure.className = 'inspiration-card-figure';
        var img = document.createElement('img');
        img.src = c.image;
        img.alt = caption;
        img.loading = 'lazy';
        img.width = 1600;
        img.height = 1067;
        img.tabIndex = 0;
        img.role = 'button';
        img.setAttribute('aria-label', caption + ' vergrößern');
        img.addEventListener('click', function () {
          openLightbox(c.image, caption);
        });
        img.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(c.image, caption);
          }
        });
        figure.appendChild(img);

        var body = document.createElement('div');
        body.className = 'inspiration-card-body';
        body.innerHTML =
          '<h2 class="inspiration-card-name">' +
          escapeHtml(c.name) +
          '</h2>' +
          '<p class="inspiration-card-location">' +
          escapeHtml(c.location) +
          '</p>' +
          (c.caption
            ? '<p class="inspiration-card-caption">' + escapeHtml(c.caption) + '</p>'
            : '');

        card.appendChild(figure);
        card.appendChild(body);
        grid.appendChild(card);
      });

      if (location.hash) {
        var target = document.getElementById(location.hash.slice(1));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

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
