<?php
# PHP Session
session_start();

# Zonemap version
$zonemapVersionNumber = "0.60";
$zonemapVersionDate = date('ymd.Hs', filemtime('./index.php'));
$zonemapVersionLog = [
	'0.60: Total revamp.',
	'0.56: Fixed a compatibility issue with web browsers other than Chrome, which was introduced with the last fix.',
	'0.55: Fixed various map download/upload bugs.',
];

# Checks the presence of a Map stored in the PHP session.
// $hasPreviousMap = isset($_SESSION['zonemap']);

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

<body class="bg-index">

<!-- MAIN CONTAINER ======================================================= -->
<div id="main" class="container">

	<div style="text-align: center;">
		<img id="myz-logo" src="./images/myz-title-white.png" alt="MYZ Logo">
	</div>

	<h1>Find My Path</h1>

	<p>Welcome fellow Mutant,
	<br />Are you lost in the Zone? You're chased by a group of <i>Zone Ghouls</i> and you can't remember the way back to your Ark? Or maybe you are looking after Eden? Don't worry, you find the right place for help!</p>
	<p><b>Mutant: Find My Path</b> is a web application for managing the Map of the Zone for the <i>Mutant:&nbsp;Year&nbsp;Zero</i> tabletop roleplaying game.</p>

	<div class="map-buttons">
		<a id="new-map" class="btn btn-lg btn-outline-light" href="#new-map-panel"><i class="fas fa-file"></i>Create a new Map</a>
		<a id="open-map" class="btn btn-lg btn-outline-light" href="#open-map-panel"><i class="fas fa-folder-open"></i>Open an existing Map</a>
		<a id="previous-map" class="btn btn-lg btn-outline-light" style="display: none;" href="./zonemap.php"><i class="fas fa-road"></i>Load last Map</a>
	</div>

	<h5>Notifications</h5>

	<div class="alert alert-success mb-1"><i class="fas fa-check-square"></i> Fully tested web browsers include: Google Chrome, Mozilla Firefox, and Safari (both on desktops and smartphones).</div>

	<div class="alert alert-warning mb-1"><i class="fas fa-exclamation-triangle"></i> Development in progress! Fonctionalities are subject to evolve. Bugs are not impossible. If you're experiencing some weird behavior, please report it there: <a href="http://git" target="_blank">bug report</a>.</div>

	<div class="alert alert-danger mb-1"><i class="fas fa-times-circle"></i> Not compatible with Internet Explorer.</div>

	<h5>Build</h5>	
	<p class="ml-4"><b><?= $zonemapVersionNumber ?></b>.<?= $zonemapVersionDate ?></p>

	<h5>Version Log</h5>
	<p>
		<?php
		foreach ($zonemapVersionLog as $entry) {
			echo '<p class="ml-4">' . $entry . '</p>';
		}
		?>
	</p>

</div><!--/.Container-->


<!-- NEW MAP PANEL ======================================================== -->
<div id="new-map-panel" class="modal-panel">

	<div class="modal-content">
		<a class="modal-close" href="#" title="Close">&times;</a>

		<h2>Create a new Map</h2>
		<p>Choose the dimensions of the Zone and hit «&nbsp;Create&nbsp;». Beware that the width and the height of the map cannot be changed afterwards.</p>

		<form action="./zonemap.php" method="POST">

			<div class="d-flex flex-md-column flex-row flex-wrap align-items-end align-items-md-start">
				<div class="d-flex flex-column flex-md-row">
					<label for="zonemap-width" style="width: 80px;">Width</label>
					<input type="number" name="zonemap-width" id="zonemap-width" min="1" max="30" value="30" title="Map's width" />
				</div>
				<div class="d-flex flex-column flex-md-row">
					<label for="zonemap-height" style="width: 80px;">Height</label>
					<input type="number" name="zonemap-height" id="zonemap-height" min="1" max="26" value="18" title="Map's Height" />
				</div>

				<input type="submit" id="new-map-btn" value="Create" style="width: 80px; margin-top: 1rem;" />
			</div>

		</form>
	</div>

</div>

<!-- OPEN MAP PANEL ======================================================= -->
<div id="open-map-panel" class="modal-panel">

	<div class="modal-content">
		<a class="modal-close" href="#" title="Close">&times;</a>

		<h2>Open an existing Map</h2>
		<p>Choose a map file on your device and hit «&nbsp;Open&nbsp;».</p>

		<form action="./zonemap.php" method="POST">

			<div class="d-flex flex-column">
				<!-- MAX_FILE_SIZE must precede the file input field -->
				<input type="hidden" name="MAX_FILE_SIZE" value="5000000" />
				<!-- Name of input element determines name in $_FILES array -->
				<input type="file" name="zonemap-file" id="zonemap-file" accept=".json, application/json" style="margin-right: 0;" />
				<!-- <label for="zonemap-file">Choose a map file</label> -->
				<input type="submit" id="open-map-btn" value="Open" style="width: 80px; margin-top: 1rem;" />
			</div>

		</form>
	</div>

</div>


<!-- FOOTER =============================================================== -->
<?php include_once './zonemap-footer.php' ?>

<!-- SCRIPTS ============================================================== -->
<!-- jQuery --><script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<!-- ZoneMap Class --><?= getJS('./scripts/zonemap.min.js') ?>
<!-- Zonemap Storage --><?= getJS('./scripts/ZonemapStorage.js') ?>

<script type="text/javascript">
	// Shows the "previous-map" button if it exists.
	if (ZonemapStorage.get() !== null) $('#previous-map').show();

	// ON DOCUMENT READY
	$(function() {
		// MODAL PANELS
		$('#new-map').on('click', function(e) {
			e.preventDefault();
			$('#new-map-panel').show();
		});
		$('#open-map').on('click', function(e) {
			e.preventDefault();
			$('#open-map-panel').show();
		});
		$('.modal-close').on('click', function(e) {
			e.preventDefault();
			$('#new-map-panel').hide();
			$('#open-map-panel').hide();
		});

		// NEW MAP
		$('#new-map-btn').on('click', function(e) {
			e.preventDefault();
			window.location.href = './zonemap.php?new=true';
		});

		// UPLOAD MAP
		$('#open-map-btn').on('click', function(e) {
			e.preventDefault();
			const fileInput = $('#zonemap-file')[0];
			const loaded = ZonemapStorage.load(fileInput);
			if (loaded) window.location.href = './zonemap.php';
		});
	});
</script>

</body>
</html>