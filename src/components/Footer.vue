<template>
<footer class="footer">
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
		<!-- <p><i><?= 'Last updated ' . $lastUpdateDate ?>.</i></p> -->
	</div>
</footer>
</template>

<style scoped>
.footer {
	padding: 30px 2.5% 68px 2.5%;
	background-color: #19181f;
	text-align: center;
	/* height: 100%; */
}
@media (min-width: 576px) { .footer { text-align: left; } }

.footer p, .footer a {
	font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

.footer-legal {
	font-size: 12px;
	color: #444;
	margin: 20px 0 0 0;
	line-height: 1.33;
}
.footer-legal-link { color: #444; }
.footer-legal-link:hover { color: rgba(255,255,255,.75); }

.footer #medias a {
	flex-grow: 0!important;
}
</style>
