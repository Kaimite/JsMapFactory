Kaimite.Map.GoogleMap = function (mapRef) {
	this.mapRef 		= mapRef;
	this.map			= undefined;
	this.layerList		= [];
	this.infosBulleList	= [];
	this.mapOptions		= {
		panControl			: true,
		zoomControl			: true,
		mapTypeControl		: true,
		scaleControl		: true,
		streetViewControl	: true,
		overviewMapControl	: false
	};
}

Kaimite.Map.GoogleMap.prototype.show = function () {
	this.mapOptions.center 		= this.mapOptions.center || new google.maps.LatLng(0, 0);
	this.mapOptions.zoom 		= this.mapOptions.zoom || 5;
	this.mapOptions.mapTypeId 	= this.mapOptions.mapTypeId || google.maps.MapTypeId.ROADMAP;
	this.map 					= new google.maps.Map(this.mapRef.getDomTarget(), this.mapOptions);
}

Kaimite.Map.GoogleMap.prototype.setMapType = function (value) {
	switch (value.toLowerCase()) {
		case 'route':
			this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
			break;
			
		case 'satellite':
			this.mapOptions.mapTypeId = google.maps.MapTypeId.SATELLITE;
			break;
			
		case 'hybride':
			this.mapOptions.mapTypeId = google.maps.MapTypeId.HYBRID;
			break;
				
		case 'terrain':
			this.mapOptions.mapTypeId = google.maps.MapTypeId.TERRAIN;
			break;
			
		default:
			this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
			break;
	}
}

Kaimite.Map.GoogleMap.prototype.displayZoomControl = function (value) {
	this.mapOptions.zoomControl = value;
}

Kaimite.Map.GoogleMap.prototype.displayPanControl = function (value) {
	this.mapOptions.panControl = value;
}

Kaimite.Map.GoogleMap.prototype.displayMapTypeControl = function (value) {
	this.mapOptions.mapTypeControl = value;
}

Kaimite.Map.GoogleMap.prototype.displayStreetViewControl = function (value) {
	this.mapOptions.streetViewControl = value;
}

Kaimite.Map.GoogleMap.prototype.displayOverviewMapControl = function (value) {
	this.mapOptions.overviewMapControl = value;
}

Kaimite.Map.GoogleMap.prototype.displayScale = function (value) {
	this.mapOptions.scaleControl = value;
}

Kaimite.Map.GoogleMap.prototype.setMapZoom = function (value) {
	this.mapOptions.zoom = parseInt(value, 10);
}

Kaimite.Map.GoogleMap.prototype.setCenter = function (point) {
	this.mapOptions.center = this.getLatLngFromPoint(point);
}

Kaimite.Map.GoogleMap.prototype.getLatLngFromPoint = function (kaimitePoint) {
	return new google.maps.LatLng(kaimitePoint.lat, kaimitePoint.lng);
}

