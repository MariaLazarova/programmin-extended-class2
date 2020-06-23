

var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '9624c2d86092c1073e67cedafe3ebe6a';

var stations = [

	{
		name: 'Kennedy Space Center',
		coordinates: {

			lat: 28.572872,
			lon: -80.648979
		} 
	},
	{
		name: 'Nasa Research Center',
		coordinates: {

			lat: 41.4161,
			lon: 81.8583
		}
			
	},

]


window.onload=function() {
	console.log('hello');
	stations.forEach(function(station, index) {
		var request = openWeatherMapUrl + "?" + "appid=" + openWeatherMapUrlApiKey + "&lon=" + station.coordinates.lon + "&lat=" + station.coordinates.lat;

		fetch(request)
			.then(function(response) {
				console.log("MIMIMIIII ", response);
				if(!response.ok) throw Error(response.statustext);
				return response.json();
			})
			.then(function(response) {
				// plotImageOnMap(response.weather[0].icon, city)
				console.log(response.weather[0].icon, station);
				var icon = response.weather[0].icon;
				var description = response.weather[0].description;
				var temperature = response.main.temp;
				var imageSrc = 'http://openweathermap.org/img/w/' + icon + '.png';
				document.getElementById(`station${index+1}-img`).setAttribute('src', imageSrc);
				document.getElementById(`desc${index+1}`).innerHTML=description;
				document.getElementById(`temp${index+1}`).innerHTML=temperature + " F";
			})
			.catch(function (error) {
				console.log('ERROR:', error);
			});
	});
};

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWFsYXphcm92YSIsImEiOiJja2I3dGpjNTEwN252MzVwZnNwbWpqcTE0In0.mP80mL5BdPVN9X7IeLbRig';

var center = [-81.379234, 28.538336]

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-81.379234, 28.538336],
	zoom: 8

});

map.on('load', function () {

	var imgPath = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png';
	var station = stations[0];

	plotPin(imgPath, station, 0.05);
	

});

function plotPin(pin, station, size) {
	map.loadImage(pin, function(error, pinImage) {
		if (error) throw error;
		map.addImage('station_' + station.name, pinImage);
		map.addSource('point_' + station.name, {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: [{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [station.coordinates.lon, station.coordinates.lat]
					}
				}]

			}
		});
		map.addLayer({
			id: "points_" + station.name,
			type: "symbol",
			source: "point_" + station.name,
			layout: {
				"icon-image": "station_" + station.name,
				"icon-size": size
			}
		})

	})	
}

document.getElementById('fun-button').addEventListener('click', function(){
	console.log('click');
	center = [-81.556940, 28.373070]
	var station = {name:"DisneyWorld", coordinates: {lat: 28.373070, lon:-81.556940}};
	var pin = 'https://img.icons8.com/clouds/2x/disney-plus.png';
	var iconSize = 0.7;
	plotPin(pin, station, iconSize);
})


