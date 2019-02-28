const urlCountries = 'https://xc-ajax-demo.herokuapp.com/api/countries/';
getCountries();

function populateCountryDropdown(countriesList){
 console.log(JSON.stringify(countriesList));
        var countrySelection = document.getElementById('countries');
        for(let countryIndex = 0; countryIndex < countriesList.length; countryIndex++) {
            var countryOption = document.createElement('OPTION');
            countryOption.innerHTML =  countriesList[countryIndex].name;
            countryOption.value = countriesList[countryIndex].code;
            countrySelection.options.add(countryOption);
        }
}


function getCountries() {
    const endpoint = `${urlCountries}`;

    fetch(endpoint).then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Request Failed.');
    }, networkError => {
        console.log(networkError.message)
    }).then(function(countriesList) {
        populateCountryDropdown(countriesList);
    })
}

function getSelectedCountryCode() {
    var countriesDropdown = document.getElementById('countries');
    console.log(countriesDropdown);
    var selectedCountryValue = countriesDropdown.value;    
    return selectedCountryValue;
}

function buildStateURL() {
    return `https://xc-ajax-demo.herokuapp.com/api/countries/${getSelectedCountryCode()}/states/`;
}

function populateStateDropdown(statesList){
    console.log(JSON.stringify(statesList));
    var stateSelection = document.getElementById('states');
    stateSelection.innerHTML = '';
    alphabetizedStates = [statesList.length];
    for(let stateIndex = 0; stateIndex < statesList.length; stateIndex++){
        alphabetizedStates[stateIndex] = statesList[stateIndex].name;
        alphabetizedStates[stateIndex].value = statesList[stateIndex].code;
    }
    alphabetizedStates.sort();
    for(let stateIndex = 0; stateIndex < alphabetizedStates.length; stateIndex++) {
        var stateOption = document.createElement('OPTION');
        stateOption.innerHTML = alphabetizedStates[stateIndex];
        stateSelection.options.add(stateOption);
    }
}

function getStates() {
    fetch(buildStateURL()).then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Request Failed.');
    }, networkError => {
        console.log(networkError.message)
    }).then(function(statesList) {
        populateStateDropdown(statesList);
    })
}