Kaimite.Map.GoogleMap.prototype.addMarker = function (marker, index, showOnMap) {
	var markerOptions = {
		position	: this.getLatLngFromPoint(marker.point)
	};
	
	
	var iconSize,
		iconOriginPoint,
		iconAnchorPoint,
		shadowSize,
		shadowOriginPoint,
		shadowAnchorPoint;
		
	//--> Ajout d'une icone
	if ( typeof marker.icon !== "undefined" ) {
		if ( marker.icon.size ) {
			iconSize = new google.maps.Size(marker.icon.size.width, marker.icon.size.height);
		}
		if ( marker.icon.originPoint ) {
			iconOriginPoint = new google.maps.Point(marker.icon.originPoint.x,marker.icon.originPoint.y);
		}
		if ( marker.icon.anchorPoint ) {
			iconAnchorPoint = new google.maps.Point(marker.icon.anchorPoint.x,marker.icon.anchorPoint.y);
		}
		markerOptions.icon = new google.maps.MarkerImage(marker.icon.src, iconSize, iconOriginPoint, iconAnchorPoint);
	}
	
	//--> Ajout d'une ombre
	if ( typeof marker.shadow !== "undefined" ) {
		if ( marker.shadow.size ) {
			shadowSize = new google.maps.Size(marker.shadow.size.width, marker.shadow.size.height);
		}
		if ( marker.shadow.originPoint ) {
			shadowOriginPoint = new google.maps.Point(marker.shadow.originPoint.x,marker.shadow.originPoint.y);
		}
		if ( marker.shadow.anchorPoint ) {
			shadowAnchorPoint = new google.maps.Point(marker.shadow.anchorPoint.x,marker.shadow.anchorPoint.y);
		}
		markerOptions.shadow = new google.maps.MarkerImage(marker.shadow.src, shadowSize, shadowOriginPoint, shadowAnchorPoint);
	}
	
	//--> Zone de clic
	if ( marker.shape ) {
		markerOptions.shape = marker.shape;
	}
	
	//--> Titre
	if (marker.title) {
		markerOptions.title = marker.title;
	}
	
	//--> zIndex
	if (marker.zIndex) {
		markerOptions.zIndex = marker.zIndex;
	}
	
	//--> Test si le marker des draggable ou non
	if ( marker.draggable ) {
		markerOptions.draggable = true;
	}
	
	this.layerList[index]	= new google.maps.Marker(markerOptions);
	
	//--> Ajout de l'infoBulle
	if ( typeof marker.infoBulle !== "undefined" && marker.infoBulle instanceof Kaimite.Map.Marker.InfoBulle ) {
		this.infosBulleList[index] = new google.maps.InfoWindow({content: marker.infoBulle.content});
		var self = this;
		google.maps.event.addListener(this.layerList[index], 'click', function(event) {
			self.infosBulleList[index].open(self.googleMap, self.markerList[index]);
		});
		
		//--> Test si affichage de l'infoBulle
		if ( marker.infoBulle.visible ) {
			this.infosBulleList[index].open(this.map, this.layerList[index]);
		}
	}
	
	if ( showOnMap ) {
		this.showMarker(index);
	}
}

Kaimite.Map.GoogleMap.prototype.closeInfosBulleOnClick = function () {
	if ( typeof this.map == "undefined" ) {
		throw "Vous devez utiliser la méthode Kaimite.Map.show() avant la méthode Kaimite.Map.closeInfosBulleOnClick().";
	}
	var self = this;
	
	google.maps.event.addListener(this.map, 'click', function() {
		var nbBulles = self.infosBulleList.length;
		for ( var i = 0; i < nbBulles; i++ ) {
			self.infosBulleList[i].close(self.googleMap, self.markerList[i]);
		}
	});
}

Kaimite.Map.GoogleMap.prototype.showMarker = function (index) {
	this.showLayer(index);
}

Kaimite.Map.GoogleMap.prototype.hideMarker = function (index) {
	this.hideLayer(index);
}

Kaimite.Map.GoogleMap.prototype.fitBounds = function (bounds) {
	var boundsObj 	= new google.maps.LatLngBounds(),
		nbPoints	= bounds.points.length;
		
	for (var i = 0; i < nbPoints; i++) {
		boundsObj.extend( this.getLatLngFromPoint(bounds.points[i]) );
	}
	
	this.map.fitBounds(boundsObj);
}

Kaimite.Map.GoogleMap.prototype.addEvent = function (event_handler, event_function) {
	google.maps.event.addListener(this.map, event_handler, event_function);
}

Kaimite.Map.GoogleMap.prototype.addPolyline = function (polyline, index, showOnMap) {
	var path 				= [],
		nbPoints			= polyline.points.length;
		
	for ( var i = 0; i < nbPoints; i++ ) {
		path.push( this.getLatLngFromPoint(polyline.points[i]) );
	}
	
	var polyline = new google.maps.Polyline({
			path			: path,
			strokeColor		: polyline.color,
			strokeOpacity	: polyline.opacity,
			strokeWeight	: polyline.weight
	});
	
	this.layerList[index] = polyline;
	
	if (showOnMap) {
		this.showLayer(index);
	}
}

Kaimite.Map.GoogleMap.prototype.showLayer = function (index) {
	if ( typeof this.layerList[index] !== "undefined" ) {
		this.layerList[index].setMap( this.map );
	} else {
		throw "Le layer " + index + " n'existe pas";
	}
}

Kaimite.Map.GoogleMap.prototype.hideLayer = function (index) {
	if ( typeof this.layerList[index] !== "undefined" ) {
		this.layerList[index].setMap( null );
	} else {
		throw "Le layer " + index + " n'existe pas";
	}
}

Kaimite.Map.GoogleMap.prototype.getLanLngFromEvent = function(event) {
	return {
		lat 	: event.latLng.lat(),
		lng		: event.latLng.lng()
	};
}
