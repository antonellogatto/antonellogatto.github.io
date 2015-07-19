ftIDs = {
	'areas' : '1gJTaF9vm_uaotXJ1nVz-S-KHv28qMm773lCiSj50',
	'hospitals' : '1M1ylI073KtgKhfz_cLbY07B72bEjUdjirrF3ZsbU',
	'libraries' : '1zP15Bls1IdL0pQ-GvUDP77j1mtwSpN0ae645niw4',
	'child_schools' : '1PPtZdVfVDgR08wjZtXBgG_gI1wOLx2OTIMmE4sGQ',
	'elementary_schools' : '1LOC2bKLp19vO-Pqe7Jjiyry5IrbNBLKhLaKElGf7',
	'middle_schools' : '1VperMZVNiMQ-QHUoyb_elsirEGcz2GAk--9gHGOU',
	'high_schools' : '19B84p7V5wvh8CvZi8EIKowAzYB0tWoP4mq8RSTxA',
	'parks' : '1RP9uXht1xmqxySqS2FMGX_AQY6aUM4ivbuPnu7Vs'
};

google.load('visualization', '1.1', {'packages':['bar', 'treemap']});


var LAYER_STYLES = {
	'child_schools': {
		'colors': [
		'#ead1dc',
		'#d5a6bd',
		'#a64d79',
		'#741b47'
		]
	},
	'elementary_schools': {
		'colors': [
		'#ead1dc',
		'#d5a6bd',
		'#a64d79',
		'#741b47'
		]
	},
	'middle_schools': {
		'colors': [
		'#ead1dc',
		'#d5a6bd',
		'#a64d79',
		'#741b47'
		]
	},
	'high_schools': {
		'colors': [
		'#ead1dc',
		'#d5a6bd',
		'#a64d79',
		'#741b47'
		]
	},
	'hospitals': {
		'colors': [
		'#cfe2f3',
		'#6fa8dc',
		'#3d85c6',
		'#073763'
		]
	},
	'parks': {
		'colors': [
		'#e0ffd4',
		'#a5ef63',
		'#50aa00',
		'#267114'
		]
	},
	'libraries': {
		'colors': [
		'#fff2cc',
		'#ffe599',
		'#f1c232',
		'#bf9000'
		]
	}
}

var opacity = 0.5;
var sectorDiv, sector;
var markers = [];

function initialize() {
	sectorDiv = document.getElementById('sector');
	sector = sectorDiv.value;
	preferencesDiv = document.getElementById('preferences');

	var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) ||
	(navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
	if (isMobile) {
		var viewport = document.querySelector("meta[name=viewport]");
		viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
	}

	var mapDiv = document.getElementById('map-canvas');
	mapDiv.style.width = isMobile ? '100%' : '100%';
	mapDiv.style.height = isMobile ? '100%' : '500px';

	var map = new google.maps.Map(mapDiv, {
		center: new google.maps.LatLng(41.8919300, 12.5113300),
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
		}
	});

	var infoWindow = new google.maps.InfoWindow();

	var layer = new google.maps.FusionTablesLayer({
		heatmap: {enabled:false},
		query: {
            select: '*',
            from: ftIDs['areas']
          },
          map: map,
          suppressInfoWindows: true
	});

	createLegend(map, sector);
	styleLayerBySector(layer, sector);
	styleMap(map);
	drawPieChartVisualization(sector);
	drawTreeMapVisualization(sector);
	drawBarChartVisualization(sector);
	updatePreference(sector);
	loadMarkers(sector, map);

	google.maps.event.addDomListener(sectorDiv,
		'change', function() {
			sector = this.value;
			styleLayerBySector(layer, sector);
			updateLegend(sector);
			drawPieChartVisualization(sector);
			drawTreeMapVisualization(sector);
			drawBarChartVisualization(sector);
			updatePreference(sector);
			loadMarkers(sector, map);
		});

	google.maps.event.addListener(layer, 'click', function(e) {
		windowControl(e, infoWindow, map);
	});
}

function createLegend(map, sector) {
	var legendWrapper = document.createElement('div');
	legendWrapper.id = 'legendWrapper';
	legendWrapper.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendWrapper);
	legendContent(legendWrapper, sector);
}

function legendContent(legendWrapper, sector) {
	var legend = document.createElement('div');
	legend.id = 'legend';

	var title = document.createElement('p');
	title.innerHTML = sector;
	legend.appendChild(title);

	var layerStyle = LAYER_STYLES[sector];

	var query = "SELECT geometry, count_" + sector + " " +
	'FROM ' + ftIDs['areas'];

	var queryText = encodeURIComponent(query);
	var gvizQuery = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

	var minNum = 0;
	var maxNum = 0;
	gvizQuery.send(function(response) {
		var numRows = response.getDataTable().getNumberOfRows();

		for (var i = 0; i < numRows; i++) {
			var rowValue = parseInt(response.getDataTable().getValue(i,1));

			if (rowValue < minNum) minNum = rowValue;
			if (rowValue >= maxNum) maxNum = rowValue;
		}

		LAYER_STYLES[sector].max = maxNum;
		LAYER_STYLES[sector].min = minNum;

		var colors = layerStyle.colors;

		var step = Math.round((maxNum - minNum) / colors.length);

		for (var i = 0; i < colors.length; i++) {
			var legendItem = document.createElement('div');

			var color = document.createElement('div');
			color.setAttribute('class', 'color');
			color.style.backgroundColor = colors[i];
			legendItem.appendChild(color);

			var newMin = minNum + step * i;
			var newMax = newMin + step;
			var minMax = document.createElement('span');
			minMax.innerHTML = newMin + ' - ' + newMax;
			legendItem.appendChild(minMax);

			legend.appendChild(legendItem);
		}
	});

	legendWrapper.appendChild(legend);
}

