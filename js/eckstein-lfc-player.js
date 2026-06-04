(function () {
  "use strict";
  var latest = null, mounted = false;
  function hasYoutubeConsent() {
    if (typeof klaro === "undefined") return false;
    try { return klaro.getManager().getConsent("youtube"); } catch (e) { return false; }
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }
  function renderPoster(container, data) {
    container.innerHTML = "<div class=\"lfc-video-poster\"><img src=\"img/kirche.jpg\" alt=\"\" class=\"lfc-video-poster-img\"><div class=\"lfc-video-poster-overlay\"><p class=\"lfc-video-poster-title\">" + (data ? escapeHtml(data.title) : "Langform") + "</p><p class=\"lfc-video-poster-hint\">Video lädt YouTube — Einwilligung erforderlich.</p><button type=\"button\" class=\"btn-platform lfc-video-consent-btn\">Video abspielen</button></div></div>";
    var btn = container.querySelector(".lfc-video-consent-btn");
    if (btn) btn.addEventListener("click", function () { if (typeof klaro !== "undefined") klaro.show(); });
  }
  function mountIframe(container, data) {
    if (!data || mounted) return;
    mounted = true;
    container.innerHTML = "<div class=\"lfc-video-frame\"><iframe src=\"https://www.youtube-nocookie.com/embed/" + encodeURIComponent(data.videoId) + "?rel=0&modestbranding=1\" title=\"" + escapeHtml(data.title) + "\" allowfullscreen loading=\"lazy\"></iframe></div>";
  }
  function unmount(container) { mounted = false; renderPoster(container, latest); }
  window.ecksteinLfcOnConsentChange = function () {
    document.querySelectorAll("[data-lfc-player]").forEach(function (el) {
      if (hasYoutubeConsent()) {
        if (latest) mountIframe(el, latest);
        if (window.ecksteinLogConsent) window.ecksteinLogConsent({ youtube: true });
      } else unmount(el);
    });
  };
  function init() {
    var containers = document.querySelectorAll("[data-lfc-player]");
    if (!containers.length) return;
    fetch("/api/youtube-latest-lfc").then(function (r) { return r.ok ? r.json() : null; }).then(function (data) {
      if (!data || !data.videoId) return;
      latest = data;
      containers.forEach(function (el) {
        if (hasYoutubeConsent()) mountIframe(el, data); else renderPoster(el, data);
      });
    }).catch(function () {
      containers.forEach(function (el) {
        el.innerHTML = "<p class=\"lfc-video-fallback\"><a href=\"https://www.youtube.com/playlist?list=PLx_pldXvpOEuPuQ2VFNcbyy14MmXhPtUw\" target=\"_blank\" rel=\"noopener\">Aktuelle Folge auf YouTube</a></p>";
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
