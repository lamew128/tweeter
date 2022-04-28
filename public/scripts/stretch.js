$(document).ready(function() {
  //top right button: toogle the compose section
  //focus
  $("#drop").click(() => {
    $("#compose").toggle("slow");
    $("#tweet-text").focus();
  });

  //check the position when scrolling
  //display the go to top button when needed
  $(document).scroll(() => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      $("#back").css("display", "block");
    } else {
      $("#back").css("display", "none");
    }
  });

  //back to the top when back to top button is clicked
  $("#back").click(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});
