(() => {
  const dialogs = ["detailModal","compareModal","favoritesModal"].map(id => document.getElementById(id));
  const toastElement = document.getElementById("toast");
  let toastTimer;
  const toast = message => { toastElement.textContent = message; toastElement.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toastElement.classList.remove("show"), 2400); };
  const showDialog = id => { const dialog = document.getElementById(id); if (dialog && !dialog.open) { dialog.showModal(); document.body.classList.add("modal-open"); } };
  const closeDialog = dialog => { if (dialog.open) dialog.close(); if (!dialogs.some(item => item.open)) document.body.classList.remove("modal-open"); };
  dialogs.forEach(dialog => {
    dialog.addEventListener("click", event => { if (event.target === dialog || event.target.closest("[data-close]")) closeDialog(dialog); });
    dialog.addEventListener("close", () => { if (!dialogs.some(item => item.open)) document.body.classList.remove("modal-open"); });
  });
  const openDetails = id => {
    const car = window.PORSCHE_CARS.find(item => item.id === id); if (!car) return;
    document.getElementById("detailContent").innerHTML = `
      <div class="detail-layout"><img src="${car.img}" alt="${car.name}"><div><p class="eyebrow">${car.categoryLabel}</p><h2 id="detailTitle">${car.name}</h2><p>${car.description}</p><div class="detail-specs"><div><small>Motor</small><strong>${car.motor}</strong></div><div><small>Potência</small><strong>${car.powerLabel}</strong></div><div><small>0–100 km/h</small><strong>${car.acceleration}</strong></div><div><small>Família</small><strong>${car.family}</strong></div></div><button class="button button-light" data-play-video="${car.id}">Ver performance ↗</button></div></div>`;
    showDialog("detailModal");
  };
  document.getElementById("menuToggle").addEventListener("click", () => {
    const nav = document.getElementById("mainNav"); const open = nav.classList.toggle("open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => { document.getElementById("mainNav").classList.remove("open"); document.getElementById("menuToggle").setAttribute("aria-expanded","false"); }));
  const navbar = document.getElementById("navbar"), progress = document.getElementById("scrollProgress");
  const onScroll = () => { const y = window.scrollY; navbar.classList.toggle("scrolled", y > 40); const max = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = (max > 0 ? y/max*100 : 0) + "%"; };
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), {threshold:.12});
    document.querySelectorAll(".reveal").forEach(item => observer.observe(item));
  } else document.querySelectorAll(".reveal").forEach(item => item.classList.add("visible"));
  document.getElementById("year").textContent = new Date().getFullYear();
  window.PorscheApp = { toast, showDialog, openDetails };
})();