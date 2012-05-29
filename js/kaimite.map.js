/**
 * Kaimite.Map
 * 
 * Utilitaire de carte Javascript
 * 
 * @todo : Marker draggable
 */

var Kaimite = Kaimite || {};

/**
 * Créé une nouvelle carte
 * @param string target L'ID de l'élément HTML qui va recevoir la carte
 * @param string provider Le nom du fournisseur de carte. Google par défaut
 */
Kaimite.Map = function (target, provider) {
	this.divTarget 		= target;
	this.domTarget		= document.getElementById(this.divTarget);
	this.layerIndex		= 0;
	this.setProvider(provider);	
}

/**
 * Indique le fournisseur de carte
 * @param string provider Google par défaut
 */
Kaimite.Map.prototype.setProvider = function (provider) {
	provider = provider || "Google";
	
	switch ( provider.toLowerCase() ) {
		case 'google':
			this.provider = new Kaimite.Map.GoogleMap(this);
			break;
			
		case 'bing':
			this.provider = new Kaimite.Map.BingMap(this);
			break;
			
		default : 
			throw "Provider inconnu";
			break;
	}
}

/**
 * Definit l'id de l'élement HTML qui va recevoir la carte
 * @param string target
 */
Kaimite.Map.prototype.setTarget = function (target) {
	this.divTarget = target;
}

/**
 * Renvoie l'id de l'élement HTML qui va recevoir la carte
 * @return string
 */
Kaimite.Map.prototype.getTarget = function () {
	return this.divTarget;
}

/**
 * Renvoie l'élement HTML qui va recevoir la carte
 * @return DomElement
 */
Kaimite.Map.prototype.getDomTarget = function () {
	return this.domTarget;
}

/**
 * Définit le type de carte
 * @param string value type de carte : route, satellite, hybride, terrain, a adapter selone le fournisseur
 */
Kaimite.Map.prototype.setMapType = function (value) {
	this.provider.setMapType(value);
}

/**
 * Definit le niveau de Zoom de la carte
 * @param int value
 */
Kaimite.Map.prototype.setMapZoom = function (value) {
	this.provider.setMapZoom(value);
}

/**
 * Definit le centre de la carte
 * @param Kaimite.Map.Point point
 */
Kaimite.Map.prototype.setCenter = function (point) {
	this.provider.setCenter(point);
}

/**
 * Ajoute un marker sur la carte
 * @param Kaimite.Map.Marker marker
 * @param bolean showOnMap Précise sur le marker doit être affiché ou non
 * 
 * @return int renvoie l'index du marker pour y faire référence
 */
Kaimite.Map.prototype.addMarker = function (marker, showOnMap)
{
	if ( marker instanceof Kaimite.Map.Marker ) {
		this.layerIndex ++;
		this.provider.addMarker(marker, this.layerIndex);
		if ( showOnMap ) {
			this.provider.showMarker(this.layerIndex);
		}
		return this.layerIndex;	
	} else {
		throw "Merci de transmetre une instance de Kaimite.Map.Marker";
	}
}

/**
 * Créé un nouveau marker sur la carte
 * @param float lat La latitude du point
 * @param float lng La longitude du point
 * @param string infoBulle code HTML de l'infoBulle
 * @param bolean showOnMap Précise sur le marker doit être affiché ou non
 * 
 * @return int renvoie l'index du marker pour y faire référence
 */
Kaimite.Map.prototype.createMarker = function (lat, lng, infoBulle, showOnMap) {
	var marker = new Kaimite.Map.Marker( new Kaimite.Map.Point(lat, lng), infoBulle );
	return this.addMarker(marker, showOnMap);
}

/**
 * Affiche un marker
 * @param int index l'index du marker renvoyé par la fonction addMarker ou createMarker
 */
Kaimite.Map.prototype.showMarker = function (index) {
	this.provider.showMarker(index);
}

/**
 * Masque un marker
 * @param int index l'index du marker renvoyé par la fonction addMarker ou createMarker
 */
Kaimite.Map.prototype.hideMarker = function (index) {
	this.provider.hideMarker(index);
}

/**
 * Ajoute un evenement sur la carte pour fermer une infobulle au click
 */
Kaimite.Map.prototype.closeInfosBulleOnClick = function () {
	this.provider.closeInfosBulleOnClick();
}

/**
 * Enregistre la clé API de BingMap
 */
