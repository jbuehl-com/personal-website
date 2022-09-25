<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Johannes Bühl –&nbsp;Portfolio</title>
  <link rel="stylesheet" type="text/css" href="dist/main.css">
  <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
  <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/manifest.json">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
  <meta name="theme-color" content="#ffffff">
</head>
<body id="jb">
<?php
  // Loading all content via xml
  if (file_exists('pages.xml')) {
    $xmlPages = simplexml_load_file("pages.xml");
  } else {
    exit('pages.xml konnte nicht geöffnet werden.');
  }
?>
<header>
  <div id="logo"><a href="https://jbuehl.com/" class="nav-item-ref link-textlink" data-link="0">JB <span>Johannes Bühl</span></a></div>
  <div id="pag-titles">
    <div class="pag-title pag-title--prev">Page Title Previous</div>
    <div class="pag-title pag-title--current">Page Title Current</div>
    <div class="pag-title pag-title--next">Page Title Next</div>
  </div>
</header>


<div id="navigation">
  <div id="pagination">
      <div class="pgi-current">1</div>
      <hr>
      <div class="pgi-total">XX</div>
  </div>

  <div id="nav-menu-button">
    <div class="icon">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="button-text">Menu Button</div>
  </div>

  <nav id="nav-main">
    <ul>
      <?php
        $navindex = -1;
        $navtotal = count($xmlPages) + 1;
        foreach($xmlPages->children() as $page) {
          $navindex++;
          ?>
          <li class='nav-item nav-item-<?php echo $navindex ?>' style='transform: rotate(-<?php echo 360 / $navtotal * $navindex ?>deg)'>
            <a href='#<?php echo $page->attributes()->id ?>' data-link='<?php echo $navindex ?>' class='nav-item-ref'>
              <?php echo $page->pagetitle ?>
              <div class="nav-item-page">
                <?php echo $navindex + 1 ?>
              </div>
            </a>
          </li>
        <?php } 
          $navindex++;
        ?>
        <li class='nav-item nav-item-contact nav-item-<?php echo $navindex ?>' style='transform: rotate(-<?php echo 360 / $navtotal * $navindex ?>deg)'>
          <a href='https://www.xing.com/profile/Johannes_Buehl3/' target="_blank">
            <img src="app/img/icons/icon-xing.svg" alt="Verlinkung zu Xing">
          </a>
          <a href='https://www.linkedin.com/in/johannes-b%C3%BChl-96778164/' target="_blank">
            <img src="app/img/icons/icon-linkedin.svg" alt="Verlinkung zu linkedin">
          </a>
          <a href='mailto:jb@jbuehl.com' target="_blank">
            <img src="app/img/icons/icon-mail.svg" alt="E-Mail-Adresse">
          </a>
        </li>
    </ul>
  </nav>

  <div id="nav-nextprev">
    <a href="#" class="nav nav--next">
      <div class="nav-text">Lebenslauf</div>
      <div class="nav-line"></div>
    </a>
    <a href="#" class="nav nav--prev">
      <div class="nav-text">Previous</div>
      <div class="nav-line"></div>
    </a>
  </div>
</div>


<script src="dist/bundle.js" type="text/javascript"></script>
<?php include "mod-preloader.php" ?>
<?php include "mod-viewport-layer.php" ?>

<div class="el-head-line"></div>

<section class="mod-reflegend">
  <div class="work">work</div>
  <div class="time">time</div>
  <div class="agency">agency</div>
</section>


