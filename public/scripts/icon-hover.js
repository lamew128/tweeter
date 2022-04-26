$(document).ready(function() {
  $("i").on('mouseover', function() {
    $(this).removeClass("blue");
    $(this).addClass("orange");
  });

  $("i").on('mouseout', function() {
    $(this).removeClass("orange");
    $(this).addClass("blue");
  });

  $("button").on('mouseover', function() {
    $(this).removeClass("blue");
    $(this).addClass("orange");
  });

  $("button").on('mouseout', function() {
    $(this).removeClass("orange");
    $(this).addClass("blue");
  });
});