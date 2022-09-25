import $ from 'jquery';

export function layerViewport() {

    const layerViewport = {
        layer: $('.mod-viewport-layer'),
        closeEl: $('.link-button, .link-close'),
    }
    $(layerViewport.closeEl).click(function () {
      $(layerViewport.layer).hide();  
    });

}
