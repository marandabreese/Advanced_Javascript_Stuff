/*jslint browser:true */
'use strict';

var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var fObj;

//Get the Lat/Lon
let coord = new XMLHttpRequest();
let placeLat = 0;
let placeLon = 0;
let callConditions = "";
let callForecast = "";

coord.open('GET', 'http://api.openweathermap.org/geo/1.0/zip?zip=V6A,CA&appid=78ce0e825bd037dc487358c3c9214cfd', true);
coord.responseType = 'text';
coord.send();

coord.onload = function() {
    if (coord.status === 200) {
        let coordObj = JSON.parse(coord.responseText);
        placeLat = coordObj.lat;
        console.log(placeLat);
        placeLon = coordObj.lon;
        console.log(placeLon);
        callConditions = 'https://api.openweathermap.org/data/2.5/weather?lat=' + placeLat.toString() + '&lon=' + placeLon.toString() + '&appid=78ce0e825bd037dc487358c3c9214cfd&units=imperial';
        console.log(callConditions);
        callForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + placeLat.toString() + '&lon=' + placeLon.toString() + '&appid=78ce0e825bd037dc487358c3c9214cfd&units=imperial';

        // GET THE CONDITIONS
        weatherConditions.open('GET', callConditions, true);
        weatherConditions.responseType = 'text';
        weatherConditions.send(null);

        weatherConditions.onload = function() {
            if (weatherConditions.status === 200){
                let cObj = JSON.parse(weatherConditions.responseText); 
                console.log(cObj);
                document.getElementById('location').innerHTML = cObj.name;
                document.getElementById('weather').innerHTML = cObj.weather[0].description;
                document.getElementById('temperature').innerHTML = Math.floor(cObj.main.temp);
                document.getElementById('desc').innerHTML = "Wind Speed: " + cObj.wind.speed;
            } //end if
        }; //end function

        // GET THE FORECARST
        weatherForecast.open('GET', callForecast, true);
        weatherForecast.responseType = 'text'; 
        weatherForecast.send();

        weatherForecast.onload = function() {
        if (weatherForecast.status === 200){
	        fObj = JSON.parse(weatherForecast.responseText);
	        console.log(fObj);
            document.getElementById('r1c1').innerHTML = fObj.list[0].dt_txt.substring(5,11);
            document.getElementById('r1c2').src = 'http://openweathermap.org/img/w/' + fObj.list[0].weather[0].icon + '.png';
            document.getElementById('r1c3').innerHTML = Math.floor(fObj.list[0].main.temp_min) + "&deg";
            document.getElementById('r1c4').innerHTML = Math.floor(fObj.list[0].main.temp_max) + "&deg";


            document.getElementById('r2c1').innerHTML = fObj.list[8].dt_txt.substring(5,11);
            document.getElementById('r2c2').src = 'http://openweathermap.org/img/w/' + fObj.list[8].weather[0].icon + '.png';
            document.getElementById('r2c3').innerHTML = Math.floor(fObj.list[8].main.temp_min) + "&deg";
            document.getElementById('r2c4').innerHTML = Math.floor(fObj.list[8].main.temp_max) + "&deg";


            document.getElementById('r3c1').innerHTML = fObj.list[16].dt_txt.substring(5,11);
            document.getElementById('r3c2').src = 'http://openweathermap.org/img/w/' + fObj.list[16].weather[0].icon + '.png';
            document.getElementById('r3c3').innerHTML = Math.floor(fObj.list[16].main.temp_min) + "&deg";
            document.getElementById('r3c4').innerHTML = Math.floor(fObj.list[16].main.temp_max) + "&deg";
	        } //end if
        }; //end function
    }
}




