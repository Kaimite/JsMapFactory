<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8" />

		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title>Controls sur la carte</title>
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
				<h1>Controls sur la carte</h1>
				<p class="lead">Exemple de carte avec les différents controls possibles</p>
			</header>
			
			<div class="well">
				<div id="mapTarget" style="width: 100%; height: 600px;" class="mapCanvas"></div>
			
				<form class="form-horizontal" style="margin-top: 25px;">
					<div class="control-group">
						<label class="control-label" for="provider">Fournisseur de carte : </label>
						<div class="controls">
							<select name="provider" id="provider">
								<option value="google" selected="selected">GoogleMap</option>
								<option value="bing">BingMap</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="optionsCheckboxList">Controls</label>
						<div class="controls">
							<label class="checkbox">
								<input type="checkbox" name="displayZoomControl" value="1">
								<code>theMap.displayZoomControl();</code>
							</label>
							
							<label class="checkbox">
								<input type="checkbox" name="displayPanControl" value="1">
								<code>theMap.displayPanControl();</code>
							</label>
							
							<label class="checkbox">
								<input type="checkbox" name="displayScale" value="1">
								<code>theMap.displayScale();</code>
							</label>
							
							<label class="checkbox">
								<input type="checkbox" name="displayStreetViewControl" value="1">
								<code>theMap.displayStreetViewControl();</code>
							</label>
							
							<label class="checkbox">
								<input type="checkbox" name="displayOverviewMapControl" value="1">
								<code>theMap.displayOverviewMapControl();</code> (carte dans le coin inférieur droit sur GoogleMap)
							</label>
							
							<label class="checkbox">
								<input type="checkbox" name="displayMapTypeControl" value="1">
								<code>theMap.displayMapTypeControl();</code>
							</label>
							
							<h3>Controls spécifique de BingMap</h3>
							<label class="checkbox">
								<input type="checkbox" name="displayLogo" value="1">
								<code>theMap.displayLogo();</code>
							</label>
							
							<label class="checkbox">
								<input type="checkbox" name="displayCopyright" value="1">
								<code>theMap.displayCopyright();</code>
							</label>
							
							<label class="checkbox">
								<input type="checkbox" name="displaySearchLogo" value="1">
								<code>theMap.displaySearchLogo();</code>
							</label>
							<p class="help-block">Sur BingMap <code>theMap.displayZoomControl();</code>, <code>theMap.displayPanControl();</code>, <code>theMap.displayMapTypeControl();</code> agissent sur le même paramêtre, Si l'un est sur <code>false</code> rien ne s'affichera !</p>
						</div>
					</div>
				</form>

<pre class="prettyprint" style="padding: 10px;">
var provider 	= $("#provider").val(),
	theMap 		= new Kaimite.Map("mapTarget", provider),
	centerPoint	= new Kaimite.Map.Point(43.28487, 5.37896);	
	
//--> Infos sur le type de carte
theMap.setMapType('route');
theMap.setMapZoom(10);
theMap.setCenter(centerPoint);

//--> Spécifique pour BingMap
theMap.setCredential('AoCPpVjOicyw2E28Armf-Wq9Iez9chUQsaASkWdTlp-dtaSbnMkU_5Id6ZiDB9qG');

theMap.displayZoomControl(true);
theMap.displayPanControl(true);
theMap.displayScale(true);
theMap.displayStreetViewControl(true);
theMap.displayOverviewMapControl(true);
theMap.displayMapTypeControl(true);

//--> Spécifiques à Bing
theMap.displayLogo(true);
theMap.displayCopyright(true);
theMap.displaySearchLogo(true);

//--> Generation de la carte
theMap.show();
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
			var provider 					= $("#provider").val(),
				theMap 						= new Kaimite.Map("mapTarget", provider),
				centerPoint					= new Kaimite.Map.Point(43.28487, 5.37896),
				displayZoomControl			= false,
				displayPanControl			= false,
				displayScale				= false,
				displayOverviewMapControl	= false,
				displayMapTypeControl		= false,
				displayLogo					= false,
				displayCopyright			= false,
				displaySearchLogo			= false,
				displayStreetViewControl	= false;
				
			//--> Infos sur le type de carte
			theMap.setMapType('route');
			theMap.setMapZoom(10);
			theMap.setCenter(centerPoint);
			
			//--> Spécifique pour BingMap
			theMap.setCredential('AoCPpVjOicyw2E28Armf-Wq9Iez9chUQsaASkWdTlp-dtaSbnMkU_5Id6ZiDB9qG');
			
			
			//--> Controls de la carte
			if ( $('input[name="displayZoomControl"]').is(":checked") ) {
				displayZoomControl = true;
			}
			
			if ( $('input[name="displayPanControl"]').is(":checked") ) {
				displayPanControl = true;
			}
			
			if ( $('input[name="displayScale"]').is(":checked") ) {
				displayScale = true;
			}
			
			if ( $('input[name="displayStreetViewControl"]').is(":checked") ) {
				displayStreetViewControl = true;
			}
			
			if ( $('input[name="displayOverviewMapControl"]').is(":checked") ) {
				displayOverviewMapControl = true;
			}
			
			if ( $('input[name="displayMapTypeControl"]').is(":checked") ) {
				displayMapTypeControl = true;
			}
			
			if ( $('input[name="displayLogo"]').is(":checked") ) {
				displayLogo = true;
			}
			
			if ( $('input[name="displayCopyright"]').is(":checked") ) {
				displayCopyright = true;
			}
			
			if ( $('input[name="displaySearchLogo"]').is(":checked") ) {
				displaySearchLogo = true;
			}
			
			
			
			theMap.displayZoomControl(displayZoomControl);
			theMap.displayPanControl(displayPanControl);
			theMap.displayScale(displayScale);
			theMap.displayStreetViewControl(displayStreetViewControl);
			theMap.displayOverviewMapControl(displayOverviewMapControl);
			theMap.displayMapTypeControl(displayMapTypeControl);
			
			//--> Spécifiques à Bing
			theMap.displayLogo(displayLogo);
			theMap.displayCopyright(displayCopyright);
			theMap.displaySearchLogo(displaySearchLogo);
			
			//--> Generation de la carte
			theMap.show();
			
		}
		
		$('select, input[type="checkbox"]').on("change", initMap);
		
		initMap();
		prettyPrint();
		// ]]>
		</script>
	</body>
</html>