function updateLegend(sector) {
	var legendWrapper = document.getElementById('legendWrapper');
	var legend = document.getElementById('legend');
	legendWrapper.removeChild(legend);
	legendContent(legendWrapper, sector);
}

function styleLayerBySector(layer, sector) {
	var layerStyle = LAYER_STYLES[sector];
	var colors = layerStyle.colors;

	var query = "SELECT geometry, count_" + sector + " " +
	'FROM ' + ftIDs['areas'];

	var queryText = encodeURIComponent(query);
	var gvizQuery = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

	var minNum = 0;
	var maxNum = 0;
	gvizQuery.send(function(response) {
		var numRows = response.getDataTable().getNumberOfRows();

		for (var i = 0; i < numRows; i++) {
			var rowValue = parseInt(response.getDataTable().getValue(i,1));

			if (rowValue < minNum) minNum = rowValue;
			if (rowValue >= maxNum) maxNum = rowValue;
		}

		layerStyle.max = maxNum;
		layerStyle.min = minNum;

		var step = (maxNum - minNum) / colors.length;

		var styles = new Array();
		for (var i = 0; i < colors.length; i++) {
			var newMin = minNum + step * i;
			styles.push({
				where: generateWhere(newMin, sector),
				polygonOptions: {
					fillColor: colors[i],
					fillOpacity: opacity
				}
			});
		}
		layer.set('styles', styles);
	});
}


// var geocoder = new google.maps.Geocoder();
// function geocodeAddress(address, map, callback, i) {
//     var latlng = new Array(2);
//     setTimeout(function() {
//     	geocoder.geocode( {'address': address+' ROMA'}, function(results, status) {
//       		if (status == google.maps.GeocoderStatus.OK) { 
// 	            latlng[0] = results[0].geometry.location.lat();
//             	latlng[1] = results[0].geometry.location.lng();
//             	callback(latlng, map);
//       		} else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {    
//             	setTimeout(function() {
// 	                geocodeAddress(address, map, callback, i);
//             	}, 100);
//         	} else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {   	} else {
// 	            alert("Geocode was not successful for the following reason:" 
//                   + status);
//         	}
//     	}); 
//     }, i*100);
// }

function loadMarkers(sector, map) {
	setAllMap(null);
	markers = [];
	var query = "SELECT * " +
	'FROM ' + ftIDs[sector];

	var queryText = encodeURIComponent(query);
	var gvizQuery = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

	gvizQuery.send(function(response) {
		var numRows = response.getDataTable().getNumberOfRows();
		for (var i = 0; i < numRows; i++) {
			// geocodeAddress(response.getDataTable().getValue(i, 0), map, createMarker, i);
			var name = response.getDataTable().getValue(i, 0);
			var address = response.getDataTable().getValue(i, 1);
			var lat = response.getDataTable().getValue(i, 3);
			var lng = response.getDataTable().getValue(i, 2);
			var marker = createMarker(name, address, lat, lng);
    		markers.push(marker);
		}

		setAllMap(map);
	});
}

function createMarker(name, address, lat, lng){
	var marker = new google.maps.Marker({
      			position: new google.maps.LatLng(lat, lng),
      			icon: 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0',
      			animation: google.maps.Animation.DROP,
      			title: name
  	});
	return marker;
}

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++)
    markers[i].setMap(map);
}

function generateWhere(minNum, sector) {
	var whereClause = new Array();
	whereClause.push('count_');
	whereClause.push(sector);
	whereClause.push(' >= ');
	whereClause.push(minNum);
	return whereClause.join('');
}

function styleMap(map) {
	var style = [{
		featureType: 'all',
		stylers: [{
			saturation: 0
		}]
	}, {
		featureType: 'poi',
		stylers: [{
			visibility: 'off'
		}]
	}, {
		featureType: 'poi.park',
		stylers: [{
			visibility: 'on'
		}]
	}, {
		featureType: 'poi.medical',
		stylers: [{
			visibility: 'on'
		}]
	}, {
		featureType: 'poi.school',
		stylers: [{
			visibility: 'on'
		}]
	}, {
		featureType: 'road',
		elementType: 'labels',
		stylers: [{
			visibility: 'off'
		}]
	}];

	var styledMapType = new google.maps.StyledMapType(style, {
		map: map,
		name: 'Styled Map'
	});
	map.mapTypes.set('map-style', styledMapType);
	map.setMapTypeId('map-style');
}

