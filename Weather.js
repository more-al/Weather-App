let longitude;
let latitude;
let tempratureDescription = document.querySelector('.temperature-description');
let tempratureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');

function setIcons(icon, iconID){
    const skycons = new Skycons({ 'color': 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();

    skycons.play();

    return skycons.set(iconID, Skycons[currentIcon]);
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const cityName = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cccebd7bb94a46b8a94f1804d990dce5`;


        const darkSky = `${proxy}https://api.darksky.net/forecast/0352f8310ea90b32364e0064ecc11103/${latitude},${longitude}`;
        const temperatureSection = document.querySelector('.temperature-section');
        const temperatureSpan = document.querySelector('.temperature-section p');
        const hourlytemp = document.querySelector('.hourly-temp');
        const hourlytime = document.querySelector('.hourly-time');


        fetch(darkSky)
            .then((response) => response.json())
            .then((weather) => {
                console.log(weather);
                const { temperature, summary, icon } = weather.currently;

                // Set DOM Elemnts from the API
                tempratureDegree.textContent = Math.floor(temperature);
                tempratureDescription.textContent = summary;

                for(const daily of weather.hourly.data){
                    const timeString = moment.unix(daily.time).format('LT');
                    
                    console.log(daily);
                    hourlytemp.innerHTML += `<div class='daily'> <p><h3>${timeString}</h3><h1>${Math.floor(daily.temperature)}</h1></p> </div>`;
                }

                // Get Celsius
                const celsius = (temperature - 32) * (5 / 9);

                // Set Icon from Skycons
                setIcons(icon, document.querySelector('.icon'));

                fetch(cityName)
                    .then((data2) => data2.json())
                    .then((data3) => {
                        console.log('hello');
                        console.log(data3);

                        locationTimezone.textContent = data3.name;
                    });


                // Change temperature back and forth from Farenheit/Celsius
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        tempratureDegree.textContent = Math.floor(celsius);
                    }
                    else{
                        temperatureSpan.textContent = 'F';
                        tempratureDegree.textContent = Math.floor(temperature);
                    }
                });
            });
    });
}


