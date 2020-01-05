/* -----------------------------------------------
   Function for retrieving the main weather info
   ----------------------------------------------- */

// Replace the lat/long below with the lat/long for your desired location.
// Get your city lat/long using https://www.latlong.net/
var latlong = '51.507351,-0.127758';

// Your unique API key. Place the long string of characters between the quotes.
var apikey = 'cce3fa51e9c9f80659c82605fb03b037';

// Access the DarkSky API for weather data. DO NOT EDIT THIS LINE.
$.getJSON('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/'+apikey+'/' + latlong)

// Display the weather content once it is loaded, not before.
.done(function(forecast) {
	// Your header section covers over the main weather info.
	// When the data is available, you will need to hide/remove this section
	// in order to see the main content. How you do this is up to you.
	
	// The most basic basic approach is to just hide the header (uncomment to use)
		
	// $('header').hide();
	
	// Other methods include animating the header away.
	// This can be done by adding a class name containing CSS animation
	// code to the header like this (uncomment to use)

	// $('header').addClass('anim');

	// This assumes you have written a class with the animation code
	// and named it .anim

	// Another way to remove the header is to provide a button and the event
	// to trigger what happens when the button is clicked (uncomment to use)

	 // $('header').append('<a class="button" href="#">Click</a>');
	 $('header button').click(function(){
	 $('header').addClass('anim');
	 });

	// The following line calls a function to display
	// the main weather information. DO NOT EDIT THIS LINE.
	displayData(forecast);
})

// Print the data object feturned from DarkSky for all the details
// DO NOT EDIT THIS LINE.
.always(function(forecast) {
	console.log(forecast);
});


/* -----------------------------------------------
   Function for displaying the main weather info
   ----------------------------------------------- */

// All of the data comes from the "forecast" object returned
// from the DarkSky API. Inspect this page in the browser
// for a full list of data that can be used using the methods below.

function displayData(forecast){

	// Target an element in your interface and display
	// dynamic weather information inside of it

	// All of the data you need is located in the "Console" tab
	// when you inspect th code in the browser
	// Click the arrow next to the "Object" to drill down into the data
	// You can reference these data points in your code using the following
	// method(s).

	// For example, if I have an element <div class="today"> in my main content area
	// I can add data from the "Daily" array like this

	// $('.today').html(forecast.daily.data[0].temperatureHigh);
	
	// In this example, the high temperature for the first day of the week
	// (referenced by the number 0) is written as HTML inside the <div class="today"> element
	// If I want to round this number up, I would modify the code like this

	$('.currentTemp').html(Math.round(forecast.currently.temperature));
	
	$('.nextday1 h4').html(Math.round(forecast.daily.data[1].temperatureHigh));
	$('.nextday2 h4').html(Math.round(forecast.daily.data[2].temperatureHigh));
	$('.nextday3 h4').html(Math.round(forecast.daily.data[3].temperatureHigh));
	$('.nextday4 h4').html(Math.round(forecast.daily.data[4].temperatureHigh));
	$('.nextday5 h4').html(Math.round(forecast.daily.data[5].temperatureHigh));
	$('.nextday6 h4').html(Math.round(forecast.daily.data[6].temperatureHigh));

	$('.nextday1 p').html(getTime(forecast.daily.data[2].time));
	$('.nextday2 p').html(getTime(forecast.daily.data[3].time));
	$('.nextday3 p').html(getTime(forecast.daily.data[4].time));
	$('.nextday4 p').html(getTime(forecast.daily.data[5].time));
	$('.nextday5 p').html(getTime(forecast.daily.data[6].time));
	$('.nextday6 p').html(getTime(forecast.daily.data[7].time));

	$('.date').html(getTime(forecast.currently.time));

	$('.sunrise p').html(timeConverter(forecast.daily.data[0].sunriseTime));
	$('.sunset p').html(timeConverter(forecast.daily.data[0].sunsetTime));


	$('.moon span').html(displayMoon(forecast.daily.data[0].moonPhase));
	$('.moon p').html(displayMoonText(forecast.daily.data[0].moonPhase));

	// $('main .menuBtn').click(function(){
	// $('section').addClass('anim');
	//  }

	$('.aboutPage').click(function(){
  		$(this).toggle();
	});

	$('.menubtn button').click(function(){
  		$('.aboutPage').toggle();
	});


	// If I want to display the same information for tomorrow, change the 0 to 1

	// $('.today').html(Math.round(forecast.daily.data[1].temperatureHigh));

	// If I want to display a summary of the weather
	// (like, "scattered thundershowers...") for today

	// $('.today').html(forecast.daily.data[0].summary);

	// If I want to modify the display of the page element based on the weather
	// I can access the "icon" property. This returns a value that can be used
	// as a CSS class name that you can create with your style details

	$('main').addClass(forecast.daily.data[0].icon);

	// Note – the value of "icon" above needs to be checked in the inspect
	// panel. It may say "rain". If this is the case, you could create a rule
	// inside your CSS called .rain and then add, maybe, a background color
	// or image. The full range of weather values returned by the "icon" property are

	// "clear-day", "clear-night", "rain", "snow", "sleet", "wind", "fog",
	// "cloudy", "partly-cloudy-day", "partly-cloudy-night", "hail",
	// "thunderstorm" and "tornado"

}

