/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
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
    <p>${tweetObject.content.text}</p>
  </div>
  <hr>
  <footer class="tweet">
    <p>${tweetObject.created_at}</p>
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
      console.log('Success: ', data);
      renderTweets(data);
    });
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
  renderTweets(data);

  $("form").submit(function(event) {
    event.preventDefault();
    console.log( $( this ).serialize() );

    let newTweet = {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": $("#tweet-text").val()
      },
      "created_at": new Date()
    };

    console.log('Button clicked, performing ajax call...');
    $.ajax({ 
      url: '/tweets',
      type: 'POST',
      data: $( this ).serialize(),
      success: function () {
        console.log('Success: ');
        loadTweets();
      }
    });

  });
});


