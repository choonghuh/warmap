const mymap = L.map("mymap", { center: [32.8802, 13.19], zoom: 3 });
const OpenStreetMap_Mapnik = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
).addTo(mymap);

const cityLatLons = {
    tripoli: [32.8802, 13.19],
    sanaa: [15.369445, 44.191006],
    srinaga: [34.0837, 74.7974],
};

const iconSize = [30, 30];
const warIcons = [
    L.icon({
        iconUrl: "icons/warimg1.png",
        iconSize: iconSize,
    }),
    L.icon({
        iconUrl: "icons/warimg2.png",
        iconSize: iconSize,
    }),
    L.icon({
        iconUrl: "icons/warimg3.png",
        iconSize: iconSize,
    }),
];

const conflicts = {
    kashmir: {
        parties: [
            {
                name: "India",
                fromLatLon: [20.5937, 78.9629],
            },
            {
                name: "Pakistan",
                fromLatLon: [30, 70],
            },
        ],
    },
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const tripoliMarker = L.marker(cityLatLons["tripoli"], {
    icon: warIcons[getRandomInt(warIcons.length)],
}).addTo(mymap);

tripoliMarker.bindPopup("Tripoli, Libya");

const sanaaMarker = L.marker(cityLatLons["sanaa"], {
    icon: warIcons[getRandomInt(warIcons.length)],
}).addTo(mymap);

sanaaMarker.bindPopup("Sana'a, Yemen");

const srinagarMarker = L.marker(cityLatLons["srinaga"], {
    icon: warIcons[getRandomInt(warIcons.length)],
}).addTo(mymap);

srinagarMarker.bindPopup("Srinagar, India (Kashmir)");

const testLine = L.polyline([
    cityLatLons["srinaga"],
    conflicts.kashmir.parties[0].fromLatLon,
]).addTo(mymap);

const testLine2 = L.polyline([
    cityLatLons["srinaga"],
    conflicts.kashmir.parties[1].fromLatLon,
]).addTo(mymap);
