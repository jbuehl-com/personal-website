
<?php 
    // check if the file is loaded without frame an include other things
    $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];

    if (strpos($url,'mod-tools') !== false) {
    ?>
        <script src="dist/bundle.js" type="text/javascript"></script>

        <link rel="stylesheet" type="text/css" href="dist/main.css">
        <div class="background" style="background:#fff; width: 100vw; height: 100vh; position: absolute; z-index: -1"></div>
    <?php
    } else {

    }
?>

<div class='mod-special mod-tool'>
    <div class="tool-chart">
        <div class="chart-bar bar-grafikdesign">
        </div>
        <div class="chart-bar bar-grafikdesign-text-pd">
            <div class="bar-text">
                Produkt Design
            </div>
        </div>
        <div class="chart-bar bar-grafikdesign-text-gd">
            <div class="bar-text">
                Grafik Design
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-ps">
            <div class="bar-text">
                PS
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-ai">
            <div class="bar-text">
                AI
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-id">
            <div class="bar-text">
                ID
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-an">
            <div class="bar-text">
                AN
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-ui">
            <div class="bar-text">
                UI
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-framer">
            <div class="bar-text">
                framer
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-ux">
            <div class="bar-text">
                UX
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-sketch">
            <div class="bar-text">
                sketch
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-figma">
            <div class="bar-text">
                figma
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-principle">
            <div class="bar-text">
                principle
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-html">
            <div class="bar-text">
                HTML / CSS / JS
            </div>
        </div>
        <div class="chart-bar chart-bar-small bar-gsap">
            <div class="bar-text">
                GSAP
            </div>
        </div>
        <div class="chart-scale"></div>
        <div class="chart-labels">
            <div class="chart-label-item">2006</div>
            <div class="chart-label-item">2007</div>
            <div class="chart-label-item">2008</div>
            <div class="chart-label-item">2009</div>
            <div class="chart-label-item">2010</div>
            <div class="chart-label-item">2011</div>
            <div class="chart-label-item">2012</div>
            <div class="chart-label-item">2013</div>
            <div class="chart-label-item">2014</div>
            <div class="chart-label-item">2015</div>
            <div class="chart-label-item">2016</div>
            <div class="chart-label-item">2017</div>
            <div class="chart-label-item">2018</div>
            <div class="chart-label-item">2019</div>
            <div class="chart-label-item">2020</div>
        </div>
    </div>
</div>