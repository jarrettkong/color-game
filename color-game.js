var rgb = document.querySelector("#rgb"); // rgb display
var squares = document.querySelectorAll(".square"); // color squares
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var difficulties = document.querySelectorAll(".difficulty");

var colors = [];
var pickedColor;
var easy = 3;
var hard = 6;
var difficulty;

init(); // runs the game

// FUNCTIONS //

function init() {
  setup();
  reset(hard);
}

function setup() {
  // handles clicks on colored squares
  for(var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
      if (this.style.backgroundColor === pickedColor) {
        message.textContent = "Correct!";
        resetButton.textContent = "Play again";
        change();
      } else {
        this.style.backgroundColor = "#232323"; // hides wrong clicked squares
        message.textContent = ("Try again");
      }
    });
  }

  // handles clicks on the difficulty changers, default is hard
  for(var i = 0; i < difficulties.length; i++) {
    difficulties[i].addEventListener("click", function() {
      difficulties[0].classList.remove("selected");
      difficulties[1].classList.remove("selected");
      this.classList.add("selected");
      if(this.textContent.toLowerCase() === "easy") {
        difficulty = easy;
        reset(easy);
      } else {
        difficulty = hard;
        reset(hard);
      }
    });
  }

  resetButton.addEventListener("click", function() {
    reset(difficulty);
    resetButton.textContent = "New Game";
  });
}

// changes colors
function change() {
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = pickedColor;
  }
  h1.style.backgroundColor = pickedColor;
}

// generates colors using math.random
function generate(num) {
  colors = [];
  for(var i = 0; i <= num - 1; i++) {
    // random rgb() color
    colors[i] = `rgb(${(Math.floor(Math.random()*255))}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
    squares[i].style.backgroundColor = colors[i];
  }
}

// resets the game based on the most recently selected difficulty
function reset(num) {
  resetButton.textContent = "New Game";
  h1.style.backgroundColor = "steelblue";
  generate(num);
  pickedColor = colors[Math.floor(Math.random() * num)];
  rgb.textContent = pickedColor;
  message.textContent = "";
  for(var i = 0; i < squares.length; i++) {
    if(colors[i]) {
      squares[i].style.display = "block";
    } else {
      squares[i].style.display = "none";
    }
  }
}