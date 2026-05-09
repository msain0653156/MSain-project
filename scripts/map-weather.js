// Coordinates
var lat = 34.0522;
var lon = -118.2437;

// Initialize Map
var map = L.map('map').setView([lat, lon], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Marker
var marker = L.marker([lat, lon]).addTo(map);
marker.bindPopup("<b>Neon Nexus Retreat</b><br>Los Angeles, CA<br>Loading weather...").openPopup();

// weather call
fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto")
  .then(function(res) { return res.json(); })
  .then(function(data) {
    var current = data.current;
    var temp = Math.round(current.temperature_2m);
    var desc = getWeatherDesc(current.weather_code);
    
    // marker popup
    marker.setPopupContent("<b>Neon Nexus Retreat</b><br>Los Angeles, CA<br>" + temp + "°F - " + desc);
  })
  .catch(function(err) {
    marker.setPopupContent("<b>Neon Nexus Retreat</b><br>Los Angeles, CA<br>Weather unavailable");
  });

// Weather code descriptions
function getWeatherDesc(code) {
  var codes = {
    0: "Clear", 1: "Mostly Clear", 2: "Partly Cloudy", 3: "Overcast",
    45: "Foggy", 48: "Foggy", 51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
    61: "Rain", 63: "Rain", 65: "Heavy Rain", 71: "Snow", 73: "Snow", 75: "Heavy Snow",
    80: "Rain Showers", 81: "Rain Showers", 82: "Heavy Showers",
    85: "Snow Showers", 86: "Heavy Snow", 95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm"
  };
  return codes[code] || "Unknown";
}
