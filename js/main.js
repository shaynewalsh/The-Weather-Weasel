$('button').click(function(){
  $('.cover').addClass('open');
})

/* -------------------------------------------------------
   Function for getting weather information
   ------------------------------------------------------- */

function weatherBalloon() {
  var key = '6e0ad49d42ba4a81cef4d75af9a88872';
  var lat = '40.240880';
  var lon = '-109.010920';
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    drawWeather(data);
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}


/* -------------------------------------------------------
   Function for display weather information
   ------------------------------------------------------- */

function drawWeather( d ) {

  // placeholder div for testing output
  $('.today .weasel-description .description').html(printGraphic(d.current.weather[0].description));
  $('.today .temps .low').html(convertTemp(d.daily[0].temp.min)+ '˚f');
  $('.today .temps .current').html(convertTemp(d.current.temp)+ '˚f');
  $('.today .temps .high').html(convertTemp(d.daily[0].temp.max)+ '˚f');



  $('.week .one .day').html(displayDay(1));
  $('.week .one .high').html(convertTemp(d.daily[1].temp.max)+ '˚f');
  $('.week .one .low').html(convertTemp(d.daily[1].temp.min)+ '˚f');
  $('.week .one .icon').html(printGraphic(d.daily[1].weather[0].description));

  $('.week .two .day').html(displayDay(2));
  $('.week .two .high').html(convertTemp(d.daily[2].temp.max)+ '˚f');
  $('.week .two .low').html(convertTemp(d.daily[2].temp.min)+ '˚f');
  $('.week .two .icon').html(printGraphic(d.daily[2].weather[0].description));

  $('.week .three .day').html(displayDay(3));
  $('.week .three .high').html(convertTemp(d.daily[3].temp.max)+ '˚f');
  $('.week .three .low').html(convertTemp(d.daily[3].temp.min)+ '˚f');
  $('.week .three .icon').html(printGraphic(d.daily[3].weather[0].description));

  $('.week .four .day').html(displayDay(4));
  $('.week .four .high').html(convertTemp(d.daily[4].temp.max)+ '˚f');
  $('.week .four .low').html(convertTemp(d.daily[4].temp.min)+ '˚f');
  $('.week .four .icon').html(printGraphic(d.daily[4].weather[0].description));

  $('.week .five .day').html(displayDay(5));
  $('.week .five .high').html(convertTemp(d.daily[5].temp.max)+ '˚f');
  $('.week .five .low').html(convertTemp(d.daily[5].temp.min)+ '˚f');
  $('.week .five .icon').html(printGraphic(d.daily[5].weather[0].description));

  $('.week .six .day').html(displayDay(6));
  $('.week .six .high').html(convertTemp(d.daily[6].temp.max)+ '˚f');
  $('.week .six .low').html(convertTemp(d.daily[6].temp.min)+ '˚f');
  $('.week .six .icon').html(printGraphic(d.daily[6].weather[0].description));

}


/* -------------------------------------------------------
   Function for printing weather-specific class on body
   ------------------------------------------------------- */

function changeTheme(d){
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    $('body').addClass('rainy');
  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    $('body').addClass('cloudy');
  // if the description includes the word "sunny"
  } else if( d.indexOf('sunny') > 0 ) {
    $('body').addClass('sunny');
  // if none of those cases are true, assume it's clear
  } else {
    $('body').addClass('clear');
  }
}


/* -----------------------------------------------
   Function for printing weather-specific graphic
   ----------------------------------------------- */

function printGraphic(d){
  if( d.indexOf('rain') > 0 ) {
    return '<img src="img/description-images/rainy.png" alt="IT\'S RAINY!">';
  } else if( d.indexOf('cloud') > 0 ) {
    return '<img src="img/description-images/cloudy.png" alt="IT\'S CLOUDY!">';
  } else if( d.indexOf('sunny') > 0 ) {
    return '<img src="img/description-images/sunny.png" alt="IT\'S SUNNY!">';
  } else if( d.indexOf('fog') > 0 ) {
      return '<img src="img/description-images/foggy.png" alt="IT\'S FOGGY!">';
  } else if( d.indexOf('snow') > 0 ) {
      return '<img src="img/description-images/snowy.png" alt="IT\'S SNOWY!">';
  } else if( d.indexOf('haze') > 0 ) {
      return '<img src="img/description-images/hazy.png" alt="IT\'S HAZY!">';
  } else if( d.indexOf('wind') > 0 ) {
      return '<img src="img/description-images/windy.png" alt="IT\'S WINDY!">';
  } else {
    return '<img src="img/description-images/clear.png" alt="IT\'S CLEAR!">';
  }
}


/* -----------------------------------------------
   Function for converting time to hours/minutes
   DO NOT EDIT
   ----------------------------------------------- */

function convertTime(t){

  var unixTimestamp = t;
  // since javascript works in milliseconds, you should convert 
  // the time into milliseconds by multiplying it by 1000.
  var date = new Date(unixTimestamp * 1000);
  // hours part from the timestamp (extra code needed to convert from military)
  var hours = (date.getHours() + 24) % 12 || 12;;
  // minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // will display time in 11:10 format
  var formatTime = hours + ':' + minutes.substr(-2);
  // send formatted date back
  return formatTime;

}


/* -----------------------------------------------
   Function for converting temp to fahrenheit
   DO NOT EDIT
   ----------------------------------------------- */

function convertTemp(t){

  return Math.round(((parseFloat(t)-273.15)*1.8)+32);

}


/* -----------------------------------------------
   Function for creating day of the week
   EDIT FORMAT OF DAY NAMES ONLY ("Monday", etc)
   ----------------------------------------------- */

// based on a system where 0 = today, 1 = tomorrow, etc.
// note: the number system below does not immediately correlate
// for example, 0 for today does not line up with 0 for Sunday below
// how this works – in the return statement, d.getDay() gets today's date
// as a number (if today is Thursday, d.getDay() will be 4)
// adding "n" to this number gives you how many days from today.
// n is passed as an argument to the displayDay() function
// in the main body of the code above.
// if today is Thursday, the 4th day of the week,
// and the number 2 is passed as an argument, 
// the function will return the number 6. 6 maps to Saturday in the 
// weekday array below.

function displayDay(n){

  var d = new Date();
  var weekday = new Array();

  weekday[0] = "SUNDAY";
  weekday[1] = "MONDAY";
  weekday[2] = "TUESDAY";
  weekday[3] = "WEDNESDAY";
  weekday[4] = "THURSDAY";
  weekday[5] = "FRIDAY";
  weekday[6] = "SATURDAY";

  var dispDay = d.getDay() + n;

  // adjust number system for numbers over 6
  // subtract 7 from totals higher than 6
  // to keep the day numbers in the array range above
  if(dispDay > 6){
    dispDay = dispDay - 7;
  }

  return weekday[ dispDay ];

}

/* --------------------------------------------------
   Event to get weather information when page loads
   -------------------------------------------------- */

window.onload = function() {
  weatherBalloon();
}