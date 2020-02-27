var buttonColors = ["red" , "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var start = false;

var level = 0;

$(".btn").click(function(){

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);


});



// this randomizes the color in the array
function NextSequence(){

userClickedPattern = [];
level++;



var randomnumber = Math.floor(Math.random() * 4);

var randomChosenColor = buttonColors[randomnumber];

gamePattern.push(randomChosenColor);

$("#level-title").text(" Level " + level);


$("#" + randomChosenColor).fadeIn(250).fadeOut(250).fadeIn(250);
playSound(randomChosenColor);




}

function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}

function playSound(name){

  var audio = new Audio("sounds/" + name  + ".mp3");
  audio.play();

}

function animatePress(currentColor){

  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
   $("#" + currentColor).removeClass("pressed");

 }, 100);
}


 $(document).on("keypress", function(){

    if (!start) {


          $("#level-title").text(" Level " + level);
          NextSequence();
          start = true;

    }
 });


 function checkAnswer(currenLevel){
   if (userClickedPattern[currenLevel] === gamePattern[currenLevel]) {
   if (userClickedPattern.length === gamePattern.length) {
     setTimeout(function(){
       NextSequence();
     }, 1000);

   }

 }else {

     playSound("wrong");

     $("#level-title").text("Game Over, Press Any Key to Restart!");
     $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");

     }, 200);

     startOver();

   }
 }
