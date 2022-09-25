import $ from 'jquery';
//https://gist.github.com/samelwitt/3d9d67898a7f357f1a5833b7b8199ff8

/* org function
$.fn.textWidth = function(){
  var html_org = $(this).html();
  var html_calc = '<span>' + html_org + '</span>';
  $(this).html(html_calc);
  var width = $(this).find('span:first').width();
  $(this).html(html_org);
  return width;
};*/

// bind plugin definition to jQuery for usage
// $.fn.textWidth = textWidth;

export function textWidth() {
      var html_org = $(this).html();
      var html_calc = '<span>' + html_org + '</span>';
      $(this).html(html_calc);
      var width = $(this).find('span:first').width();
      $(this).html(html_org);
      return width;
}