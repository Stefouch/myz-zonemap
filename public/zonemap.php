<?php
# PHP Session
session_start();

function getJS($js) {
	$filemtime = filemtime(dirname(__FILE__) . $js);
	return '<script type="text/javascript" language="javascript" src="' . $js . '?' . $filemtime . '"></script>' . PHP_EOL;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>

<title>MYZ: Find My Path</title>
<?php include_once './zonemap-header.php' ?>

</head>
<body>

<!-- NAVBAR =============================================================== -->
<?php include_once './zonemap-navbar.php' ?>

<!-- APP ================================================================== -->
<div id="zonescreen">
	<h1>Hello World</h1>
</div>

<!-- SCRIPTS ============================================================== -->
<!-- jQuery --><script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<!-- ZoneMap Class --><?= getJS('./scripts/zonemap.min.js') ?>
<!-- Zonemap Storage --><?= getJS('./scripts/ZonemapStorage.js') ?>

<!-- development version, includes helpful console warnings -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script type="text/javascript">
	/* $(window).resize(function(e) {
		const winH = $(window).height();
		const navH = $('#navbar-myz').height();
		$('#zonescreen').css({ height: `${winH - navH}px`})
	}); */
</script>

<script type="text/javascript">
	const zm = new YZ.ZoneMap();
	zm.setNewSector('A01');
	zm.setNewSector('B02');
	zm.setNewSector('C03');

	const vm = new Vue({
		el: '#app',
		data: {
			zonemapChanges: 1,
			zonemap: zm,
		},
		methods: {
			toArray(dataSet) {
				return Array.from(dataSet);
			}
		}
	});

	Vue.component('navbar')
</script>

<script type="text/javascript">
	// Closing warning.
	if (!true) {
		window.addEventListener('beforeunload', function(e) {
			e.preventDefault();
			e.returnValue = 'Are you sure you want to quit?';
		});
	}
</script>

</body>
</html>