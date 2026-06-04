(function () {
  "use strict";
  window.klaroConfig = {
    version: 1,
    elementID: "klaro",
    styling: { theme: ["dark", "top", "wide"] },
    lang: "de",
    translations: {
      de: {
        consentModal: { title: "Datenschutz & Einwilligung", description: "Externe Dienste nur mit Einwilligung." },
        consentNotice: { description: "YouTube-Einbettungen für Langform-Folgen. {privacyPolicy}", learnMore: "Einstellungen" },
        privacyPolicy: { name: "Datenschutzerklärung", text: "Datenschutz →" },
        ok: "Alle akzeptieren", save: "Speichern", decline: "Ablehnen", close: "Schließen",
        purposes: { media: "Medien" },
        youtube: { title: "YouTube", description: "Eingebettete Langform-Folgen (LFC)." }
      }
    },
    services: [{ name: "youtube", title: "YouTube", purposes: ["media"], required: false, default: false }],
    mustNoticeConsent: true,
    acceptAll: true,
    privacyPolicy: "/#datenschutz",
    callback: function (consent, service) {
      if (window.ecksteinLfcOnConsentChange) window.ecksteinLfcOnConsentChange();
    }
  };
})();