Kaimite.Map.prototype.setCredential = function (credential) {
	if ( typeof this.provider.setCredential == "function" ) {
		this.provider.setCredential(credential);
	}
}

/**
 * Affiche / Masque le control du Zoom sur la carte
 */
Kaimite.Map.prototype.displayZoomControl = function (value) {
	this.provider.displayZoomControl(value);
}

/**
 * Affiche / Masque le controle du déplacement sur la carte
 */
Kaimite.Map.prototype.displayPanControl = function (value) {
	this.provider.displayPanControl(value);
}

/**
 * Affiche / Masque l'échelle sur la carte
 */
Kaimite.Map.prototype.displayScale = function (value) {
	if ( typeof this.provider.displayScale == "function" ) {
		this.provider.displayScale(value);
	}
}

/**
 * Affiche / Masque le logo du fournisseur sur la carte
 */
Kaimite.Map.prototype.displayLogo = function (value) {
	if ( typeof this.provider.displayLogo == "function" ) {
		this.provider.displayLogo(value);
	}
}

/**
 * Affiche / Masque le copyright du fournisseur sur la carte
 */
Kaimite.Map.prototype.displayCopyright = function (value) {
	if ( typeof this.provider.displayCopyright == "function" ) {
		this.provider.displayCopyright(value);
	}
}

/**
 * Affiche / Masque le champ de recherche au survol du logo
 * 
 * Spécifique à BingMap
 */
Kaimite.Map.prototype.displaySearchLogo = function (value) {
	if ( typeof this.provider.displaySearchLogo == "function" ) {
		this.provider.displaySearchLogo(value);
	}
}

/**
 * Affiche / Masque le control de StreetView
 */
Kaimite.Map.prototype.displayStreetViewControl = function (value) {
	if ( typeof this.provider.displayStreetViewControl == "function" ) {
		this.provider.displayStreetViewControl(value);
	}
}

/**
 * Affiche / Masque La petite carte dans le coin inf gauche de la carte
 */
Kaimite.Map.prototype.displayOverviewMapControl = function (value) {
	if ( typeof this.provider.displayOverviewMapControl == "function" ) {
		this.provider.displayOverviewMapControl(value);
	}
}

/**
 * Affiche / Masque le control du type de carte (route / satellite / hybride etc.)
 */
Kaimite.Map.prototype.displayMapTypeControl = function (value) {
	if ( typeof this.provider.displayMapTypeControl == "function" ) {
		this.provider.displayMapTypeControl(value);
	}
}

Kaimite.Map.prototype.fitBounds = function (boundPoints) {
	if ( typeof this.provider.fitBounds == "function" ) {
		this.provider.fitBounds(boundPoints);
	}
}

Kaimite.Map.prototype.addPolyline = function (polyLine, showOnMap) {
	if ( typeof this.provider.addPolyline == "function" ) {
		if ( polyLine instanceof Kaimite.Map.Polyline ) {
			this.layerIndex ++;
			this.provider.addPolyline(polyLine, this.layerIndex, showOnMap);
			return this.layerIndex;	
		} else {
			throw "Merci de transmetre une instance de Kaimite.Map.Polyline";
		}
	}
}


Kaimite.Map.prototype.addEvent = function (event_handler, event_function){
	this.provider.addEvent(event_handler, event_function);
}

Kaimite.Map.prototype.getLanLngFromEvent = function (event) {
	return this.provider.getLanLngFromEvent(event);
}

/**
 * Affiche la carte
 */
Kaimite.Map.prototype.show = function () {
	this.provider.show();
}







/**
 * Définit un point géographique
 * 
 * @param lat float Latitude du point
 * @param lng float Longitude du point
 * @param ele float Elevation du point
 */
Kaimite.Map.Point = function (lat, lng, ele) {
	this.lat 	= lat;
	this.lng 	= lng;
	this.ele	= ele;
}








/**
 * Créé un nouveau marker
 * @param Kaimite.Map.Point point Le point géographique du marker
 * @param Kaimite.Map.InfoBulle infoBulle L'infobulle a afficher
 */
Kaimite.Map.Marker = function (point, infoBulle) {
	if ( point instanceof Kaimite.Map.Point ) {
		this.point = point;
	} else {
		throw "Merci de transmettre une instance de Kaimite.Map.Point à création d'un nouveau Marker ";
	}
	
	if ( infoBulle ) {
		if ( infoBulle instanceof Kaimite.Map.Marker.InfoBulle ) {
			this.infoBulle	= infoBulle;
		} else {
			throw "Merci de transmettre une instance de Kaimite.Map.Marker.InfoBulle à création d'un nouveau Marker ";		
		}
	}
}

