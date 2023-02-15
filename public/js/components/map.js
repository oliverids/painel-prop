const dados = await fetch('./dados.json').then(r => r.json());


let popupContent;

const map = L.map('map', {
    center: [-20, -40.5],
    zoom: 7,
    minZoom: 7,
    maxZoom: 10,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
}).addTo(map);

const main = document.querySelector('main'),
    infoSection = document.querySelector('.info');

infoSection.addEventListener('scroll', () => {
    // if (infoSection.scrollTop !== 0) {
        main.classList.add('scrolldown')
    // } 
    // else if(infoSection.clientHeight < infoSection.scrollHeight || infoSection.clientHeight == infoSection.scrollHeight) {
    //     main.classList.add('scrolldown')

    // }
    
    // else {
    //     main.classList.remove('scrolldown')
    // }
})

map.on('click', () => {
    main.classList.remove('scrolldown')
})

let allMarkers = [];
for (let i = 0; i < dados.length; i++) {
    popupContent = /*html*/`<p>${dados[i].cidade.nome}</p>`;

    let marker = L.marker([dados[i].cidade.lat, dados[i].cidade.lon]).bindPopup(popupContent).addTo(map);
    allMarkers.push(marker)
}

//cities

const visibleList = document.getElementById('visibleList');
function pullMapCities() {
    let bounds = map.getBounds();
    visibleList.innerHTML = '';

    let visibleMarkers = [];

    allMarkers.forEach(each => {
        let isInBounds = bounds.contains(each._latlng)

        if (isInBounds) {
            let visibleCity = document.createElement('li');
            visibleMarkers.push(each);

            let itemVisivel = dados.find(item =>
                item.cidade.lat === each._latlng.lat &&
                item.cidade.lon === each._latlng.lng);

            visibleCity.innerHTML = /*html*/`
                <div></div>
                <a>${itemVisivel.cidade.nome}</a>
            `;

            visibleList.appendChild(visibleCity);
        }
    })

    if (!visibleMarkers.length) {
        for (let i = 0; i < dados.length; i++) {
            let visibleCity = document.createElement('li');

            visibleCity.innerHTML = /*html*/`
                <div></div>
                <a>${dados[i].cidade.nome}</a>
            `;

            visibleList.appendChild(visibleCity);
        }
    }
}

pullMapCities()

map.on('moveend', function (e) {
    pullMapCities();
});