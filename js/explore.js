const grid = document.getElementById("destination-grid");

function showDestinations(list) {
  grid.innerHTML = "";

  list.forEach(function (place) {
    const tile = document.createElement("a");
    tile.className = "tile";
    tile.href = "destination.html?id=" + place.id;
    tile.style.backgroundImage = 'url("../images/' + place.image + '")';

    tile.innerHTML =
      '<div class="tile-text">' +
      "<h3>" + place.name + "</h3>" +
      "<p>" + place.region + " | " + place.category + "</p>" +
      "</div>";

    grid.appendChild(tile);
  });
}

showDestinations(destinations);