(function () {
  "use strict";

  /* Menú en celular */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("menu");
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* Animación de entrada al hacer scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* Galería con foto ampliada */
  var dialog = document.getElementById("lightbox");
  var tiles = Array.prototype.slice.call(document.querySelectorAll(".tile"));
  if (dialog && tiles.length && typeof dialog.showModal === "function") {
    var img = dialog.querySelector("img");
    var cap = dialog.querySelector("figcaption");
    var current = 0;
    var show = function (i) {
      current = (i + tiles.length) % tiles.length;
      var t = tiles[current];
      img.src = t.dataset.full;
      img.alt = t.dataset.alt || "";
      cap.textContent = t.dataset.caption || "";
    };
    tiles.forEach(function (t, i) {
      t.addEventListener("click", function () {
        show(i);
        dialog.showModal();
      });
    });
    dialog.querySelector(".lightbox__close").addEventListener("click", function () {
      dialog.close();
    });
    dialog.querySelector(".lightbox__prev").addEventListener("click", function () {
      show(current - 1);
    });
    dialog.querySelector(".lightbox__next").addEventListener("click", function () {
      show(current + 1);
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* Video de YouTube: se carga solo al tocar */
  document.querySelectorAll("[data-yt]").forEach(function (box) {
    var btn = box.querySelector(".video__btn");
    if (!btn) return;
    var thumb = btn.querySelector("img");
    if (thumb) {
      thumb.addEventListener("error", function () {
        thumb.style.display = "none";
      });
    }
    btn.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + box.dataset.yt + "?autoplay=1&rel=0&playsinline=1";
      f.title = "Video de Piscinas San José";
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      btn.replaceWith(f);
    });
  });

  /* Formulario: vuelve a esta misma página y muestra el aviso */
  var form = document.querySelector("form.form");
  if (form) {
    var next = form.querySelector('input[name="_next"]');
    if (next && /^https?:$/.test(location.protocol)) {
      next.value = location.origin + location.pathname + "?enviado=true#contacto";
    }
    if (new URLSearchParams(location.search).get("enviado") === "true") {
      var ok = document.getElementById("form-ok");
      if (ok) ok.hidden = false;
    }
  }

  /* Año del pie de página */
  var year = document.getElementById("anio");
  if (year) year.textContent = new Date().getFullYear();
})();
