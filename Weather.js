import axios from 'axios';

window.addEventListener('load', () => {
    var longitude;
    var latitude;
    var tempratureDescription = document.querySelector('.temperature-description');
    var tempratureDegree = document.querySelector('.temperature-degree');
    var locationTimezone = document.querySelector('.location-timezone');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const darkSky = `https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a6a56da06c4a778a16e072cafcec86ff/${latitude},${longitude}`;

            axios;
            fetch(darkSky)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const { temperature, summary } = data.curently;

                    // Set DOM Elemnts from the API
                    tempratureDegree.textContent = temperature;
                    tempratureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                });
        });
    }
});