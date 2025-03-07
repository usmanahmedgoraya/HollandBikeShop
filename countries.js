document.addEventListener("DOMContentLoaded", function () {
    const countryListContainer = document.getElementById("countryListContainer");
    const searchCountryInput = document.getElementById("searchCountry");
    const restCountriesApiUrl = "https://restcountries.com/v3.1/all";

    let allCountries = []; 

    async function fetchCountries() {
        try {
            const response = await fetch(restCountriesApiUrl);
            const data = await response.json();

            // **Filter for European countries only**
            allCountries = data.filter(country => country.region === "Europe");

            const countriesByContinent = groupCountriesByContinent(allCountries);
            generateCountryList(countriesByContinent);
        } catch (error) {
            console.error("Error fetching countries:", error);
            countryListContainer.textContent = "Failed to load countries.";
        }
    }

    function groupCountriesByContinent(countries) {
        const groupedCountries = {};
        countries.forEach(country => {
            const continent = country.region || "Unknown Continent"; // Europe in this case

            if (!groupedCountries[continent]) {
                groupedCountries[continent] = [];
            }
            groupedCountries[continent].push(country);
        });
        return groupedCountries;
    }

    function generateCountryList(countriesData) {
        countryListContainer.innerHTML = ""; // Clear previous list

        for (const continent in countriesData) {
            if (countriesData.hasOwnProperty(continent)) {
                const countries = countriesData[continent];

                // Create continent group
                const countryGroup = document.createElement("div");
                countryGroup.classList.add("country-group");

                // Add continent heading
                const continentHeading = document.createElement("h3");
                continentHeading.textContent = continent; // Should only be "Europe"
                countryGroup.appendChild(continentHeading);

                // Create options grid
                const optionsGrid = document.createElement("div");
                optionsGrid.classList.add("options-grid");

                // Create country buttons
                countries.forEach(country => {
                    const countryButton = document.createElement("button");
                    countryButton.classList.add("option-btn");
                    countryButton.dataset.country = country.cca2; // Use country code (alpha2)

                    const flagSpan = document.createElement("span");
                    flagSpan.classList.add("fi", `fi-${country.cca2.toLowerCase()}`);
                    countryButton.appendChild(flagSpan);

                    const textSpan = document.createElement("span");
                    textSpan.classList.add("option-text");
                    textSpan.textContent = country.name.common;
                    countryButton.appendChild(textSpan);

                    optionsGrid.appendChild(countryButton);
                });

                countryGroup.appendChild(optionsGrid);
                countryListContainer.appendChild(countryGroup);
            }
        }
    }

    function filterCountries(searchTerm) {
        const filteredCountries = allCountries.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return groupCountriesByContinent(filteredCountries); // Group the filtered countries
    }

    // Search functionality
    searchCountryInput.addEventListener("input", function () {
        const searchTerm = this.value.trim();
        const filteredCountries = filterCountries(searchTerm);
        generateCountryList(filteredCountries);
    });

    // Event delegation for country button clicks
    countryListContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("option-btn")) {
            const countryCode = event.target.dataset.country;
            console.log("Selected country:", countryCode);
            // Add your logic here to handle the selected country
        }
    });

    // Fetch countries on page load
    fetchCountries();
});
