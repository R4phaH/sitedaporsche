const cars = [
    {
        name: "911 GT3 RS",
        motor: "4.0L Boxer 6",
        power: "525 CV",
        speed: "3.2s",
        img: "assets/gt3.jpn.jpeg",
        youtube: "2RS07NJ6boQ"
    },
    {
        name: "918 Spyder",
        motor: "V8 Híbrido",
        power: "887 CV",
        speed: "2.5s",
        img: "assets/spyder.jpn.jpeg",
        youtube: "N_znJtmBWPE"
    },
    {
        name: "911 RSR",
        motor: "4.2L Boxer",
        power: "515 CV",
        speed: "Performance Track",
        img: "assets/rsr.jpn.jpeg",
        youtube: "Zey78q0fbmM"
    }
];

const app = document.getElementById('app');

// Renderiza os cards automaticamente
cars.forEach(car => {
    app.innerHTML += `
        <section class="model-card">
            <div class="media-box">
                <img src="${car.img}" alt="${car.name}">
                <iframe src="https://www.youtube.com/embed/${car.youtube}?enablejsapi=1&mute=1" frameborder="0"></iframe>
            </div>
            <div class="info-box">
                <h2>${car.name}</h2>
                <div class="specs-grid">
                    <div class="spec-item"><span>Motor</span><p>${car.motor}</p></div>
                    <div class="spec-item"><span>Potência</span><p>${car.power}</p></div>
                    <div class="spec-item"><span>0-100 km/h</span><p>${car.speed}</p></div>
                </div>
                <button class="btn-play">Ver Performance</button>
            </div>
        </section>
    `;
});

// Lógica de Play/Pause simplificada
document.querySelectorAll('.btn-play').forEach((btn, index) => {
    btn.addEventListener('click', function() {
        const card = this.closest('.model-card');
        const iframe = card.querySelector('iframe');
        
        if (!card.classList.contains('video-active')) {
            card.classList.add('video-active');
            this.innerText = "Fechar Vídeo";
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        } else {
            card.classList.remove('video-active');
            this.innerText = "Ver Performance";
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.style.background = window.scrollY > 100 ? 'rgba(0,0,0,0.9)' : 'transparent';
});