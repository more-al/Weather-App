import axios from 'axios';
import { get } from 'https';

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

            const darkSky = `https://api.darksky.net/forecast/3315f1f22d1166c49217856a2a560482/${latitude},${longitude}`;

            axios
                .get(darkSky)
                .then((response) => response.json())
                .then((data) => {
                    const { temperature, summary } = data.currently;
                    // Set DOM Elemnts from the API

                    tempratureDegree.textContent = temperature;
                });
        });
    }
});