let longitude;
let latitude;
let tempratureDescription = document.querySelector('.temperature-description');
let tempratureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const darkSky = `${proxy}https://api.darksky.net/forecast/0352f8310ea90b32364e0064ecc11103/${latitude},${longitude}`;
        const temperatureSection = document.querySelector('.temperature');
        const temperatureSpan = document.querySelector('.temperature span');


        fetch(darkSky)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                // Set DOM Elemnts from the API

                tempratureDegree.textContent = temperature;
                tempratureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // Set Icon from Skycons
                setIcons(icon, document.querySelector('.icon'));

                // Change temperature to Farenheit/Celsius
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                    }
                    else{
                        temperatureSpan.textContent = 'F';
                    }
                });
            });
    });
}
function setIcons(icon, iconID){
    const skycons = new Skycons({ 'color': 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();

    skycons.play();

    return skycons.set(iconID, Skycons[currentIcon]);
}
