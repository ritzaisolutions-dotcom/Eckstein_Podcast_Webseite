(function () {
  "use strict";

  var SPOTIFY_URL = "https://open.spotify.com/show/7ukegsEnslel1gM0r5hubP";
  var PLAYLIST_URL =
    "https://www.youtube.com/playlist?list=PLx_pldXvpOEuPuQ2VFNcbyy14MmXhPtUw";

  var FALLBACK = {
    videoId: null,
    title: "Wer wir sind und was uns antreibt",
    label: "LFC · Folge 01",
    date: "18. Mai 2026",
    watchUrl: PLAYLIST_URL,
    pullquote:
      "„Der Glaube hat mich nicht weicher gemacht. Er hat mir eine Richtung gegeben.\"",
  };

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render(container, data) {
    var thumb = data.videoId
      ? "https://i.ytimg.com/vi/" + encodeURIComponent(data.videoId) + "/hqdefault.jpg"
      : "img/kirche.jpg";
    var ytUrl = data.watchUrl || PLAYLIST_URL;

    container.innerHTML =
      '<div class="episode-preview-card reveal">' +
      '<a class="episode-preview-thumb" href="' +
      escapeHtml(ytUrl) +
      '" target="_blank" rel="noopener" aria-label="Folge auf YouTube anhören">' +
      '<img src="' +
      escapeHtml(thumb) +
      '" alt="" width="640" height="360" loading="lazy">' +
      '<span class="episode-preview-play" aria-hidden="true">▶</span>' +
      "</a>" +
      '<div class="episode-preview-body">' +
      '<div class="episode-preview-meta">' +
      '<span class="episode-label">' +
      escapeHtml(data.label || "LFC") +
      "</span>" +
      (data.date ? '<span class="episode-date">' + escapeHtml(data.date) + "</span>" : "") +
      "</div>" +
      "<h3 class=\"episode-preview-title\">" +
      escapeHtml(data.title) +
      "</h3>" +
      (data.pullquote
        ? '<p class="episode-pullquote">' + escapeHtml(data.pullquote) + "</p>"
        : "") +
      '<div class="episode-preview-btns">' +
      '<a href="' +
      escapeHtml(ytUrl) +
      '" class="btn-platform" target="_blank" rel="noopener"><span class="btn-icon">▶</span> YouTube</a>' +
      '<a href="' +
      escapeHtml(SPOTIFY_URL) +
      '" class="btn-platform" target="_blank" rel="noopener">Spotify</a>' +
      "</div>" +
      "</div>" +
      "</div>";
  }

  function formatDate(iso) {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString("de-DE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return "";
    }
  }

  function init() {
    var container = document.getElementById("episode-preview-mount");
    if (!container) return;

    render(container, FALLBACK);

    fetch("/api/youtube-latest-lfc")
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (data) {
        if (!data || !data.videoId) return;
        render(container, {
          videoId: data.videoId,
          title: data.title || FALLBACK.title,
          label: "LFC · Neueste Folge",
          date: formatDate(data.published),
          watchUrl: data.watchUrl || PLAYLIST_URL,
          pullquote: FALLBACK.pullquote,
        });
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