/**
 * Définit le titre du marker
 * @param string title
 */
Kaimite.Map.Marker.prototype.setTitle = function (title) {
	this.title		= title;
}

/**
 * Définit une icone pour faire un marker personnalisé
 * @param Kaimite.Map.Marker.Icon icon
 */
Kaimite.Map.Marker.prototype.setIcon = function (icon) {
	this.icon		= icon;
}

/**
 * Définit une ombre pour faire un marker personnalisé
 * @param Kaimite.Map.Marker.Shadow shadow
 */
Kaimite.Map.Marker.prototype.setShadow = function (shadow) {
	this.shadow		= shadow;
}

/**
 * Définit la zone cliquable du marker
 * @param Array coord les coordonnées des points de la zone
 * @param string type La type de forme
 */
Kaimite.Map.Marker.prototype.setShape = function (coord, type) {
	this.shape		= {
		coord	: coord,
		type	: type
	};
}

/**
 * Indique si l'on peut déplacer le marker
 */
Kaimite.Map.Marker.prototype.setDraggable = function (value) {
	this.draggable = value;
}

/**
 * Définit le z-index du marker
 * @param int zIndex
 */
Kaimite.Map.Marker.prototype.setZIndex = function (zIndex) {
	this.zIndex		= zIndex;
}


/**
 * Ajoute une infoBulle au marker
 * @param Kaimite.Map.Marker.InfoBulle infoBulle
 */
Kaimite.Map.Marker.prototype.setInfoBulle = function (infoBulle) {
	this.infoBulle	= infoBulle;
}















Kaimite.Map.Marker.Icon = function (src) {
	this.src = src;
}

Kaimite.Map.Marker.Icon.prototype.setSize = function (width, height) {
	this.size = {
		width 	: width,
		height 	: height
	};
}

Kaimite.Map.Marker.Icon.prototype.setOriginPoint = function (x, y) {
	this.originPoint = {
		x 	: x,
		y 	: y
	};
}

Kaimite.Map.Marker.Icon.prototype.setAnchorPoint = function (x, y) {
	this.anchorPoint = {
		x 	: x,
		y 	: y
	};
}
















Kaimite.Map.Marker.Shadow = function (src) {
	this.src = src;
}

Kaimite.Map.Marker.Shadow.prototype.setSize = function (width, height) {
	this.size = {
		width 	: width,
		height 	: height
	};
}

Kaimite.Map.Marker.Shadow.prototype.setOriginPoint = function (x, y) {
	this.originPoint = {
		x 	: x,
		y 	: y
	};
}

Kaimite.Map.Marker.Shadow.prototype.setAnchorPoint = function (x, y) {
	this.anchorPoint = {
		x 	: x,
		y 	: y
	};
}
















/**
 * Créé une infoBulle pour un marker
 * @param string src Le code HTML à afficher dans l'infoBulle
 */
Kaimite.Map.Marker.InfoBulle = function (content) {
	this.content	= content;
}

/**
 * Définit l'événement qui va afficher l'infoBulle
 * @param string eventName
 */
Kaimite.Map.Marker.InfoBulle.prototype.setEvent = function (eventName) {
	this.event	= eventName;
}

/**
 * Indique si l'infoBulle doit être affiché lors de sa création
 * @param bolean visible
 */
Kaimite.Map.Marker.InfoBulle.prototype.setVisible = function (visible) {
	this.visible = visible;
}















Kaimite.Map.Bounds = function () {
	this.points = [];
}

Kaimite.Map.Bounds.prototype.addPoint = function (point) {
	this.points.push(point);
}

Kaimite.Map.Polyline = function () {
	this.points 	= [];
	this.weight		= 1;
	this.opacity	= 1;
	this.color		= "#ff0000";
}

Kaimite.Map.Polyline.prototype.addPoint = function (point) {
	this.points.push(point);
}

Kaimite.Map.Polyline.prototype.setWeight = function (value) {
	this.weight		= parseInt(value, 10);
}

Kaimite.Map.Polyline.prototype.setOpacity = function (value) {
	if ( value > 1 ) {
		value = parseInt(value, 10) / 100;
	}
	this.opacity = value;
}

Kaimite.Map.Polyline.prototype.setColor = function (value) {
	this.color		= value;
}
