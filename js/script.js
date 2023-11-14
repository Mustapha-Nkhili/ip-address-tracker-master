const map = L.map("map").setView([37.40599, -122.078514], 13);

const ipAdressInput = document.querySelector("#IPAddressInput");
const submitBtn = document.querySelector(".input-field button");
const ipAddressContainer = document.querySelector(".IP-ddress p");
const locationContainer = document.querySelector(".Location p");
const timezoneConatainer = document.querySelector(".Timezone p");
const ISPContainer = document.querySelector(".ISP p");
const errorContainer = document.querySelector("#error");

const myIcon = L.icon({
    iconUrl: "../images/icon-location.svg",
    iconSize: [38, 50],
    iconAnchor: [22, 54],
    popupAnchor: [-3, -36],
  });

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
  boxZoom: true,
  doubleClickZoom: true,
}).addTo(map);
L.marker([37.40599, -122.078514], { icon: myIcon }).addTo(map);

submitBtn.addEventListener("click", fetchIPDataAndUpdateMap);

function errorStyles() {
  ipAdressInput.style.cssText = "border: 1px solid red";
  submitBtn.style.cssText = "border: 1px solid red";
}

function fetchIPDataAndUpdateMap() {
  const ipAddressValue = ipAdressInput.value;
  if (ipAddressValue.trim() !== "") {
    fetch(
      `https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ipAddressValue.trim()}`
    )
      .then((res) => res.json())
      .then((res) => {
        const { lat, lng } = res.location;
        const center = [lat, lng];

        // Update the Leaflet map center
        map.setView(center, 13);
        L.marker(center, { icon: myIcon }).addTo(map);

        ipAddressContainer.innerHTML = res.ip;
        locationContainer.innerHTML = `${res.location.region}, ${res.location.country}`;
        timezoneConatainer.innerHTML = `UTC ${res.location.timezone}`;
        ISPContainer.innerHTML = res.isp;
        errorContainer.innerHTML = "";
        ipAdressInput.style.cssText = "border: none";
        submitBtn.style.cssText = "border: none";
      })
      .catch(() => {
        errorContainer.innerHTML = "Make sure you enter a valid IP address";
        errorStyles();
      });
  } else {
    errorContainer.innerHTML = "Enter an ip address";
    errorStyles();
  }
}
