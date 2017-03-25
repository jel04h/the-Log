// Global Veriables, Default Values
var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
var userName = "please use the icon in the top right hand corner to configure";
var zipCode = "";
var weatherOb = {
	weatherIcon: "",
	weatherTemperature: "",
	weatherHumidity: "",
	weatherPrecip: "",
	weatherLocation: ""
};

$(document).ready(function(){
	zipCode = localStorage.getItem('zip');
	userName = localStorage.getItem('name');
	
	for (var i=0; i<localStorage.length; i++) {
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		console.log(value);
		if (key != 'zip' && key != 'name') {
			addEntry(JSON.parse(value));
		}
	}

	//auto-populates the info that you start with on the page
	if (zipCode != null) {
    printWeather();
	}
	addWeatherStatsToPage();
	
	var theNewEntryDate = new Date();
	$("#theUsersName").text("- " + userName + " @" + zipCode);
	$("#new-entry-date").text(months[theNewEntryDate.getUTCMonth()] + " " + theNewEntryDate.getUTCDate() + ", " + theNewEntryDate.getUTCFullYear());
	
	//when you click on the gear for more options - toggle the form on and off
	$("#theGear").click(function(){
		$("#corner-form").toggle();
	});
	
	//Options - click on gear
	$("#option-submit").click(function() {
		userName = $("#logname").val();
		zipCode = $("#logzip").val();
		$("#theUsersName").text("- " + userName + " @" + zipCode);
		localStorage.setItem('name', userName);
		localStorage.setItem('zip', zipCode);
		$("#corner-form").toggle();
		printWeather();
	});
	
	//when you click submit to submit your form
	$("#entry-submit").click(function() {
		console.log("click cki");
		var form = document.getElementById("entryForm");
		var theDateNow = new Date();
		
		var entry = {
			logTitle: $("#logtitle").val(),
			logEntry: $("#logentry").val(),
			logTags: $("#logtags").val(),
			logDate: months[theDateNow.getUTCMonth()] + " " + theDateNow.getUTCDate() + ", " + theDateNow.getUTCFullYear(),
			logTime: theDateNow.getHours() + ":" + theDateNow.getMinutes(),
			logTemp: weatherOb.weatherTemperature,
			logRain: weatherOb.weatherPrecip,
			logHumidity: weatherOb.weatherHumidity,
			logIcon: weatherIcons(weatherOb.weatherIcon),
			logLocation: weatherOb.weatherLocation
		};
		
		localStorage.setItem(theDateNow, JSON.stringify(entry));
		
		addEntry(entry);
		console.log(entry);
		form.reset;
		
	});
});

//Appends the entry to the page in HTML
function addEntry(theEntryInQuestion) {
	$('#theOneSpotForEntries').prepend('<section class="old-entry"><h2>' + theEntryInQuestion.logTitle + '</h2><p><strong>' + theEntryInQuestion.logDate + '<br>Location</strong> // ' + theEntryInQuestion.logLocation + '</p><table class="weather"><tr class="margin-top-10"><th>Temperature</th><th>Precipitation</th><th>Humidity</th></tr><tr><td><h3><img width="20px;" src="imgs/thermometer.svg">' + theEntryInQuestion.logTemp + '</h3></td><td><h3>' + theEntryInQuestion.logIcon + ' ' + theEntryInQuestion.logRain + '</h3></td><td><h3><img width="20px;" src="imgs/humidity.svg">' + theEntryInQuestion.logHumidity + '</h3></td></tr></table><p class="entryText">' + theEntryInQuestion.logEntry + '</p><p>' + theEntryInQuestion.logTags + '</p></section>');
}


//Weather Underground API Key: 25f94ea148cfdf79 
//http://api.wunderground.com/api/25f94ea148cfdf79/conditions/q/60290.json
function printWeather() {
	$.getJSON("http://api.wunderground.com/api/25f94ea148cfdf79/conditions/q/" + zipCode + ".json", function( JSON ) {
		var theCurrentWeather = JSON.current_observation;
		console.log(theCurrentWeather);
		console.log(theCurrentWeather.icon);
		weatherOb.weatherIcon = theCurrentWeather.icon;
		weatherOb.weatherPrecip = theCurrentWeather.precip_today_in;
		weatherOb.weatherHumidity = theCurrentWeather.relative_humidity;
		weatherOb.weatherTemperature = theCurrentWeather.temp_f;
		weatherOb.weatherLocation = theCurrentWeather.observation_location.full;
		addWeatherStatsToPage();
	});
	return;
}

// Weather Icons
// A machine-readable text summary of this data point, suitable for selecting an icon for display. If defined, this property will have one of the following values: clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night. (Developers should ensure that a sensible default is defined, as additional values, such as hail, thunderstorm, or tornado, may be defined in the future.)
function weatherIcons(weatherText) {
	var iconImg = '-';
	var beforImagetxt = '<img width="20px;" src="';
	var afterImagetxt = '">';
	if (weatherText === "chanceflurries") {
    iconImg = 'imgs/cloudy-5.svg';
	} else if (weatherText === "chancerain") {
		iconImg = 'imgs/cloudy-5.svg';
	} else if (weatherText === "chancesleet") {
		iconImg = 'imgs/cloudy-5.svg';
	} else if (weatherText === "chancesnow") {
		iconImg = 'imgs/cloudy-5.svg';
	} else if (weatherText === "clear") {
		iconImg = 'imgs/sun.svg';
	} else if (weatherText === "cloudy") {
		iconImg = 'imgs/cloudy-day.svg';
	} else if (weatherText === "flurries") {
		iconImg = 'imgs/hail-4.svg';
	} else if (weatherText === "fog") {
		iconImg = 'imgs/fog.svg';
	} else if (weatherText === "hazy") {
		iconImg = 'imgs/foggy-1.svg';
	} else if (weatherText === "mostlycloudy") {
		iconImg = 'imgs/cloudy-5.svg';
	} else if (weatherText === "mostlysunny") {
		iconImg = 'imgs/sun.svg';
	} else if (weatherText === "partlycloudy") {
		iconImg = 'imgs/cloudy-day.svg';
	} else if (weatherText === "sleet") {
		iconImg = 'imgs/snow-1.svg';
	} else if (weatherText === "rain") {
		iconImg = 'imgs/rain-3.svg';
	} else if (weatherText === "snow") {
		iconImg = 'imgs/frost.svg';
	} else if (weatherText === "sunny") {
		iconImg = 'imgs/sun.svg';
	} else if (weatherText === "tstorms") {
		iconImg = 'imgs/storm-2.svg';
	} else {
		iconImg = 'imgs/windsock.svg';
	}
	return beforImagetxt + iconImg + afterImagetxt;
} 

//adds weather to the new entry part of the page
function addWeatherStatsToPage() {
	var theNewEntryWeath = weatherIcons(weatherOb.weatherIcon);
	var theNewEntryRain = weatherOb.weatherPrecip;
	var theNewEntryTemp = Math.round(weatherOb.weatherTemperature);
	var theNewEntryHumidity = weatherOb.weatherHumidity;
	var theNewEntryLocation = weatherOb.weatherLocation;
	$("h3#enterWeatherHere").html(theNewEntryWeath + " " + theNewEntryRain + " in");
	$("h3#enterTempsHere").html('<img width="20px;" src="imgs/thermometer.svg"> ' + theNewEntryTemp);
	$("h3#enterHumidityHere").html('<img width="20px;" src="imgs/humidity.svg"> ' + theNewEntryHumidity);
	$("#enterLocationInfo").html('<strong>Location </strong> // ' + theNewEntryLocation);
}
