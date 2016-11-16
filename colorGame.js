var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#messageDisplay");
var numSquares = 6;
var colors = [];
var pickedColor;

// This function will initiate first
init();

// init calls the functions setupSquares and setupModeButtons and reset functions
function init(){
  setupSquares();
  setupModeButtons();

  reset();
}
// Changes the text content of the rgb span to the color picked randomly
colorDisplay.textContent = pickedColor;

// Iterate through each square and add an event listener function to it
// For each square, initialize a clickedColor variable and store the current
// the square's color in it.
// If the clickedColor matches the pickedColor (randomly picked color),
// the message content will display correct, and changes the of all squares to the correct square
// change the text content of the reset button to Play Again
// If the clickedColor does not match, change display content to try again and
// make the clicked squares "disappear"
function setupSquares(){
  for(var i = 0; i < squares.length; i++){
    squares[i].addEventListener("click", function(){
      var clickedColor = this.style.background;
      if(clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
        resetBtn.textContent = "Play Again?";
      }
      else{
        messageDisplay.textContent = "Try Again!";
        this.style.background = "#232323";
      }
    });
  }
}

// Iterate through all all the buttons and remove the selected attribute
// If a certain button is clicked, add the selected class
// If you clicked on the easy button, numSquares is 3, vice versa 6
// Then reset
function setupModeButtons(){
  for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      if(this.textContent === "Easy"){
        numSquares = 3;
      }
      else{
        numSquares = 6;
      }
      reset();
    });
  }
}

resetBtn.addEventListener("click", function(){
  reset();
});

function reset(){
  messageDisplay.textContent = "";
  h1.style.background = "steelblue";
  colors = generateRandomColor(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetBtn.textContent = "New Colors";
  for(var i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block"
      squares[i].style.background = colors[i];
    }
    else{
      squares[i].style.background = "none";
    }
  }
}

function changeColors(color){
  for(var i = 0; i < colors.length; i++){
    squares[i].style.background = color;
  }
}


// This function randomly picks a color from the colors array that
// was genreated from generateRandomColor
function pickColor(){
  var randomNum = Math.floor(Math.random() * colors.length);

  return colors[randomNum];
}

// Have this function pass a 3 or a 6 and generate
// an array of size 3 or 6 and make random colors
// and add it into the array and return the array when done.
function generateRandomColor(num){
  var arr = [];

  for(var i = 0; i < num; i++){
    arr.push(randomColor());
  }

  return arr;
}

// Generate a random number between 0-255
// for each r g b color code.
function randomColor(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}