function windowControl(e, infoWindow, map) {
	infoWindow.setOptions({
		content: "<div class='googft-info-window'>" +
		e.row['mun_name'].value + ": <b>" + e.row[('count_'+sector)].value + "</b><br>" +
		"</div>",
		position: e.latLng,
		pixelOffset: e.pixelOffset
	});
	infoWindow.open(map);
}

function drawPieChartVisualization(sector) {
	google.visualization.drawChart({
		containerId: 'piechart-visualization',
		dataSourceUrl: 'http://www.google.com/fusiontables/gvizdata?tq=',
		query: 'SELECT mun_name, count_' + sector + ' ' +
		'FROM 1gJTaF9vm_uaotXJ1nVz-S-KHv28qMm773lCiSj50 ',
		chartType: 'PieChart',
		options: {
			height: 300,
			width: 300,
			backgroundColor: 'none',
			pieHole: 0.2,
			legend: 'none'
		}
	});
}

function drawBarChartVisualization(sector) {
	var query = "SELECT mun_name, count_" + sector + " " +
	'FROM 1gJTaF9vm_uaotXJ1nVz-S-KHv28qMm773lCiSj50';

	var queryText = encodeURIComponent(query);
	var gvizQuery = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

	gvizQuery.send(function(response) {
		var data = response.getDataTable();
		data.sort([{column: 1, desc:true}]);
		var view = new google.visualization.DataView(data);
      	view.setColumns([{ 
      		calc: onlyMunNum,
            type: 'string'
        }, 
        1, 
        { 
      		calc: 'stringify',
            sourceColumn: 1,
            type: 'string',
            role: 'annotation' 
        },
        { 
      		calc: genBarStyle,
            type: 'string',
            role: 'style' 
        }]);
        view.setRows(view.getFilteredRows([{column: 1, minValue: 1}]));

		var options = {
        	hAxis: {
          	title: 'Municipio',
        	},
        	vAxis: {
          		title: 'Numero di strutture'
        	},
        	width: 440,
        	height: 300,
        	bar: { groupWidth: '95%' },
        	legend: { position: 'none' },
        	sortColumn: 1
      	};

      	var chart = new google.charts.Bar(document.getElementById('barchart-visualization'));
      	chart.draw(view, google.charts.Bar.convertOptions(options));
    });
}

function onlyMunNum(dataTable, rowNum) {
	return dataTable.getValue(rowNum, 0).substring(9, dataTable.getValue(rowNum, 0).length);
}

function genBarStyle(dataTable, rowNum) {
	var col;
	var layerStyle = LAYER_STYLES[sector];
	var colors = layerStyle.colors;

	var maxNum = layerStyle.max;
	var minNum = layerStyle.min;

	var step = (maxNum - minNum) / colors.length;
	for (var i = 0; i < colors.length; i++) {
		var newMin = minNum + step * i;
		if (dataTable.getValue(rowNum, 1) > newMin) 
			col = colors[0];
	}	

	return col;
}

function drawTreeMapVisualization(sector) {
	var dataArray = [['Location', 'Parent', 'Number of structures'],['Rome', null, 0]];

	var query = "SELECT mun_name, count_" + sector + " " +
	'FROM 1gJTaF9vm_uaotXJ1nVz-S-KHv28qMm773lCiSj50';

	var queryText = encodeURIComponent(query);
	var gvizQuery = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

	gvizQuery.send(function(response) {
		var numRows = response.getDataTable().getNumberOfRows();

		for (var i = 0; i < numRows; i++) {
			var rome_num = response.getDataTable().getValue(i,0).substring(9, response.getDataTable().getValue(i,0).length);
			var tmparr = [rome_num, 'Rome', response.getDataTable().getValue(i,1)];
			dataArray.push(tmparr);
		}

		var data = google.visualization.arrayToDataTable(dataArray);
		var tree = new google.visualization.TreeMap(document.getElementById('treemap-visualization'));

		tree.draw(data, {
			minColor: LAYER_STYLES[sector].colors[0],
			maxColor: LAYER_STYLES[sector].colors[3],
			headerHeight: 15,
			fontColor: 'black',
			showScale: true
		});
	});
}

function updatePreference(sector) {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		if (sector == 'libraries' || sector == 'child_schools') {
			jQuery.get('preferences.csv', function(data) {
				var prefArr = data.split('\n');
				var prefHTML = '<br>';
				
				for (var i = 0; i < prefArr.length; i++) {	
					var sec = prefArr[i].split(',')[0];
					if (sec == sector) 
						prefHTML += 
					'<p>Municipio ' +
					prefArr[i].split(',')[1] + ' 	' + 
					'			:				' +
					prefArr[i].split(',')[2] + '</p><br>';
				};
				preferencesDiv.innerHTML = prefHTML;

			});
		}
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}
}


google.maps.event.addDomListener(window, 'load', initialize);