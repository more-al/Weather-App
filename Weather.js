window.addEventListener('load', () => {
    var longitude;
    var latitude;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            
            const darkSky = `${proxy}https://api.darksky.net/forecast/3315f1f22d1166c49217856a2a560482/${latitude},${longitude}`;

            fetch(darkSky)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        });
    }
});