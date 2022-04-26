$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    $(this).siblings().children("#counter").html(() => {
      let num = 140 - $(this).val().length;
      if(num <= 0) {
        $(this).siblings().children("#counter").removeClass("counter");
        $(this).siblings().children("#counter").addClass("counterZero");
      } else {
        $(this).siblings().children("#counter").removeClass("counterZero");
        $(this).siblings().children("#counter").addClass("counter");
      }
      return num;
    });
  });
});