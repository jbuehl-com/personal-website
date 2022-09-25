import $ from 'jquery';
import { TweenMax } from "gsap";
import { Draggable } from "gsap/all"; 
import ThrowPropsPlugin from './gsap/plugins/ThrowPropsPlugin.min.js';
const plugins = [ ThrowPropsPlugin ];

const menuf = $('#nav-main'),
    menufBtn = $('#nav-menu-button')

export function menuFunction() {
    // console.log("click menu button in function")    
    if ($(menufBtn).hasClass('is-active')) {
        // console.log("has class active")    
        $(menuf).removeClass('is-open');
        $(menufBtn).removeClass('is-active');
    } else {
        // console.log("has not class active")    
        $(menuf).addClass('is-open');
        $(menufBtn).addClass('is-active');
    }

}

export function menuRotation() {

    var menuRotationSnap = 30,
    menuRotationPos = TweenMax.set(menuf, {
        x:'+=0'
    }).target[0]._gsTransform;

    Draggable.create(menuf, {
        type: "rotation", 
        throwProps: true,
        onDrag:dragUpdate,
        onThrowUpdate:dragUpdate,
        snap:function(endValue) { 
        //this function gets called when the mouse/finger is released and it plots where rotation should normally end and we can alter that value and return a new one instead. This gives us an easy way to apply custom snapping behavior with any logic we want. In this case, just make sure the end value snaps to 90-degree increments but only when the "snap" checkbox is selected.
        //return Math.round(endValue / menuRotationSnap) * menuRotationSnap;
        }
    });

    function dragUpdate(){
        //console.log(menuRotationPos.rotation);
        // for a small delay use the this function 
        function rotateOthers(el,time) {
            TweenMax.staggerTo(el, time, {
                cycle:{
                rotation:function(i){
                return (i==0) ? menuRotationPos.rotation : menuRotationPos.rotation*2
                }
                }
            },0)        
        }
        //rotateOthers(menuEl04,2);
        //rotateOthers(menuEl02,0.8);
    }

}  
