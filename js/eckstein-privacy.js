(function () {
  "use strict";
  function hashSession() {
    var key = "eckstein_sid", id = localStorage.getItem(key);
    if (!id) { id = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()) + Math.random(); localStorage.setItem(key, id); }
    return id;
  }
  window.ecksteinLogConsent = function (services) {
    return fetch("/api/log-consent", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ services: services, privacy_version: "2026-06-04", session_hash: hashSession(), klaro_version: "klaro-cdn" })
    }).catch(function () {});
  };
})();
