
<?php 
    // check if the file is loaded without frame an include other things
    $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];

    if (strpos($url,'mod-viewport-layer') !== false) {
    ?>
        <script src="app/js/bundle.js" type="text/javascript"></script>

        <link rel="stylesheet" type="text/css" href="dist/main.css">
        <div class="background" style="background:#fff; width: 100vw; height: 100vh; position: absolute; z-index: -1"></div>
    <?php
    } else {

    }
?>

<div class='mod-viewport-layer mod-layer'>
    <h2>Gib mir einfach mehr SPACE!</h2>
    <p>Das hier ist eine Portfolio-Website und um Referenzen sinnvoll bewerten zu können sollte ein Viewport bzw. Gerät mit mind. 1280 × 720 px verwendet werden.</p>
    <p><strong>Alternativen:</strong></p>
    <p>
        <div class="contact">
            <a href='https://www.xing.com/profile/Johannes_Buehl3/' target="_blank" class="icon-contact">
            <img src="app/img/icons/icon-xing-colbrand-@2x.svg" alt="Verlinkung zu Xing">
            </a>
            <a href='https://www.linkedin.com/in/johannes-b%C3%BChl-96778164/' target="_blank" class="icon-contact">
            <img src="app/img/icons/icon-linkedin-colbrand-@2x.svg" alt="Verlinkung zu linkedin">
            </a>
            <a href='mailto:jb@jbuehl.com' target="_blank" class="icon-contact">
            <img src="app/img/icons/icon-mail-colbrand-@2x.svg" alt="E-Mail-Adresse">
            </a>
        </div>
    </p>
    <a href="#" class="link-button">Ist mir alles egal, ich will diese Website jetzt sehen!</a>
    <a href="#" class="link-close"><img src="app/img/icons/icon-close.svg" alt="Close-Icon" ></a>
</div>