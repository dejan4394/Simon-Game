var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var started = false ;
var level = 0;

$("body").click(function(){
  if (!started){
    $("body").removeClass("game-over");

    nextSequence();
    started = true;

    $("#level-title").text("level  "+ level);
  }
});



$(".btn").click(function(){
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);


  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length - 1);



});

function checkAnswer(currentLevel){
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");
    console.log(gamePattern);
    console.log(userClickedPattern);

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    wrongKey();

    setTimeout(function(){
      started = false;
    },1000)
    gamePattern=[];
    level = 0;
  }
}



function nextSequence(){
  userClickedPattern=[];

  level++;

  $("#level-title").text("level  "+ level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChoosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColor);

  $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);


playSound(randomChoosenColor);
}





function playSound(name_of_color){
  var audio = new Audio("sounds/" + name_of_color +".mp3");
  audio.play();

}


function animatePress(pressedColour_Player){
$("."+pressedColour_Player).addClass("pressed");
setTimeout(function(){
  $("."+pressedColour_Player).removeClass("pressed");
}, 100)
}

function wrongKey(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  $("h1").text("GAME OVER !!! CLICK TO PLAY AGAIN");


}
