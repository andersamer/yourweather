class Weather {

    #API_KEY = "" // Our API key

    constructor(onload) {        // 'onload is a function to be run when the data is retrieved.
        this.updateData(onload); // Get the data!
    }   

    wipeData() {
        // Set all data values to null
        this.lat, this.long, this.city, this.state, this.country, this.data = null;
    }

    updateData(onload) {

        // Initially set all instance variables to null. If the API calls/location data doesn't work, we'll know because it will be null.        
        this.wipeData()

        // Use the browswer location data to get latitude and longitude.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                
                this.lat = pos.coords.latitude;
                this.long = pos.coords.longitude;

                // Use the reverse geocoding to get city, state, and country associated with the latitude and longitude we got.
                fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${this.lat}&lon=${this.long}&appid=${this.#API_KEY}`)
                .then((result) => result.json()).then((d) => {
                    
                    console.log('Reverse Geocoding results: \n' + d[0].name + '\n' + d[0].state + '\n' + d[0].country);
                    this.city = d[0].name;
                    this.state = d[0].state;
                    this.country = d[0].country;

                    // Retrieve weather data
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&appid=${this.#API_KEY}`)
                    .then((result) => result.json()).then((d) => {
 
                        console.log("Weather Data results:")
                        console.log(d);
                        this.data = d;

                        onload(); // Handle the data!!!

                    });

                });              
                    
            });
        } else {
            console.log("Failed to access location data.")
        }

    }
    
}
