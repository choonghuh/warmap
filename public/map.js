const mymap = L.map("mymap", { center: [32.8802, 13.19], zoom: 3 });
const OpenStreetMap_Mapnik = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        noWrap: true,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
).addTo(mymap);

mymap.setMaxBounds([
    [-90, -180],
    [90, 180],
]);
mymap.setMinZoom(3);
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
    libya: {
        location: cityLatLons.tripoli,
        parties: [
            [
                {
                    name: "United Nations (HQ in New York, USA)",
                    code: "UN",
                    fromLatLon: [40.7489, -73.968],
                },
                { name: "Italy", code: "IT", fromLatLon: [41.8719, 12.5674] },
                { name: "Qatar", code: "QA", fromLatLon: [25.3548, 51.1839] },
                { name: "Turkey", code: "TR", fromLatLon: [38.9637, 35.2433] },
                { name: "Libya", code: "LY", fromLatLon: cityLatLons.tripoli },
            ],
            [
                {
                    name: "Saudi Arabia",
                    code: "SA",
                    fromLatLon: [23.8859, 45.0792],
                },
                { name: "Egypt", code: "EG", fromLatLon: [26.8206, 30.8025] },
                { name: "Russia", code: "RU", fromLatLon: [61.524, 105.3188] },
                { name: "France", code: "FR", fromLatLon: [46.2276, 2.2137] },
                { name: "UAE", code: "AE", fromLatLon: [23.4241, 53.8478] },
                {
                    name: "Haftar-led Libyan National Army",
                    code: null,
                    fromLatLon: [32.0682, 23.9418], // Tobruk, Libya
                },
            ],
        ],
        summary: "Civil war in Libya",
    },
    kashmir: {
        location: cityLatLons.srinaga,
        parties: [
            [{ name: "India", code: "IN", fromLatLon: [20.5937, 78.9629] }],
            [{ name: "Pakistan", code: "PK", fromLatLon: [30, 70] }],
        ],
        summary: "Land dispute between India and Pakistan in Kashmir region",
    },
    yemen: {
        location: cityLatLons.sanaa,
        parties: [
            [
                {
                    name: "Saudi Arabia",
                    code: "SA",
                    fromLatLon: [23.8859, 45.0792],
                },
            ],
            [
                { name: "Iran", code: "IR", fromLatLon: [32.4279, 53.688] },
                {
                    name: "Houthi Rebels",
                    code: null,
                    fromLatLon: cityLatLons.sanaa,
                },
            ],
        ],
        summary: "Civil war in Yemen",
    },
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// hold temp elements to be deleted
var tempElements = [];
function drawGeo(countries, geoColor) {
    countries.forEach((country) => {
        if (worldGeoJSON[country.code]) {
            const tempGeo = L.geoJson(worldGeoJSON[country.code], {
                color: geoColor,
            }).addTo(mymap);
            tempGeo.bindPopup(country.name);
            tempElements.push(tempGeo);
        }
    });
}

function drawLine(location, countries, geoColor) {
    countries.forEach((country) => {
        const testLine = L.polyline([location, country.fromLatLon], {
            color: geoColor,
        }).addTo(mymap);
        tempElements.push(testLine);

        if (!worldGeoJSON[country.code]) {
            console.log("getzoom " + mymap.getZoom());
            const tempCircle = L.circle(country.fromLatLon, {
                color: geoColor,
                radius: 100000,
            }).addTo(mymap);
            tempCircle.bindPopup(country.name);
            tempElements.push(tempCircle);
        }
    });
}

function drawWar(war) {
    tempElements.forEach((e) => {
        mymap.removeLayer(e);
    });
    tempElements = [];

    drawGeo(war.parties[0], "red");
    drawGeo(war.parties[1], "green");
    drawLine(war.location, war.parties[0], "red");
    drawLine(war.location, war.parties[1], "green");
    document.getElementById("infoPanel").style.visibility = "visible";
    document.getElementById("infoContent").textContent = war.summary;
}

document.getElementById("infoPanelClose").onclick = () => {
    document.getElementById("infoPanel").style.visibility = "hidden";
};

const tripoliMarker = L.marker(cityLatLons["tripoli"], {
    icon: warIcons[getRandomInt(warIcons.length)],
}).addTo(mymap);

tripoliMarker.bindPopup("Libyan Civil War");
tripoliMarker.on({
    click: () => {
        mymap.setView(cityLatLons["tripoli"], 4);
        drawWar(conflicts.libya);
    },
});

const sanaaMarker = L.marker(cityLatLons["sanaa"], {
    icon: warIcons[getRandomInt(warIcons.length)],
}).addTo(mymap);

sanaaMarker.bindPopup("Yemen Civil War");
sanaaMarker.on({
    click: () => {
        mymap.setView(cityLatLons["sanaa"], 4);
        drawWar(conflicts.yemen);
    },
});

const srinagarMarker = L.marker(cityLatLons["srinaga"], {
    icon: warIcons[getRandomInt(warIcons.length)],
}).addTo(mymap);

srinagarMarker.bindPopup("Conflicts in Kashmir");
srinagarMarker.on({
    click: () => {
        mymap.setView(cityLatLons["srinaga"], 4);
        drawWar(conflicts.kashmir);
    },
});
