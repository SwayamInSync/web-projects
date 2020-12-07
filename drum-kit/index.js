for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", function() {
    var buttoninnerhtml = this.innerHTML;
    do_thing(buttoninnerhtml);
    buttonAnimation(buttoninnerhtml);
  });

}

document.addEventListener("keydown", function (pressedkey) {
// Record keypresses
// pressedkey stores the details about the key that is being pressed by the user
do_thing(pressedkey.key);
buttonAnimation(pressedkey.key);
});

function do_thing(key)
{
  switch (key) {
    case "w":
      var t1 = new Audio("sounds/tom-1.mp3");
      t1.play();

      break;
    case "a":
      var t2 = new Audio("sounds/tom-2.mp3");
      t2.play();

      break;
    case "s":
      var t3 = new Audio("sounds/tom-3.mp3");
      t3.play();

      break;
    case "d":
      var t4 = new Audio("sounds/tom-4.mp3");
      t4.play();

      break;
    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();

      break;
    case "k":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();

      break;
    case "l":
      var kick_bass = new Audio("sounds/kick-bass.mp3");
      kick_bass.play();

      break;
    // default: break;

  }
}

function buttonAnimation(pressedkey)
{
  var activebutton=document.querySelector("." + pressedkey);
  activebutton.classList.add('pressed');
  setTimeout(function () {
    activebutton.classList.remove('pressed');
  },100);

}