<div class="pages">

  <?php
    $pagindex = -1;
    foreach($xmlPages->children() as $page) {
      $pagindex++; ?>
      <div 
        class='page page--is-nr-<?php echo $pagindex ?>' 
        id='<?php echo $page->attributes()->id ?>' 
        data-pagetype='<?php echo $page->pagetype ?>' 
        data-pagecolor='<?php echo $page->pagecolor ?>' 
        data-pagebackground='<?php echo $page->pagebackground ?>' 
        data-pagetypecolor='<?php echo $page->pagetypecolor ?>' 
        data-pagetitle='<?php echo $page->pagetitle ?>'>
      
        <!-- start: pagcontent --> 
        <div class='pag-content pag--is-<?php echo $page->pagetype ?>'>

          <?php if ($page->pagetype == 'intro') { ?>
            <div class='mod-avatar'><img src='app/img/<?php echo $page->contentimg->image ?>'></div>
          <?php } ?>

          <?php if ($page->pagetype == 'special-tool') { ?>
            <!-- start: special-modul tools -->
            <?php include "mod-tools.php" ?>
            <!-- end: special-modul tools -->
          <?php } ?>

          <?php if (isset($page->contentimg)) { ?>
            <!-- start: pagcontent-image --> 
            <?php if ($page->contentimg->attributes()->contenttype == 'ref-mobile-3') { ?>
            <div class='mod-ref ref-mobile-3'>
              <div class='screen screen-01'>
                <figure>
                  <?php if ($page->contentimg->ref01path->attributes()->type == 'video') { ?>
                    <video id="video" playsinline="" muted="" autoplay="" loop="" style="background-image:url('app/img/<?php echo $page->contentimg->ref01pathcover ?>')" data-silent="false" src="app/img/<?php echo $page->contentimg->ref01path ?>"></video>
                  <?php } else { ?>
                    <img class='screen' src='app/img/<?php echo $page->contentimg->ref01path ?>'>
                  <?php } ?>
                  <figcaption><?php echo $page->contentimg->ref01figcaption ?></figcaption>
                </figure>
              </div>
              <div class='screen screen-02'>
                <figure>
                  <?php if ($page->contentimg->ref02path->attributes()->type == 'video') { ?>
                    <video id="video" playsinline="" muted="" autoplay="" loop="" style="background-image:url('app/img/<?php echo $page->contentimg->ref02pathcover ?>')" data-silent="false" src="app/img/<?php echo $page->contentimg->ref02path ?>"></video>
                  <?php } else { ?>
                    <img class='screen' src='app/img/<?php echo $page->contentimg->ref02path ?>'>
                  <?php } ?>                
                  <figcaption><?php echo $page->contentimg->ref02figcaption ?></figcaption>
                </figure>
              </div>
              <div class='screen screen-03'>
                <figure>
                  <?php if ($page->contentimg->ref03path->attributes()->type == 'video') { ?>
                    <video id="video" playsinline="" muted="" autoplay="" loop="" style="background-image:url('app/img/<?php echo $page->contentimg->ref03pathcover ?>')" data-silent="false" src="app/img/<?php echo $page->contentimg->ref03path ?>"></video>
                  <?php } else { ?>
                    <img class='screen' src='app/img/<?php echo $page->contentimg->ref03path ?>'>
                  <?php } ?>                
                  <figcaption><?php echo $page->contentimg->ref03figcaption ?></figcaption>
                </figure>
              </div>
            </div>
            <?php } ?>

            <?php if ($page->contentimg->attributes()->contenttype == 'ref-mobile-2') { ?>
            <div class='mod-ref ref-mobile-2'>
              <div class='screen screen-01'>
                <figure>
                  <?php if ($page->contentimg->ref01path->attributes()->type == 'video') { ?>
                    <video id="video" playsinline="" muted="" autoplay="" loop="" style="background-image:url('app/img/<?php echo $page->contentimg->ref01pathcover ?>')" data-silent="false" src="app/img/<?php echo $page->contentimg->ref01path ?>"></video>
                  <?php } else { ?>
                    <img class='screen' src='app/img/<?php echo $page->contentimg->ref01path ?>'>
                  <?php } ?>
                  <figcaption><?php echo $page->contentimg->ref01figcaption ?></figcaption>
                </figure>
              </div>
              <div class='screen screen-02'>
                <figure>
                  <?php if ($page->contentimg->ref02path->attributes()->type == 'video') { ?>
                    <video id="video" playsinline="" muted="" autoplay="" loop="" style="background-image:url('app/img/<?php echo $page->contentimg->ref02pathcover ?>')" data-silent="false" src="app/img/<?php echo $page->contentimg->ref02path ?>"></video>
                  <?php } else { ?>
                    <img class='screen' src='app/img/<?php echo $page->contentimg->ref02path ?>'>
                  <?php } ?>                
                  <figcaption><?php echo $page->contentimg->ref02figcaption ?></figcaption>
                </figure>
              </div>
            </div>
            <?php } ?>


            <?php if ($page->contentimg->attributes()->contenttype == 'mod-ref-01') { ?>
                <!-- start: mod ref 01 --> 
                <div class='mod-ref mod-ref-01'>
                  <div class="dev-mobile">
                    <img class="device" src="app/img/device-mobile.png">
                    <img class="screen" src="app/img/<?php echo $page->contentimg->ref01path ?>">
                  </div>
                  <div class="dev-laptop">
                    <img class="device" src="app/img/device-laptop.png">
                    <img class="screen" src="app/img/<?php echo $page->contentimg->ref02path ?>">
                  </div>
                </div>
                <!-- end: mod ref 01 --> 
              <?php } ?>

              <?php if ($page->contentimg->attributes()->contenttype == 'mod-ref-02') { ?>
                <!-- start: mod ref 02 --> 
                <div class='mod-ref mod-ref-02'>
                    <img class="screen" src="app/img/<?php echo $page->contentimg->ref01path ?>">
                </div>
                <!-- end: mod ref 02 --> 
              <?php } ?>

              <?php if ($page->contentimg->attributes()->contenttype == 'mod-ref-03') { ?>
                <!-- start: mod ref 03 --> 
                <div class='mod-ref mod-ref-03'>
                    <img class="screen" src="app/img/<?php echo $page->contentimg->ref01path ?>">
                </div>
                <!-- end: mod ref 03 --> 
              <?php } ?>


              <!-- end: pagcontent-image --> 
          <?php } ?>

          <?php if (isset($page->contenttxt)) { ?>
            <!-- start: text --> 
            <div class='mod-txt mod-txt-01'>
              <div class='pag-headline'>
                <h2><?php echo $page->contenttxt->headline ?></h2>
              </div>
              <div class='txt <?php 
                if ( $page->pagetypecolor == "fff" ) : 
                echo "is-invert"; 
                endif; ?>
                '>
                <?php echo $page->contenttxt->text ?>
              </div>
            </div>
            <!-- end: text --> 
          <?php } ?>


        </div>
        <!-- end: pagcontent --> 

        <?php if (isset($page->reflegend)) { ?>
        <!-- start: reflegend --> 
         <div class='mod-reflegend-values'>
          <div class='work'><?php echo $page->reflegend->work ?></div>
          <div class='time'><?php echo $page->reflegend->time ?></div>
          <div class='agency'><?php echo $page->reflegend->agency ?></div>
        </div>
        <!-- end: reflegend --> 
        <?php } ?>
      </div>
      
      <?php
    }
    ?>

</div>
<div id='background'></div>

<script src="https://cmp.osano.com/AzZctDRlI37SRnEX/466013f2-b2c5-459a-996b-105015fd9137/osano.js"></script>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-27667873-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-27667873-1');
</script>
</body>
</html> 