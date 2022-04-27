/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#tweets-container').html("");
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
}

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      //console.log('Success: ', data);
      renderTweets(data);
    });

};

$(document).ready(function() {
  loadTweets();

  $("form").submit(function(event) {
    event.preventDefault();

    console.log('Button clicked, performing ajax call...');
    if (!$("#tweet-text").val()) {
      alert("no content!");
      return;
    } 

    if($("#tweet-text").val().length > 140) {
      alert("Limit exceed!");
      return;
    }

    $.ajax({ 
      url: '/tweets',
      method: 'POST',
      data: $( this ).serialize()
    })
    .then(function () {
      console.log('Success: ');
      loadTweets();
    });

  });
});


