(function () {
  "use strict";
  document.querySelectorAll("[data-fundament-print]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      window.print();
    });
  });
  if (new URLSearchParams(window.location.search).has("drucken")) {
    window.addEventListener("load", function () {
      setTimeout(function () { window.print(); }, 400);
    });
  }
})();
