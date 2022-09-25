import $ from 'jquery';
import { TweenMax } from "gsap";
import { TimelineMax, TweenLite } from 'gsap/all';


export function toolTransition() {
    
    const tool = {
        scale: $('.chart-scale'),
        labels: $('.chart-label-item'),
        chartBarSmall: $('.chart-bar-small'),
        chartBarGD: $('.bar-grafikdesign'),
        chartBarGDtPD: $('.bar-grafikdesign-text-pd'),
        chartBarGDtGD: $('.bar-grafikdesign-text-gd')
    }

    TweenLite.set( [tool.scale, tool.labels, tool.chartBarGD, tool.chartBarGDtGD, tool.chartBarGDtPD, tool.chartBarSmall], { clearProps: "width"}, "0");
    TweenLite.set( [tool.scale, tool.labels, tool.chartBarGD, tool.chartBarGDtGD, tool.chartBarGDtPD, tool.chartBarSmall], { clearProps: "opacity"}, "0");

    const transitionTools = new TimelineMax();
    

    transitionTools.addLabel("start", "+=0.5");
    transitionTools.from( tool.scale, 1, {
        opacity: 0,
        width: 0,
        ease: Power3.easeIn
    }, "start");
    transitionTools.staggerFrom( tool.labels, 0.5, {
        opacity: 0
    }, 0.07, "start+=0.3");
    transitionTools.from( tool.chartBarGD, 1, {
        opacity: 0,
        width: 0,
        ease: Power3.easeIn
    }, "start");
    transitionTools.from( tool.chartBarGDtGD, 0.5, {
        opacity: 0
    }, "-=1");
    transitionTools.addLabel("thesmallones", "-=0.5")
    transitionTools.staggerFrom( tool.chartBarSmall, 0.3, {
        opacity: 0
    }, 0.1, "thesmallones");
    transitionTools.staggerFrom( tool.chartBarSmall, 0.8, {
        width: 0,
        ease: Power3.easeIn
    }, 0.1, "thesmallones");
    transitionTools.from( tool.chartBarGDtPD, 0.5, {
        opacity: 0
    }, "+=0.5");
    
}
