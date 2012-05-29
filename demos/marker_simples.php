<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8" />

		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title>Marker Simple</title>
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
				<h1>Marker simple</h1>
				<p class="lead">Exemple de carte avec un marker standard GoogleMap / Bing</p>
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
	theMarker	= new Kaimite.Map.Marker( centerPoint );	
	
//--> Infos sur le type de carte
theMap.setMapType('route');
theMap.setMapZoom(10);
theMap.setCenter(centerPoint);

//--> Spécifique pour BingMap
theMap.setCredential('AoCPpVjOicyw2E28Armf-Wq9Iez9chUQsaASkWdTlp-dtaSbnMkU_5Id6ZiDB9qG');

//--> Generation de la carte
theMap.show();

//--> Ajout et affichage du marker sur la carte
markerIndex = theMap.addMarker(theMarker, true);
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
				theMarker	= new Kaimite.Map.Marker( centerPoint );
				
			//--> Infos sur le type de carte
			theMap.setMapType('route');
			theMap.setMapZoom(10);
			theMap.setCenter(centerPoint);
			
			//--> Spécifique pour BingMap
			theMap.setCredential('AoCPpVjOicyw2E28Armf-Wq9Iez9chUQsaASkWdTlp-dtaSbnMkU_5Id6ZiDB9qG');
			
			//--> Generation de la carte
			theMap.show();
			
			//--> Ajout et affichage du marker sur la carte
			markerIndex = theMap.addMarker(theMarker, true);
		}
		
		$('select').on("change", initMap);
		
		initMap();
		prettyPrint();
		// ]]>
		</script>
	</body>
</html>
