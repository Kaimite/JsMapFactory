Kaimite.Map.BingMap = function (mapRef) {
	this.mapRef 		= mapRef;
	this.map			= undefined;
	this.layerList		= [];
	this.infosBulleList	= [];
	this.mapOptions		= {
		showScalebar 		: true,
		showDashboard 		: true,
		showLogo 			: true,
		showCopyright 		: true,
		enableSearchLogo 	: false
	};
	this.credentials 	= undefined;
	
	this.setOptionSize();
}

Kaimite.Map.BingMap.prototype.show = function () {
	this.map = new Microsoft.Maps.Map(this.mapRef.getDomTarget(), this.mapOptions);
}

Kaimite.Map.BingMap.prototype.setMapType = function (value) {
	/*
		aerial
		auto
		birdseye
		collinsBart
		mercator
		ordnanceSurvey
		road
	*/
	
	switch (value.toLowerCase()) {
		case 'route':
			this.mapOptions.mapTypeId = Microsoft.Maps.MapTypeId.road;
			break;
			
		case 'satellite':
			this.mapOptions.mapTypeId = Microsoft.Maps.MapTypeId.aerial;
			break;
			
		case 'birdseye':
			this.mapOptions.mapTypeId = Microsoft.Maps.MapTypeId.birdseye;
			break;
			
		case 'mercator':
			this.mapOptions.mapTypeId = Microsoft.Maps.MapTypeId.mercator;
			break;
				
		case 'ordnancesurvey':
			this.mapOptions.mapTypeId = Microsoft.Maps.MapTypeId.ordnanceSurvey;
			break;
			
		default:
			this.mapOptions.mapTypeId = Microsoft.Maps.MapTypeId.auto;
			break;
	}
}

Kaimite.Map.BingMap.prototype.setOptionSize = function () {
	this.mapOptions.width 	= $("#" + this.mapRef.getTarget()).width();
	this.mapOptions.height 	= $("#" + this.mapRef.getTarget()).height();
}

Kaimite.Map.BingMap.prototype.setMapZoom = function (value) {
	this.mapOptions.zoom = parseInt(value, 10);
}


Kaimite.Map.BingMap.prototype.setCenter = function (point) {
	this.mapOptions.center = this.getLatLngFromPoint(point);
}

Kaimite.Map.BingMap.prototype.displayZoomControl = function (value) {
	this.mapOptions.showDashboard = value;
}

Kaimite.Map.BingMap.prototype.displayPanControl = function (value) {
	this.mapOptions.showDashboard = value;
}

Kaimite.Map.BingMap.prototype.displayMapTypeControl = function (value) {
	this.mapOptions.showDashboard = value;
}

Kaimite.Map.BingMap.prototype.displayScale = function (value) {
	this.mapOptions.showScalebar = value;
}

Kaimite.Map.BingMap.prototype.displayLogo = function (value) {
	this.mapOptions.showLogo = value;
}

Kaimite.Map.BingMap.prototype.displayCopyright = function (value) {
	this.mapOptions.showCopyright = value;
}

Kaimite.Map.BingMap.prototype.displaySearchLogo = function (value) {
	this.mapOptions.enableSearchLogo = value;
	if ( value == true ) {
		this.displayLogo(true);
	}
}

Kaimite.Map.BingMap.prototype.setCredential = function (credentials) {
	this.mapOptions.credentials = credentials;
}

Kaimite.Map.BingMap.prototype.getLatLngFromPoint = function (kaimitePoint) {
	return new Microsoft.Maps.Location(kaimitePoint.lat, kaimitePoint.lng);
}

Kaimite.Map.BingMap.prototype.addMarker = function (marker, index, showOnMap) {
	var centerPoint 	= this.getLatLngFromPoint(marker.point),
		markerOptions	= {};
	
	var iconSize,
		iconOriginPoint,
		iconAnchorPoint,
		shadowSize,
		shadowOriginPoint,
		shadowAnchorPoint;
		
	//--> Ajout d'une icone
	if ( typeof marker.icon !== "undefined" ) {
		markerOptions.icon 		= marker.icon.src;
		markerOptions.height	= marker.icon.size.height;
		markerOptions.width		= marker.icon.size.width;
		markerOptions.anchor	= new Microsoft.Maps.Point(marker.icon.anchorPoint.x,marker.icon.anchorPoint.y);
	}
	
	//--> Ajout d'une ombre
	
	//--> Zone de clic

	
	//--> Titre

	
	//--> zIndex
	
	//--> Test si le marker des draggable ou non
	if ( marker.draggable ) {
		markerOptions.draggable = true;
	}

	this.layerList[index]	= new Microsoft.Maps.Pushpin(centerPoint, markerOptions);
	
	//--> Ajout de l'infoBulle
	
	
	if ( showOnMap ) {
		this.showMarker(index);
	}
}

Kaimite.Map.BingMap.prototype.addPolyline = function (polyline, index, showOnMap) {
	var path 				= [],
		nbPoints			= polyline.points.length;
		
	for ( var i = 0; i < nbPoints; i++ ) {
		path.push( this.getLatLngFromPoint(polyline.points[i]) );
	}
	
	var date = "15/08/2000";
	var jour = date.substring(0,2);
	var mois = date.substring(3,5);
	var annee = date.substring(6,10);
	
	var opacity				= polyline.opacity * 255,
		red					= polyline.color.substring(1,3), // #ff0011
		green				= polyline.color.substring(3,5),
		blue				= polyline.color.substring(5,7),
		polylineStrokeColor = new Microsoft.Maps.Color(opacity, parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16)),
		polyline 			= new Microsoft.Maps.Polyline(path, { strokeColor: polylineStrokeColor, strokeThickness: polyline.weight });
	
	this.layerList[index] = polyline;
	
	if (showOnMap) {
		this.showLayer(index);
	}
}

Kaimite.Map.BingMap.prototype.closeInfosBulleOnClick = function () {
	
}

Kaimite.Map.BingMap.prototype.showMarker = function (index) {
	this.showLayer(index);
}

Kaimite.Map.BingMap.prototype.hideMarker = function (index) {
	this.hideLayer(index);
}

Kaimite.Map.BingMap.prototype.showLayer = function (index) {
	if ( typeof this.layerList[index] !== "undefined" ) {
		this.map.entities.push( this.layerList[index] );
	} else {
		throw "Le layer " + index + " n'existe pas";
	}
}

Kaimite.Map.BingMap.prototype.hideLayer = function (index) {
	throw "hideLayer() a faire sur BingMap";
}

Kaimite.Map.BingMap.prototype.addEvent = function (event_handler, event_function) {
	Microsoft.Maps.Events.addHandler(this.map, event_handler, event_function);
}

Kaimite.Map.BingMap.prototype.getLanLngFromEvent = function(event) {
	if (event.targetType == "map") {
		var point 		= new Microsoft.Maps.Point(event.getX(), event.getY()),
			loc 		= event.target.tryPixelToLocation(point);
			
		return {
			lat 	: loc.latitude,
			lng		: loc.longitude
		};	
	}
}


