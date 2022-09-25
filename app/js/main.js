import '../css/main.sass';

// import jquery
import $ from 'jquery';
// siehe kommentar in transition.js
// import transitions from './transitions.js';

// import query mousewheel for triggering exaclty 
import { jqueryMousewheel } from "jquery-mousewheel";

// import textwidth as jquery extension 
import { textWidth } from './helper/textWidth.js';
// bind plugin definition to jQuery
$.fn.textWidth = textWidth;

// import pagContents
import { getPageContents } from './pagContents.js';

// import toolTransition
import { toolTransition } from './modules/mod-tools.js';

// import layer-viewport
import { layerViewport } from './modules/mod-layer-viewport';

// import vh-fix
import { cPropertyVH } from './helper/cproperty-vh';

// import getQueryVariable
import { getQueryVariable } from './helper/urlVariable';

// import menu-things
import { menuFunction, menuRotation } from './menu.js';

// import gsap-things
import { TweenMax, TimelineLite, TweenLite, CSSPlugin, AttrPlugin, TimelineMax } from "gsap";
import { Draggable, CSSRulePlugin } from "gsap/all"; 
import ThrowPropsPlugin from './gsap/plugins/ThrowPropsPlugin.min.js';
//without this line, CSSPlugin and AttrPlugin may get dropped by your bundler...
const plugins = [ CSSPlugin, AttrPlugin, CSSRulePlugin, ThrowPropsPlugin ];

