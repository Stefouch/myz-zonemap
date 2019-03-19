<?php
function getCSS($css) {
	$filemtime = filemtime(dirname(__FILE__) . $css);
	return '<link rel="stylesheet" type="text/css" href="' . $css . '?' . $filemtime . '">' . PHP_EOL;
}
?>

<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="author" content="Stefouch">

<!-- Bootstrap CSS --
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<!-- jQuery.UI CSS --
<link rel="stylesheet" href="./styles/jquery-ui.min.css">
<link rel="stylesheet" href="./styles/jquery-ui.theme.min.css">
<link rel="stylesheet" href="./styles/jquery-ui.structure.min.css">

<!-- FontAwesome CSS -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

<!-- Treachery CSS -->
<?= getCSS('./styles/core.css') ?>
<?= getCSS('./styles/zonemap.css') ?>

<!-- Favicon -->
<!-- For IE 9 and below. ICO should be 32x32 pixels in size -->
<!--[if IE]><link rel="shortcut icon" href="/images/favicon.ico"><![endif]-->
<meta name="msapplication-square310x310logo" content="./images/myz-d6.png">
<link rel="icon" type="image/x-icon" href="./images/favicon.ico">
<!-- Touch Icons - iOS and Android 2.1+ 180x180 pixels in size. --> 
<link rel="apple-touch-icon" href="./images/myz-d6.png">
<link rel="apple-touch-icon-precomposed" href="./images/myz-d6.png">
<meta name="apple-mobile-web-app-title" content="MYZ Zone Map">
<!-- Firefox, Chrome, Safari, IE 11+ and Opera. 192x192 pixels in size. -->
<link rel="icon" sizes="192x192" href="./images/myz-d6.png">

<!-- Theme color for Chrome, Firefox OS and Opera -->
<meta name="theme-color" content="#281225">