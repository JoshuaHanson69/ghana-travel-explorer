const grid = document.getElementById("destination-grid");
const searchBox = document.getElementById("search");

function showDestinations(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = '<p class="no-results">No places found. Try another search.</p>';
    return;
  }

  list.forEach(function (place) {
    const tile = document.createElement("a");
    tile.className = "tile";
    tile.style.backgroundImage = 'url("../images/' + place.image + '")';

    tile.innerHTML =
      '<div class="tile-text">' +
      "<h3>" + place.name + "</h3>" +
      "<p>" + place.region + " | " + place.category + "</p>" +
      "</div>";

    grid.appendChild(tile);
  });
}

searchBox.addEventListener("input", function () {
  const text = searchBox.value.toLowerCase();

  const results = destinations.filter(function (place) {
    return (
      place.name.toLowerCase().includes(text) ||
      place.region.toLowerCase().includes(text) ||
      place.category.toLowerCase().includes(text)
    );
  });

  showDestinations(results);
});

showDestinations(destinations);