$(document).ready(function() {
  //////////////// START: Preloader ////////////////
  var tlPreloader = new TimelineMax({repeat:-1}),
    preloader = $("#mod-preloader"),
    prelIcons = $(".m-branding > div > svg"),
    prelIconsContainer = $(".m-branding"),
    prelEasing = SlowMo.ease.config(0.1, 0.7, false),
    prelMinTime = 500,
    prelMinTimePlayed = false,
    windowLoaded = false;
  // set the initial icon position
  tlPreloader.set(prelIcons, {x: 0, y: 150, opacity: 0}, "0")
  // loop through the icons and animate them
  for ( var i = 0; i < prelIcons.length; ++i ) {
    tlPreloader.addLabel("icon" + i, "0" + i * 2);
    tlPreloader.to(prelIcons[i], 2, { ease: prelEasing, x: 0, y: -150 }, "icon" + i);
    tlPreloader.to(prelIcons[i], 0.5, { ease: Power0.easeNone, opacity: 1 }, "icon" + i);
    tlPreloader.to(prelIcons[i], 0.5, { ease: Power0.easeNone, opacity: 0 }, "icon" + i + "+=1.5");
  }
  // min time preloader
  setTimeout(
    () => {
      prelMinTimePlayed = true;
      if (windowLoaded == true) {
        prelFinishAnimation();
        console.log("min time played and window loaded");
      } else {
        console.log("min time played but window not loaded");
      }
    },
    prelMinTime
  );
  // finish-animation preloader
  function preloaderRemove() {
    preloader.remove();
  }
  function prelFinishAnimation() {
    var tlPreloaderFinish = new TimelineLite({onComplete:preloaderRemove});
      tlPreloaderFinish.to(prelIcons, 0.25, { opacity: 0 }, 0);
      tlPreloaderFinish.addLabel("grow");
      tlPreloaderFinish.to(prelIconsContainer, 0.3, { ease: Back.easeIn.config(1.7), scale:10, transformOrigin:"50% 50%" }, "grow")
      tlPreloaderFinish.to(prelIconsContainer, 0.3, { backgroundColor: "#000" }, "grow")
      tlPreloaderFinish.to(preloader, 0.5, { opacity: 0 }, "grow+=0.2");
  }
  // check if window loaded
  const load = () => {
    windowLoaded = true;
    if (prelMinTimePlayed == true) {
      prelFinishAnimation();
      console.log("window loaded and min time played");
    } else {
      console.log("window loaded but min time played not finished");
    }
  } 
  window.onload = load; 
  //////////////// END: Preloader ////////////////
  //////////////// START: Variables ////////////////
  let vpHeight = window.innerHeight,
    vpWidth = window.innerWidth,
    nextHeadlineWidth = 300;

  const p = $('.page'),
    pag = {
      total: p.length,
      content: $('.pag-content'),
      contents: getPageContents(p, '.mod-ref > *, .ref-mobile-3 > .screen'), 
      text: getPageContents(p, '.txt'), 
      allText: $('.txt'),
    },
    nav = {
      wrapper: $("#navigation"),
      next: $('.nav--next'),
      prev: $('.nav--prev'),
      nextTxt: $('.nav--next > .nav-text'),
      prevTxt: $('.nav--prev > .nav-text'),
      nextLine: $('.nav--next > .nav-line'),
      prevLine: $('.nav--prev > .nav-line'),
    }

  let pCurrent = 0, 
    next = 0,
    menuBtn = $('#nav-menu-button'),
    pagType = [],
    pagColor = [],
    pagTypeColor = [],
    pagBackgroundColor = [],
    pagBackground = $("#background"),
    pagHeadline = [],
    logo = {
      el: $('#logo'),
      defaultColor: '#fff',
      defaultBackground: '#000',
      invertColor: '#000',
      invertBackground: '#fff'
    },
    header = $('header'),
    refLegend = $('.mod-reflegend'),
    headlineLine = {
      el: $('.el-head-line'),
      height: 10,
      top: vpHeight / 2 - 5,
    },
    pagTitleWrapper = $('#pag-titles'),
    pagTitlePrev = $('.pag-title--prev'),
    pagTitleCurrent = $('.pag-title--current'),
    pagTitleNext = $('.pag-title--next'),
    pagTitle = [],
    titleCurrent = null,
    titlePrev = null,
    titleNext = null,
    pgiCurrent = $('.pgi-current'),
    pgiDiv = $('#pagination hr'),
    pgiTotal = $('.pgi-total');

    if( $('.mod-txt').length ) {
      var textPosRef = $('.mod-txt').offset().left,
      textPosText = $('.pag-content.pag--is-text > .mod-txt').offset().left;
    }

  // fill the arrays
  p.each(function( index ){
    pagType.push($(this).data('pagetype'));
    pagColor.push($(this).data('pagecolor'));
    pagTypeColor.push($(this).data('pagetypecolor'));
    pagBackgroundColor.push($(this).data('pagebackground'));
    pagTitle.push($(this).data('pagetitle'));
    pagHeadline.push($(this).find('.pag-headline > *'));
  });


  // initial positioning
  if( $(headlineLine.el).length ) {
    TweenLite.set(headlineLine.el, {
      zIndex: 100,
      top: 0, 
      left: 0, 
      y: headlineLine.top, 
      x: textPosRef, 
      height: headlineLine.height,
      width: pagHeadline[0].textWidth()
    })
  }
  //////////////// END: Variables ////////////////

  // START: menu
  if( $(menuBtn).length ) {
    $(menuBtn).click(function () {
      menuFunction();
    });
    menuRotation();
  }
  // END: menu
  
  // START: url variable, set next 
  if( getQueryVariable("page").length ){
    const pageIdInNumber = parseInt(getQueryVariable("page"), 10);
    next = pageIdInNumber;
  }
  // END: url variable, set next 

  // START: EVENTS //
  // use keys to navigate
  $(document).keydown(function(e) {
    if(e.which == 40 || e.which == 39) {
      goNext();
    } if (e.which == 37 || e.which == 38) {
      goPrev();
    }
  });
  $(".mod-ref, .mod-avatar, .mod-tool").on('mousewheel', debounce(function(event) {
    console.log(event.deltaX, event.deltaY, event.deltaFactor);
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
      goNext();
    } else {
      goPrev();
    }
  }, 200, true));

  // p.bind('mousewheel DOMMouseScroll', debounce(function(e) {
  //   if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
  //     console.log("test2");
  //     goNext();
  //   } else {
  //     goPrev();
  //   }
  // }, 200, true));
  nav.next.click( function() {
    goNext();
    return false;
  });
  nav.prev.click( function() {
    goPrev();
    return false;
  });
  $('a.nav-item-ref').click( function() {
    next = $(this).data('link');
    goNext("menu");
    if( $(this).hasClass('link-textlink')) {
      return false;
    } else {
      menuFunction();
      return false;
    }
  });  
  // END: EVENTS //

  var reset = function() {
    p.attr('class', 'page').removeAttr('style');
  }
  function updPagination() {
    $(pgiTotal).html(pag.total);
    $(pgiCurrent).html(pCurrent + 1);
    $('.nav-item').removeClass('is-active');
    $('.nav-item-' + pCurrent).addClass('is-active');
  }

  function updTitle() {
    navTitlesTransitionNext()
    pagTitlesTransitionNext()
    logoTransitionNext()
    legendTransitionNext()
  }

  function updColors() {
    if ( pagType[next] === "ref-content") {
      TweenLite.to([pagTitleCurrent, pagTitleNext, pagTitlePrev], 0.5, { color: "#" + pagTypeColor[next] });
    } else {
      TweenLite.to([pagTitleCurrent, pagTitleNext, pagTitlePrev], 0.5, { color: "#" + pagColor[next] });
    }
    
    TweenLite.to(pagBackground, 0.5, { backgroundColor: pagBackgroundColor[next], delay: 0.5 });
    
    TweenLite.to(logo.el, 0.5, { backgroundColor: logo.defaultBackground, color: logo.defaultColor });
    if ( pagTypeColor[next] === 'fff'){
      TweenLite.to(logo.el, 0.5, { backgroundColor: logo.invertBackground, color: logo.invertColor });
      $(menuBtn).addClass("is-invert");
      $(nav.wrapper).addClass("is-invert");
    } else {
      $(menuBtn).removeClass("is-invert");
      $(nav.wrapper).removeClass("is-invert");
    }
    TweenLite.to(pag.content[next], 0.5, { color: "#" + pagTypeColor[next] });
    TweenLite.to(headlineLine.el, 0.5, { backgroundColor: "#" + pagColor[next] });
  }
  //////////////// END: Helper-functions ////////////////

  //////////////// START: content-transition-animation ////////////////
  function transitionContent(direction){

    const transitionContentTimeline = new TimelineMax();
    // normal fading, all elements
    transitionContentTimeline.fromTo(p.eq(pCurrent), 1, {
      opacity: 1,
      zIndex: 10
    }, {
      opacity: 0,
      zIndex: 5 
    }, "0");
    transitionContentTimeline.fromTo(p.eq(next), 0.5, {
      opacity: 0,
      zIndex: 5
    }, {
      opacity: 1,
      zIndex: 10
    }, "0");    
    // text fading out
    transitionContentTimeline.to(pag.text[pCurrent],0.3, {
      opacity: 0
    }, "0");
    // START: tween contents
    // if content we need a short delay!!
    if( pagType[next] === "ref-content" ) {
      transitionContentTimeline.staggerFromTo(pag.contents[next], 1, {
        opacity: 0,
        y: 400
      }, {
        delay: 0.5,
        y: 0,
        opacity: 1, 
        ease: 'Expo.easeOut'
      }, 0.4, "0");
    } else if ( pagType[next] === "special-tool" ) {
      toolTransition();
    } else {
      transitionContentTimeline.staggerFromTo(pag.contents[next], 1, {
        opacity: 0,
        y: 400
      }, {
        delay: 1,
        y: 0,
        opacity: 1, 
        ease: 'Expo.easeOut'
      }, 0.4, "0");
    }  
    transitionContentTimeline.fromTo(pag.contents[pCurrent], 0.5, {
      opacity: 1,
      y: 0
    }, {
      y: 800,
      opacity: 0,
      ease: 'Expo.easeIn'
    }, "0");
    // END: tween contents
    // tween typo
    transitionContentTimeline.fromTo(pagHeadline[pCurrent], 0.6, {
      opacity: 1,
      y: 0
    }, {
      opacity: 0,
      y: 200,
      ease: 'Expo.easeIn'
    }, 0);
    transitionContentTimeline.fromTo(pagHeadline[next], 1, {
      opacity: 0,
      y: 200
    }, {
      opacity: 1,
      y: 0,
      ease: 'Expo.easeOut'
    }, 0.5)
    // text fading in
    transitionContentTimeline.fromTo(pag.text[next],2.5, {
      opacity: 0
    }, {
      opacity: 1,
      ease: Power0.easeNone
    }, "-=1");

    // animate the headline line
    nextHeadlineWidth = pagHeadline[next].textWidth();
    headlineLineTransition(nextHeadlineWidth);

    if (direction == "directionNext") {
      titleCurrent = pagTitle[next];
      titlePrev = pagTitle[(next - 1) >= 0 ? (next - 1) : (pag.total - 1)];
      titleNext = pagTitle[(next + 1) < pag.total ? (next + 1) : 0];
    } else if (direction == "directionPrev") {
      titleCurrent = pagTitle[next];
      titlePrev = pagTitle[(next) !== 0 ? (next - 1) : (pag.total - 1)];
      titleNext = pagTitle[(next + 1) < pag.total ? (next + 1) : (pag.total - 1)];
    }

    updTitle();
    pCurrent = next;
    updPagination();
    updColors();
  }
  //////////////// END: content-transition-animation ////////////////
  //////////////// START: Next- & Prev-Actions ////////////////
  var goNext = function(trigger, nextValue) {
    reset();
    if (trigger === "history") {
      next = nextValue;
      console.log("nextvalue passed");
    } else if (trigger !== "menu") {
      next = (pCurrent + 1) < pag.total ? (pCurrent + 1) : 0;
      // console.log("next -> not the menu and this is " + next)
      history.pushState({page: next, title: titleNext}, titleNext, '?page=' + next);
    } else {
      // console.log("next -> menu")
      history.pushState({page: next, title: titleNext}, titleNext, '?page=' + next);
    }
    // console.log("pcurrent " + pCurrent + " next is " + next)
    transitionContent("directionNext");
  }
  var goPrev = function() {
    reset();
    next = (pCurrent - 1) >= 0 ? (pCurrent - 1) : pag.total - 1;
    // console.log("prev -> not the menu and this is " + next)
    transitionContent("directionPrev");
  }
  //////////////// END: Next- & Prev-Actions ////////////////



  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }
  
  //////////////// START: ANIMATIONS ////////////////
  // START: pageTitlesTransition
  function pagTitlesTransitionNext() {
    // START: set the page title
    document.title = "Johannes Bühl – Portfolio – " + titleCurrent;
    // END: set the page title
    // push the next element in the variable
    pagTitleNext = $(pagTitleWrapper).find('.pag-title--next');
    // remove the old prev and set the new classes
    $(pagTitlePrev).remove();
    $(pagTitleCurrent).removeClass("pag-title--current");
    $(pagTitleCurrent).addClass("pag-title--prev");
    $(pagTitleNext).removeClass("pag-title--next");
    $(pagTitleNext).addClass("pag-title--current");
    // insert new element
    $(pagTitleWrapper).append("<div class='pag-title pag-title--next'>next title</div>")
    // push the new elements in the variables
    pagTitleNext = $(pagTitleWrapper).find('.pag-title--next');
    pagTitlePrev = $(pagTitleWrapper).find('.pag-title--prev');
    pagTitleCurrent = $(pagTitleWrapper).find('.pag-title--current');
    // fill the next element
    $(pagTitleNext).html(titleCurrent);
    // position the new element
    TweenLite.set(pagTitleNext, {y: 50});
    //animate the elements
    TweenLite.to(pagTitleCurrent, .5, {y: -50});
    TweenLite.to(pagTitleNext, .5, {y: 0});
  }
  // END: pageTitlesTransition

  // START: navTitles
  function setValues(){
    // values for the nav
    $(nav.prevTxt).html(titlePrev);
    $(nav.nextTxt).html(titleNext);
  }
  function navTitlesTransitionNext() {
    const navTitlesTransitionTimeline = new TimelineMax();
    navTitlesTransitionTimeline.to(nav.prev, 0.25, {
      x: 300,
      ease: Power1.easeOut
    }, "0")
    navTitlesTransitionTimeline.to(nav.next, 0.25, {
      x: -300,
      ease: Power1.easeOut
    }, "0")
    navTitlesTransitionTimeline.to([nav.next, nav.prev], 0.2, {
      opacity: 0,
    }, "0.2")
    navTitlesTransitionTimeline.addCallback(setValues, "+=0.2")
    navTitlesTransitionTimeline.to([nav.prev, nav.next], 1, {
      opacity: 1,
      x: 0,
      ease: Power2.easeIn
    })
    navTitlesTransitionTimeline.play();
  }
  // END: navTitles

  // START: logoTransition
  function logoTransitionNext() {
    if( pagType[next] === "ref-cover" || pagType[next] === "intro" ) {
      TweenMax.to([header], 0.75, {
        delay: 0,
        x: textPosRef,
        left: 0,
        ease: 'Expo.easeInOut',
      })
    } else if ( pagType[next] === "ref-content" ) {
      TweenMax.to([header], 0.75, {
        delay: 0,
        x: 35,
        left: 0,
        ease: 'Expo.easeInOut',
      })
    } else {
      TweenMax.to([header], 0.75, {
        delay: 0,
        x: textPosText,
        left: 0,
        ease: 'Expo.easeInOut',
      })
    }
  }
  // END: logoTransition
  // START: headlineLineTransition
  function headlineLineTransition(elWidth) {
    if ( pagType[next] === "ref-content"  ) {
      TweenLite.to(headlineLine.el, 0.35, { 
        delay:0, 
        ease: 'Expo.easeOut',
        zIndex: 2,
        x: 0,
        width: vpWidth
      })      
      TweenLite.to(headlineLine.el, 0.5, { 
        delay:0.35,
        ease: 'Expo.easeOut',
        y: 0,
        height: vpHeight
      })      
    } else if ( pagType[next] === "ref-cover" || pagType[next] === "intro" ) {
      TweenLite.to(headlineLine.el, 0.35, {
        delay: 0,
        ease: 'Expo.easeOut',
        zIndex: 100,
        height: headlineLine.height,
        y: headlineLine.top
      })
      TweenLite.to(headlineLine.el, 0.5, {
        delay: 0.35,
        ease: 'Expo.easeOut',
        x: textPosRef,
        width: elWidth
      })
    } else {
      TweenLite.to(headlineLine.el, 0.5, {
        delay: 0,
        ease: 'Expo.easeOut',
        zIndex: 100,
        height: headlineLine.height,
        y: headlineLine.top
      })
      TweenLite.to(headlineLine.el, 0.5, {
        ease: 'Expo.easeOut',
        delay: 0.5,
        x: textPosText,
        width: elWidth
      })
    }
  };
  // END: headlineLineTransition
  // START: legendTransition
  function legendTransitionNext() {
    if( pagType[next] === "ref-cover" ) {
      TweenMax.to(refLegend, 0.5, {
        opacity: 1,
        delay: 0
      })
    } else {
      TweenMax.to(refLegend, 0.5, {
        opacity: 0,
        delay: 0
      })
    }
  }
  // END: legendTransition  

  $( window ).resize(function() {
    vpHeight = window.innerHeight;
    vpWidth = window.innerWidth;
    if( $('.mod-txt').length ) {
      textPosRef = $('.mod-txt').offset().left;
      textPosText = $('.pag-content.pag--is-text > .mod-txt').offset().left;
    }
    console.log(textPosRef);
    nextHeadlineWidth = pagHeadline[next].textWidth();
    headlineLineTransition(nextHeadlineWidth);
    headlineLine.top = vpHeight / 2 - 5;
    logoTransitionNext();
  });


  //////////////// END: ANIMATIONS ////////////////
  //////////////// START: initial setup ////////////////
  goNext("menu");
  updColors();
  p.eq(pCurrent).css({
    opacity: 1
  });
  titlePrev = pagTitle[pag.total - 1];
  titleCurrent = pagTitle[pCurrent];
  titleNext = pagTitle[pCurrent + 1];
  $(pagTitlePrev).html(titlePrev);
  $(pagTitleCurrent).html(titleCurrent);
  $(pagTitleNext).html(titleNext);
  updTitle()
  layerViewport();
  cPropertyVH();
  //////////////// END: initial setup ////////////////
  $(window).on('popstate', function (e) {
    var state = e.originalEvent.state;
    if (state !== null) {
      next = state.page;
      console.log("next is " + next);
      console.log("title is " + state.title);
      goNext("history", state.page);
    } else {
      console.log("state is null")
    }
  });
});

