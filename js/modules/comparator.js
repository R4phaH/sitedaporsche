(() => {
  let ids = [];
  const updateCount = () => { document.getElementById("compareCount").textContent = ids.length; };
  const has = id => ids.includes(id);
  const toggle = id => {
    if (has(id)) ids = ids.filter(item => item !== id);
    else if (ids.length >= 3) { window.PorscheApp.toast("Você pode comparar até 3 modelos por vez."); return false; }
    else ids.push(id);
    updateCount(); return true;
  };
  const render = () => {
    const target = document.getElementById("compareContent");
    const cars = window.PORSCHE_CARS.filter(car => has(car.id));
    if (!cars.length) { target.innerHTML = '<p class="empty-state">Selecione até três modelos no catálogo para comparar.</p>'; return; }
    const rows = [["Modelo",car => car.name],["Motor",car => car.motor],["Potência",car => car.powerLabel],["0–100 km/h",car => car.acceleration],["Categoria",car => car.categoryLabel]];
    target.innerHTML = '<div style="overflow-x:auto"><table class="compare-table"><thead><tr><th>Especificação</th>' + cars.map(car => `<th>${car.name}</th>`).join("") + '</tr></thead><tbody>' + rows.map(([label,get]) => `<tr><th>${label}</th>${cars.map(car => `<td>${get(car)}</td>`).join("")}</tr>`).join("") + '</tbody></table></div>';
  };
  document.getElementById("openCompare").addEventListener("click", () => { render(); window.PorscheApp.showDialog("compareModal"); });
  window.PorscheComparator = { has, toggle, render };
  updateCount();
})();