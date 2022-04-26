$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    //console.log($("#tweet-text").val().length);
    $("#counter").html(() => {
      let num = 140 - $("#tweet-text").val().length;
      if(num <= 0) {
        $("#counter").removeClass("counter");
        $("#counter").addClass("counterZero");
      } else {
        $("#counter").removeClass("counterZero");
        $("#counter").addClass("counter");
      }
      return num;
    });
  });
});