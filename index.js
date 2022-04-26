var gamePattern = [];
var userPattern = [];
var colors = ["red", "yellow", "blue", "green"];
var started = false;
var level = 0;
$(".btn").hide();
$(document).click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
  setTimeout(function () {
     $(".btn").show();
  }, 200);
    setTimeout(function () {
      next();
    }, 500);
  }
});

$(".btn").click(function () {
  var userClicks = $(this).attr("id");
  userPattern.push(userClicks);
  answer(userPattern.length-1);

  animatePress(userClicks);
  playSound(userClicks);
});

function next() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}



function answer(currentPosition) {
  if (gamePattern[currentPosition] === userPattern[currentPosition]){
    if (userPattern.length === gamePattern.length){
    setTimeout(function () {
  next();  }, 1000);

    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
  }



function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
