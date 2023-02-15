const dados = await fetch('./dados.json').then(r => r.json());


let popupContent;

const map = L.map('map', {
    center: [-20, -40],
    zoom: 7,
    minZoom: 7,
    maxZoom: 10,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
}).addTo(map);

let allMarkers = [];
for (let i = 0; i < dados.length; i++) {
    popupContent = /*html*/`<p>${dados[i].cidade.nome}</p>`;

    let marker = L.marker([dados[i].cidade.lat, dados[i].cidade.lon]).bindPopup(popupContent).addTo(map);
    allMarkers.push(marker)
}

const main = document.querySelector('main'),
    infoSection = document.querySelector('.info');

infoSection.addEventListener('scroll', () => {
    if (infoSection.scrollTop !== 0) {
        main.classList.add('scrolldown')
    } else {
        main.classList.remove('scrolldown')
    }
})

map.on('click', () => {
    main.classList.remove('scrolldown')
})
