var gamePattern=[]; // stores the pattern of ranmdom coloura
var userClickedPattern=[]; // stores the user clicked pattern
var buttonColors=["red","blue","green","yellow"];
var level=0;
var started=false;
$(document).on("keypress",function() {
  if(started==false)
  {
    $("#level-title").text("LEVEL 0");
    nextsequence();
    started=true;
  }

});


function nextsequence()
{
  level++;
  userClickedPattern=[];
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor)
  animatePress(randomChosenColor);
  $("#level-title").text("LEVEL " + level);

}

$(".btn").on("click",function () {
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkanswer(userClickedPattern.length-1)
});
function playsound(name)
{
  var temp= name+".mp3";
  var sound=new Audio("sounds/"+temp);
  sound.play();
}


function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    document.querySelector("#"+currentColor).classList.remove("pressed");
  }, 100);
}
function checkanswer(currentlevel)
{
  if(userClickedPattern[currentlevel]==gamePattern[currentlevel])
  {
    if(gamePattern.length==userClickedPattern.length)
    {
      setTimeout(function () {
        nextsequence();
      },1000);
    }
  }
  else
  {
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
