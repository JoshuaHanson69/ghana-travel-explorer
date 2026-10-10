const placeOptions = document.getElementById("place-options");
const form = document.getElementById("trip-form");
const message = document.getElementById("form-message");
const tripList = document.getElementById("trip-list");

function loadTrips() {
  return JSON.parse(localStorage.getItem("trips")) || [];
}

function saveTrips(trips) {
  localStorage.setItem("trips", JSON.stringify(trips));
}

function formatDate(dateText) {
  return new Date(dateText + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

// 1. Fill "Places to visit" from the destinations list
destinations.forEach(function (place) {
  const label = document.createElement("label");
  label.innerHTML = '<input type="checkbox" value="' + place.id + '"> ' + place.name;
  placeOptions.appendChild(label);
});

// 2. Show saved trips
function showTrips() {
  const trips = loadTrips();
  tripList.innerHTML = "";

  if (trips.length === 0) {
    tripList.innerHTML = '<p class="empty">No trips yet. Create your first one above.</p>';
    return;
  }

  trips.forEach(function (trip, index) {
    const placeNames = trip.places.map(function (id) {
      return destinations.find(function (p) { return p.id === id; }).name;
    });

    const perPersonPerDay = Math.round(trip.budget / trip.travellers / trip.days);

    const item = document.createElement("div");
    item.className = "trip";

    const title = document.createElement("h3");
    title.textContent = trip.name;
    item.appendChild(title);

    const info = document.createElement("p");
    info.className = "trip-info";
    info.innerHTML =
      formatDate(trip.start) + " to " + formatDate(trip.end) +
      " (" + trip.days + " days) | " +
      trip.travellers + " traveller(s)<br>" +
      "Budget: GHS " + trip.budget + " (about GHS " + perPersonPerDay + " per person per day)";
    item.appendChild(info);

    const places = document.createElement("p");
    places.className = "trip-places";
    places.textContent = "Places: " + placeNames.join(", ");
    item.appendChild(places);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Delete trip";
    deleteBtn.addEventListener("click", function () {
      const all = loadTrips();
      all.splice(index, 1);
      saveTrips(all);
      showTrips();
    });
    item.appendChild(deleteBtn);

    tripList.appendChild(item);
  });
}

// 3. Create a trip when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();
  message.style.color = "";

  const name = document.getElementById("trip-name").value.trim();
  const start = document.getElementById("start-date").value;
  const end = document.getElementById("end-date").value;
  const travellers = Number(document.getElementById("travellers").value);
  const budget = Number(document.getElementById("budget").value);

  const checked = placeOptions.querySelectorAll("input:checked");
  const places = Array.from(checked).map(function (box) {
    return Number(box.value);
  });

  // Validation
  if (name === "") {
    message.textContent = "Please give your trip a name.";
    return;
  }
  if (start === "" || end === "") {
    message.textContent = "Please choose a start and end date.";
    return;
  }
  if (end < start) {
    message.textContent = "The end date cannot be before the start date.";
    return;
  }
  if (travellers < 1) {
    message.textContent = "You need at least 1 traveller.";
    return;
  }
  if (budget <= 0) {
    message.textContent = "Please enter a budget above 0.";
    return;
  }
  if (places.length === 0) {
    message.textContent = "Please pick at least one place to visit.";
    return;
  }

  // Work out the number of days (counting both the first and last day)
  const days = (new Date(end) - new Date(start)) / 86400000 + 1;

  const trips = loadTrips();
  trips.push({
    name: name,
    start: start,
    end: end,
    days: days,
    travellers: travellers,
    budget: budget,
    places: places
  });
  saveTrips(trips);

  form.reset();
  message.style.color = "#2e7d32";
  message.textContent = "Trip created!";
  showTrips();
});

showTrips();