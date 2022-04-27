$(document).ready(function() {
  $("button").on('mouseover', function() {
    $(this).removeClass("blue");
    $(this).addClass("orange");
  });

  $("button").on('mouseout', function() {
    $(this).removeClass("orange");
    $(this).addClass("blue");
  });
});