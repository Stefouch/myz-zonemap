<?php
$lastUpdate = filemtime(__DIR__ . '/.');
$lastUpdateDate = date('F dS, Y', $lastUpdate);
?>

<footer class="footer" style="margin-top: 10rem;">
	<div id="medias" class="d-flex flex-wrap justify-content-center">
		<!--<a class="btn btn-outline-light btn-sm m-1" href="http://forum.mtgtreachery.net/" target="_blank"><i class="far fa-comments"></i> Forum</a>-->
		<a class="btn btn-outline-light btn-sm m-1" href="https://discord.gg/aXYnCCd" target="_blank"><i class="fab fa-discord"></i> Discord</a>
		<a class="btn btn-outline-light btn-sm m-1" href="http://www.fb.com/Stefouch" target="_blank"><i class="fab fa-facebook-square"></i> Facebook</a>
		<!--<a class="btn btn-outline-light btn-sm m-1 disabled" href="#"><i class="fab fa-twitter"></i> Twitter</a>-->
		<a class="btn btn-outline-light btn-sm m-1" href="javascript:alert('Hit me up on Discord: Stefouch#5202');"><i class="far fa-envelope"></i> E-mail</a>
	</div>
	<div class="footer-legal">
		<p>This a fan project! Made by a MYZ fan, for MYZ fans.</p>
		<p>The literal and graphical information presented on this site about <i>Mutant: Year Zero</i>, including the textures, is copyright <i>Fria Ligan</i> / <i>Free League Publishing</i>. This website is not produced by, endorsed by, supported by, or affiliated with <i>Fria Ligan</i>.</p>
		<p>Symbols are courtesy of <a class="footer-legal-link" href="http://game-icons.net/" target="_blank">game-icons.net</a>.</p>
		<!--<p>All other content © 2019 MtG Treachery, LLC.</p>-->
		<p><i><?= 'Last updated ' . $lastUpdateDate ?>.</i></p>
	</div>
</footer>