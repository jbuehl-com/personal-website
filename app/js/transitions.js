// Zugriff auf Variablen funktioniert, ich schätze der nächste Schritt ist die Variablen wieder in main.js zu speichern
import $ from 'jquery';


// START: pageTitlesTransition
function pagTitlesTransitionNext(pagTitleCurrent, pagTitleNext, pagTitleWrapper, pagTitlePrev, titleNext) {
    console.log("transition test3:" + pagTitleCurrent + pagTitleNext + pagTitleWrapper + pagTitlePrev + titleNext);
    TweenLite.to(pagTitleCurrent, .5, {y: -50});
    TweenLite.to(pagTitleNext, .5, {y: 0});
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
    $(pagTitleNext).html(titleNext);
    // position the new element
    TweenLite.set(pagTitleNext, {y: 50});
}
// END: pageTitlesTransition

export default {
    pagTitlesTransitionNext: pagTitlesTransitionNext,
}