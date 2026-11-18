(() => {
  const KEY = "porsche-experience-favorites";
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]").filter(id => window.PORSCHE_CARS.some(car => car.id === id)); } catch { return []; } };
  let ids = read();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch {} updateCount(); };
  const updateCount = () => { document.getElementById("favoriteCount").textContent = ids.length; };
  const has = id => ids.includes(id);
  const toggle = id => { ids = has(id) ? ids.filter(item => item !== id) : [...ids,id]; save(); window.PorscheApp.toast(has(id) ? "Adicionado à sua garagem." : "Removido dos favoritos."); };
  const render = () => {
    const target = document.getElementById("favoritesContent");
    const cars = window.PORSCHE_CARS.filter(car => has(car.id));
    target.innerHTML = cars.length ? '<div class="utility-list">' + cars.map(car => `<div class="utility-item"><img src="${car.img}" alt=""><div><strong>${car.name}</strong><small>${car.powerLabel}</small></div><button data-remove-favorite="${car.id}">Remover</button></div>`).join("") + '</div>' : '<p class="empty-state">Sua garagem ainda está vazia. Favorite um modelo para guardá-lo aqui.</p>';
  };
  document.getElementById("favoritesContent").addEventListener("click", event => {
    const button = event.target.closest("[data-remove-favorite]"); if (!button) return;
    toggle(button.dataset.removeFavorite); render(); window.PorscheCatalog.render();
  });
  document.getElementById("openFavorites").addEventListener("click", () => { render(); window.PorscheApp.showDialog("favoritesModal"); });
  window.PorscheFavorites = { has, toggle, render, updateCount };
  updateCount();
})();