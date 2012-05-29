<?php

//--> Traitement du fichier GPX
$xml = simplexml_load_string(file_get_contents(dirname(__FILE__) . "/trace.gpx"));

//--> Recuperation des points
$points = array();
foreach ( $xml -> trk -> trkseg -> trkpt AS $point ) {
	$points[]	= array(
		'lat'	=> (string) $point -> attributes() -> lat,
		'lng'	=> (string) $point -> attributes() -> lon,
	);
}

$bounceTrack = array(
	array(
		'lat'	=> (string) $xml -> metadata -> bounds -> attributes() -> maxlat,
		'lng'	=> (string) $xml -> metadata -> bounds -> attributes() -> maxlon
	),
	array(
		'lat'	=> (string) $xml -> metadata -> bounds -> attributes() -> minlat,
		'lng'	=> (string) $xml -> metadata -> bounds -> attributes() -> minlon
	),
);
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8" />

		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title>PolyLines</title>
		<?php
		include(dirname(__FILE__) . "/head.php");
		?>
		
		<style type="text/css">
			.mapCanvas img {
				max-width: none;
			}
		</style>
	</head>

	<body>
		<?php include(dirname(__FILE__) . "/menu.inc.php"); ?>

		<div class="container">
			<header class="subhead" id="overview" style="padding-top: 45px; padding-bottom: 15px;">
				<h1>PolyLines</h1>
				<p class="lead"></p>
			</header>
			
			<div class="well">
				<div id="mapTarget" style="width: 100%; height: 600px;" class="mapCanvas"></div>
			
				<form class="form-horizontal" style="margin-top: 25px;">
					<label for="provider">Fournisseur de carte : </label>
					<select name="provider" id="provider">
						<option value="google" selected="selected">GoogleMap</option>
						<option value="bing">BingMap</option>
					</select>
				</form>

<pre class="prettyprint" style="padding: 10px;">
var provider 	= $("#provider").val(),
	theMap 		= new Kaimite.Map("mapTarget", provider),
	centerPoint	= new Kaimite.Map.Point(43.28487, 5.37896),
	myBounds 	= new Kaimite.Map.Bounds(),
	polyLine	= new Kaimite.Map.Polyline(),
	trackPoints	= [{"lat":"43.211410576477647","lng":"5.52409672178328"},{"lat":"43.211265485733747","lng":"5.52387828938663"},{"lat":"43.211243189871311","lng":"5.523708639666438"}, ...], // Liste des points du trace
	nbPoints	= trackPoints.length,
	boundPoints	= [{"lat":"43.237347370013595","lng":"5.52409672178328"},{"lat":"43.200193326920271","lng":"5.34940998069942"}]; // Points pour le Bounce
	
//--> Ajout des points au polyline
for ( var i = 0; i < nbPoints; i++ ) {
	polyLine.addPoint( new Kaimite.Map.Point( trackPoints[i].lat, trackPoints[i].lng ) );
}

//--> Configuration du polyline
polyLine.setColor("#7fc3c4");
polyLine.setOpacity(1);
polyLine.setWeight(3);

//--> Infos sur le type de carte
theMap.setMapType('route');
theMap.setMapZoom(10);
theMap.setCenter(centerPoint);

//--> Spécifique pour BingMap
theMap.setCredential('AoCPpVjOicyw2E28Armf-Wq9Iez9chUQsaASkWdTlp-dtaSbnMkU_5Id6ZiDB9qG');

//--> Generation de la carte
theMap.show();

//--> Ajout du polyline sur la carte
theMap.addPolyline(polyLine, true);

//--> Ajout des points dans le Bounds
myBounds.addPoint(new Kaimite.Map.Point(boundPoints[0].lat, boundPoints[0].lng));
myBounds.addPoint(new Kaimite.Map.Point(boundPoints[1].lat, boundPoints[1].lng));

//--> Mise à jour du zoom de la carte
theMap.fitBounds(myBounds);
</pre>								
		
		
		<!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="js/libs/jquery.min.js"><\/script>')</script>
		
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyARDH1fblCs4p_EZwppOCjiuSHglm4hRuY&sensor=false"></script>
		<script type="text/javascript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0" charset="UTF-8"></script>
		
		<script type="text/javascript" src="../js/kaimite.map.js"></script>
		<script type="text/javascript" src="../js/kaimite.map.provider.googlev3.js"></script>
		<script type="text/javascript" src="../js/kaimite.map.provider.bing.js"></script>
		<script type="text/javascript" src="../js/bootstrap.min.js"></script>
		<script type="text/javascript" src="../js/google-code-prettify/prettify.js"></script>
		
		<script type="text/javascript">
		//<![CDATA[
		function initMap () {
			$("#mapTarget").html("");
			var provider 	= $("#provider").val(),
				theMap 		= new Kaimite.Map("mapTarget", provider),
				centerPoint	= new Kaimite.Map.Point(43.28487, 5.37896),
				myBounds 	= new Kaimite.Map.Bounds(),
				polyLine	= new Kaimite.Map.Polyline(),
				trackPoints	= <?= json_encode($points) ?>,
				nbPoints	= trackPoints.length,
				boundPoints	= <?= json_encode($bounceTrack) ?>;
				
			//--> Ajout des points au polyline
			for ( var i = 0; i < nbPoints; i++ ) {
				polyLine.addPoint( new Kaimite.Map.Point( trackPoints[i].lat, trackPoints[i].lng ) );
			}
			
			//--> Configuration du polyline
			polyLine.setColor("#7fc3c4");
			polyLine.setOpacity(1);
			polyLine.setWeight(3);
			
			//--> Infos sur le type de carte
			theMap.setMapType('terrain');
			theMap.setMapZoom(10);
			theMap.setCenter(centerPoint);
			
			//--> Spécifique pour BingMap
			theMap.setCredential('AoCPpVjOicyw2E28Armf-Wq9Iez9chUQsaASkWdTlp-dtaSbnMkU_5Id6ZiDB9qG');

			//--> Generation de la carte
			theMap.show();
			
			//--> Ajout du polyline sur la carte
			theMap.addPolyline(polyLine, true);
			
			//--> Ajout des points dans le Bounds
			myBounds.addPoint(new Kaimite.Map.Point(boundPoints[0].lat, boundPoints[0].lng));
			myBounds.addPoint(new Kaimite.Map.Point(boundPoints[1].lat, boundPoints[1].lng));
			
			//--> Mise à jour du zoom de la carte
			theMap.fitBounds(myBounds);
		}
		
		$('select').on("change", initMap);
		
		initMap();
		prettyPrint();
		// ]]>
		</script>
	</body>
</html>
