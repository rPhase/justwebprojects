var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var gameStarted = false;

function nextColor() {
  return buttonColors[Math.floor(Math.random() * 4)];
}

function buttonAnimation(color) {
  $("#" + color).toggleClass("pressed");
  setTimeout(function () {
    $("#" + color).toggleClass("pressed");
  }, 150);
}

function playSound(soundName) {
  if (buttonColors.includes(soundName)) {
    var sound = new Audio("sounds/" + soundName + ".mp3");
    sound.volume = 0.1;
  } else if (soundName === "levelup") {
    var sound = new Audio("sounds/levelup.mp3");
    sound.volume = 0.1;
  } else {
    var sound = new Audio("sounds/wrong.mp3");
    sound.volume = 0.05;
  }
  sound.play();
}

function buttonEvent(color) {
  buttonAnimation(color);
  playSound(color);
}

function playPattern() {
  var speed = 900; //time in milliseconds
  $(".btn").css({ pointerEvents: "none" });
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function () {
      buttonEvent(gamePattern[i]);
    }, (i + 1) * speed);
  }
  setTimeout(function () {
    $(".btn").css({ pointerEvents: "auto" });
  }, (gamePattern.length + 1) * speed);
}

$(".btn").click(function () {
  var colorSelected = $(this).attr("id");
  buttonEvent(colorSelected);
  if (gameStarted) {
    userPattern.push(colorSelected);
    if (checkAnswer()) {
      if (userPattern.length < gamePattern.length) {
        // Continue
      } else {
        $("#level-title").text("NICE!");
        setTimeout(function () {
          playSound("levelup");
          nextSequence();
        }, 1000);
      }
    } else {
      endGame();
    }
  } else {
    $(".btn").css({ pointerEvents: "none" });
    countdown(3);
  }
});

$(document).keydown(function () {
  if (!gameStarted) {
    $(".btn").css({ pointerEvents: "none" });
    countdown(3);
  }
});

$("#level-title").click(function () {
  if (!gameStarted) {
    $(".btn").css({ pointerEvents: "none" });
    countdown(3);
  }
});

function startGame() {
  $(".btn").css({ pointerEvents: "auto" });
  gameStarted = true;
  level = 0;
  gamePattern.length = 0;
  nextSequence();
}

function nextSequence() {
  level++;
  userPattern.length = 0;
  $("#level-title").text("Level " + level);
  gamePattern.push(nextColor());
  playPattern();
}

function countdown(seconds) {
  seconds = seconds - 1;
  if (seconds < 0) {
    startGame();
  } else {
    // Update remaining seconds
    $("#level-title").text("Starting game in " + (seconds + 1));
    // Count down using javascript recursively
    setTimeout("countdown(" + seconds + ")", 1000);
  }
}

function checkAnswer() {
  var gamePatternStr = gamePattern.toString();
  var userPatternStr = userPattern.toString();
  return gamePatternStr.startsWith(userPatternStr);
}

function endGame() {
  gameStarted = false;
  $("#level-title").text("Game Over!");
  playSound("");
  $("body").toggleClass("game-over");
  setTimeout(function () {
    $("body").toggleClass("game-over");
  }, 200);
}
