(() => {
  const cars = window.PORSCHE_CARS || [];
  const grid = document.getElementById("carGrid");
  if (!grid) return;
  let filter = "todos";
  let query = "";
  let sort = "featured";
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const render = () => {
    let results = cars.filter(car => (filter === "todos" || car.category === filter) && (car.name + " " + car.motor + " " + car.categoryLabel).toLowerCase().includes(query));
    if (sort === "power") results.sort((a,b) => b.power-a.power);
    if (sort === "name") results.sort((a,b) => a.name.localeCompare(b.name, "pt-BR"));
    grid.innerHTML = results.map(car => `
      <article class="car-card">
        <div class="car-image"><img src="${escapeHTML(car.img)}" alt="${escapeHTML(car.name)}" loading="lazy"><span class="car-tag">${escapeHTML(car.categoryLabel)}</span>
          <button class="favorite-btn ${window.PorscheFavorites?.has(car.id) ? "active" : ""}" data-favorite="${car.id}" aria-label="Favoritar ${escapeHTML(car.name)}" aria-pressed="${window.PorscheFavorites?.has(car.id) ? "true" : "false"}">♥</button>
        </div>
        <div class="car-info"><span class="car-kicker">${escapeHTML(car.family)}</span><h3>${escapeHTML(car.name)}</h3>
          <div class="spec-row"><div class="spec"><small>Motor</small><strong>${escapeHTML(car.motor)}</strong></div><div class="spec"><small>Potência</small><strong>${escapeHTML(car.powerLabel)}</strong></div><div class="spec"><small>0–100</small><strong>${escapeHTML(car.acceleration)}</strong></div></div>
          <div class="card-actions"><button class="text-button" data-details="${car.id}">Explorar <span>↗</span></button><label class="compare-check"><input type="checkbox" data-compare="${car.id}" ${window.PorscheComparator?.has(car.id) ? "checked" : ""}> Comparar</label></div>
        </div>
      </article>`).join("");
    document.getElementById("emptyState").hidden = results.length !== 0;
    document.getElementById("catalogCount").textContent = String(results.length).padStart(2,"0") + " MODELOS";
  };
  document.getElementById("searchInput").addEventListener("input", event => { query = event.target.value.trim().toLowerCase(); render(); });
  document.getElementById("filterGroup").addEventListener("click", event => {
    const button = event.target.closest("[data-filter]"); if (!button) return;
    filter = button.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach(item => item.classList.toggle("active", item === button));
    render();
  });
  document.getElementById("sortSelect").addEventListener("change", event => { sort = event.target.value; render(); });
  grid.addEventListener("click", event => {
    const detail = event.target.closest("[data-details]");
    if (detail) window.PorscheApp.openDetails(detail.dataset.details);
    const favorite = event.target.closest("[data-favorite]");
    if (favorite) { window.PorscheFavorites.toggle(favorite.dataset.favorite); render(); }
  });
  grid.addEventListener("change", event => {
    const checkbox = event.target.closest("[data-compare]");
    if (checkbox) { const ok = window.PorscheComparator.toggle(checkbox.dataset.compare); if (!ok) checkbox.checked = false; render(); }
  });
  window.PorscheCatalog = { render };
  render();
})();