function displayMoon(n){
   if( n > 0 && n < .25 ){
     return '<img src="img/icons/new.svg" alt="new moon">';
   } else if( n >= .25 && n < .50 ) {
     return '<img src="img/icons/first-quarter.svg" alt="first quarter moon">';
   } else if( n >= .5 && n < .75 ) {
     return '<img src="img/icons/full.svg" alt="full moon">';
   } else {
     return '<img src="img/icons/third-quarter.svg" alt="third quater moon">'; 
   }
}

function displayMoonText(n){
   if( n > 0 && n < .25 ){
     return 'new';
   } else if( n >= .25 && n < .50 ) {
     return '1st quarter';
   } else if( n >= .5 && n < .75 ) {
     return 'full';
   } else {
     return '3rd quarter'; 
   }
}



/* -----------------------------------------------
   Function for creating day of the week
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

	weekday[0] = "SUN";
	weekday[1] = "MON";
	weekday[2] = "TUE";
	weekday[3] = "WED";
	weekday[4] = "THU";
	weekday[5] = "FRI";
	weekday[6] = "SAT";

	var dispDay = d.getDay() + n;

	// adjust number system for numbers over 6
	// subtract 7 from totals higher than 6
	// to keep the day numbers in the array range above
	if(dispDay > 6){
		dispDay = dispDay - 7;
	}

	return weekday[ dispDay ];

}


/* -----------------------------------------------
   Function for converting timestamp to readable text
   Source: https://stackoverflow.com/a/6078873
   ----------------------------------------------- */

function getTime(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = month + "&nbsp;" + date;
  return time;
}

// function getMorning(UNIX_timestamp){
//   var a = new Date(UNIX_timestamp * 1000);
//   // var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
//   // var year = a.getFullYear();
//   // var month = months[a.getMonth()];
//   // var date = a.getDate();
//   var hour = ((a.getHours() + 24) % 12 || 24) +5;
//   var min = a.getMinutes();
//   var sec = a.getSeconds();
//   // return hour + ":" + min;

//   if(min < 10){
//   	min =  min + "0";
//   }
//   return hour + ":" + min;

// }

// function getEvening(UNIX_timestamp){
//   var a = new Date(UNIX_timestamp * 1000);
//   // var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
//   // var year = a.getFullYear();
//   // var month = months[a.getMonth()];
//   // var date = a.getDate();
//   var hour = (((a.getHours() + 24) % 12 || 24) - 13) * -1;
//   var min = a.getMinutes();
//   var sec = a.getSeconds();
//   // return hour + ":" + min;

//   if(min < 10){
//   	min =  min + "0";
//   }
//   return hour + ":" + min;

// }


function timeConverter(UNIX_timestamp){

  // set up new date object
  var a = new Date(UNIX_timestamp * 1000);

  // convert date/time to simplified format
  var time = a.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  // for time minus AM/PM
  if(time.includes(" AM")){
    // remove AM
    var convertedTime = time.replace(" AM", "");
  } else {
    // remove PM
    var convertedTime = time.replace(" PM", "");
  }

  // use the following line for time minus AM/PM
  return convertedTime;

  // use the following line for time with AM/PM
 //  return time;

}



// function ShowInfo {

// 	$('main .menuBtn').click(function(){
// 	$('#aboutPage').addClass('anim');
// 	 });
// }

/* -----------------------------------------------
	Author's JS Inputs
   ----------------------------------------------- */
// // add your image URLs here
// var arr = ['../img/logo_black.svg','../img/logo_yellow.svg','../img/logo_red.svg','../img/logo_blue.svg','../img/logo_green.svg'];

// function getRandom(){
//   // get random number based on length of array
//   var rand = Math.floor(Math.random() * arr.length);
//   // insert the random image url into the "src" attribute
//   $('div img').attr('src', arr[rand] );
// }
// // call function to display a random term when the page loads
// getRandom();




// sample array
var arr =['<img src="img/logo_black.svg">','<img src="img/logo_yellow.svg">','<img src="img/logo_red.svg">','<img src="img/logo_blue.svg">','<img src="img/logo_green.svg">'];

function getRandom(){
  // get random number based on length of array
  var rand = Math.floor(Math.random() * arr.length);
  // display random value
  $('.logo').html( arr[rand] );
}

// call function to display a random term when the page loads
getRandom();

/* change the random term each time the .randomize link is clicked */
 $('header').click(function(){
   getRandom();
 })
