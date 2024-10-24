let Main;
let WeatherData;

window.onload = (event) => {
    /* Instantiate the main weather object and pass in the
       'main' function to be run once the data is retrieved. */
    Main = new Weather(main);
}

function main() {
    /* Store the data part of the weather object in a variable 
       for easy access */
    WeatherData = Main.data; 

    // Update all of the weather information
    updateValue('temperature', farenheit(WeatherData.main.temp));
    updateValue('location', `${Main.city}, ${Main.state}`);
    updateValue('feels-like', farenheit(WeatherData.main.feels_like));
    updateValue('low', farenheit(WeatherData.main.temp_min));
    updateValue('high', farenheit(WeatherData.main.temp_max));
    updateValue('humidity', WeatherData.main.humidity);
    
    // The weather conditions come in lowercase, so we have to iterate through each word with a for loop to capitalize them
    let conditions = WeatherData.weather[0].description.split(" "); // Split each word into an array
    for (let i = 0; i < conditions.length; i++) {                                 
        conditions[i] = conditions[i][0].toUpperCase() + conditions[i].substr(1); // Capitalize the first character of each string in the array
    }
    conditions = conditions.join(" "); // Convert the array of strings into one string
    updateValue('conditions', conditions);

}

// Update the text of an element in the DOM with ID 'id'
function updateValue(id, val) { 
    var el = document.getElementById(id); // Retrieve the element from the DOM
    el.innerText = `${val}`;             // and change its text to the new 
}

function farenheit(kelvin) {
    /* Convert Kelvin to Farenheit using the formula
       (K − 273.15) × 1.8 + 32 = °F */
    return `${String(Math.round((kelvin - 273.15) * 1.8 + 32))}°`;
}