let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");

let searchInputVal = "";
let countriesList = [];

function createAndAppendCountry(country) {


    let countryCardEl = document.createElement("div");
    countryCardEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");

    let countryFlagEl = document.createElement("img");
    countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryFlagEl.src = country.flag;
    countryCardEl.appendChild(countryFlagEl);

    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("d-flex", "flex-column", "ml-4");
    countryCardEl.appendChild(countryInfoEl);

    let countryNameEl = document.createElement("h1");
    countryNameEl.classList.add("country-name");
    countryNameEl.textContent = country.name;
    countryInfoEl.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.classList.add("country-population");
    countryPopulationEl.textContent = country.population;
    countryInfoEl.appendChild(countryPopulationEl);

    resultCountriesEl.appendChild(countryCardEl);
}

function displaySearchResults() {
    resultCountriesEl.textContent = "";
    for (let country of countriesList) {
        let countryName = country.name;
        // If the searchInputVal includes in the countryName, creating and appending it to the resultCountriesEl
        if (countryName.includes(searchInputVal)) {
            createAndAppendCountry(country);
        }
    }
}

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET",
    }
    spinnerEl.classList.remove("d-none");

    fetch(url, options)
        .then(function(resourse) {
            return resourse.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            countriesList = jsonData;
            displaySearchResults();
        })
}

function onChangeSearchInput(event) {
    searchInputVal = event.target.value;
    displaySearchResults();
}
getCountries();
searchInputEl.addEventListener("click", onChangeSearchInput);