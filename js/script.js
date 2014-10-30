var map;
var markerArray = [];

$(function() {
	// create a map in the "map" div, set the view to a given place and zoom
	map = L.map('map').setView([40.71,-73.95], 13);

	// add tile layer
L.tileLayer('http://openmapsurfer.uni-hd.de/tiles/roadsg/x={x}&y={y}&z={z}', {
	attribution: 'Concert data from last.fm',
    	maxZoom: 18
}).addTo(map);

	// map google spreadsheet data
	getGoogleData();

});

	//Extend the Default marker class
var RedIcon = L.Icon.Default.extend({
options: {
	    iconUrl: 'http://i.stack.imgur.com/K2siG.png' ,
	    iconSize:     [30, 30],
	    shadowSize:   [0, 0], // size of the shadow
        iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [0, 0]
}
});
var redIcon = new RedIcon();

function getGoogleData()
{
	var spreadsheetID = '1erb6YP-gZ9iFyl3UAOLQ7BvjVSRTgrQqmiMVRmvYzxY';
	var worksheetID = 'od6';
	var url = 'https://spreadsheets.google.com/feeds/list/'+spreadsheetID+'/'+worksheetID+'/public/values?alt=json';

	$.getJSON(url,function(data){
		$.each(data.feed.entry,function(i,val){

			// assign parameters for mapping and infowindow
			// note that this will be different depending on header titles
			var lng = val.gsx$long.$t;
			var lat = val.gsx$lat.$t;
			var title = val.gsx$title.$t;
			var artists = val.gsx$artists.$t;
			var venuename = val.gsx$venuename.$t;
			var date = val.gsx$date.$t;
			var site= val.gsx$eventsite.$t;
 
			var thisMarker = L.marker([lat,lng], {icon: redIcon}).addTo(map)
			    .bindPopup('<h4>' + title + '</h4>' + date + '<br>' + venuename + '<br>' + artists + '<br><a href="' + site + '">' + venuename + 

'');

			// push marker into an array
			markerArray.push(thisMarker);

		});

		// put markers into a group to 
		var group = L.featureGroup(markerArray).addTo(map);
		//map.fitBounds(group.getBounds());
	})


}