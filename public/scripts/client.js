/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Prevent XSS
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/*
  convert a tweet object to html code
 */
const createTweetElement = function(tweetObject) {
  return `<article class="tweet">
  <header class="tweet">
    <div class="info">
    <img src="${tweetObject.user.avatars}"> 
      <p>${tweetObject.user.name}</p>
    </div>
    <p class="handle">${tweetObject.user.handle}</p>
  </header>
  <div class="tweet">
    <p class="tweet">${escape(tweetObject.content.text)}</p>
  </div>
  <hr>
  <footer class="tweet">
    <p>${timeago.format(tweetObject.created_at)}</p>
    <div class="icon">
      <a href="/"><i class="fa-solid fa-flag blue"></i></a>
      <a href="/"><i class="fa-solid fa-arrow-up-right-from-square blue"></i></a>
      <a href="/"><i class="fa-solid fa-heart blue"></i></a>
    </div>
  </footer>
</article>`
};

/*
  display all tweets
 */
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#tweets-container').html("");
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
}

/*
  display all tweets when ajax get request is called
*/
const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });

};



$(document).ready(function() {
  loadTweets();

  //When the compose form is submited
  $("form").submit(function(event) {
    event.preventDefault();

    //check if there is no input
    //if yes: display error message
    if (!$("#tweet-text").val()) {
      $("#error").html(`<p><i class="fa-solid fa-triangle-exclamation"></i> No input! <i class="fa-solid fa-triangle-exclamation"></i></p>`);
      $("#error").slideDown("slow");
      return;
    } 

    //check if the input exceed the limit
    //if yes: display error message
    if($("#tweet-text").val().length > 140) {
      $("#error").html(`<p><i class="fa-solid fa-triangle-exclamation"></i> Too long! <i class="fa-solid fa-triangle-exclamation"></i></p>`);
      $("#error").slideDown("slow");
      return;
    }

    //hide the error message if no error
    $("#error").html(`<p></p>`);
    $("#error").hide();

    //perform an ajax post to create and store the new tweet object
    $.ajax({ 
      url: '/tweets',
      method: 'POST',
      data: $( this ).serialize()
    })
    .then(function () {
      console.log('Success: ');
      loadTweets();
    });

    //reset the form
    $("#tweet-text").val("");
    $("#counter").html(140);
  });
});


