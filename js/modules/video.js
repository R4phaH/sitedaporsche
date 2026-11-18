(() => {
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-play-video]");
    if (!button) return;
    const car = window.PORSCHE_CARS.find(item => item.id === button.dataset.playVideo);
    if (!car) return;
    const old = document.querySelector(".video-frame"); if (old) old.remove();
    const frame = document.createElement("iframe");
    frame.className = "video-frame"; frame.title = "Vídeo de performance — " + car.name;
    frame.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(car.youtube) + "?autoplay=1&rel=0";
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    button.after(frame);
    button.textContent = "Vídeo carregado";
    button.disabled = true;
  });
})();