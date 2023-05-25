let equation1, equation2;
let sum;
let points = 0;
let generateNewEquation = false;
let newEquation1, newEquation2, newSum;


sum = equation1 + equation2;
let sum2 = Math.floor(Math.random() * 21);






let correctArray = [];
let wrongArray = [];
let numberArray = [1, 2, 3];

let myLeft, myRight, myTop, myBottom;
let ballLeft, ballRight, ballTop, ballBottom;


let gameContinue = false; 
let gameOver = false;

let appleImage; 
let puffleImage;

let eatingSound;

let start = false;
let restart = false; 

let win = false; 

function preload() {
  appleImage = loadImage("images/apple.png");
  puffleImage = loadImage("images/puffle.webp");

  eatingSound = new Audio("sounds/eating.mp3");
}

function setup() {
    createCanvas(400, 600);
    
   
    for (let i = 0; i < 1; i++) {
      let temp = new Correct(random(0, 400), 0, 255, 0, 0, random(3,6));
      correctArray.push(temp);
  } 

  for (let i = 0; i < 3; i++) {
    let temp1 = new Wrong(random(0, 400), 0, 255, 0, 0, random(3,6));
    wrongArray.push(temp1);
  }


  }
  
  function generateEquation() {
    equation1 = Math.floor(Math.random() * 11);
    equation2 = Math.floor(Math.random() * 11);
    sum = equation1 + equation2;
  }

  generateEquation();

class Correct {
  constructor(x, y, r, g, b, speed) {
    this.xPos = x;
    this.yPos = y; 
    this.redValue = r;
    this.greenValue = g;
    this.blueValue = b;
    this.speedValue = speed; 
  }
  hit() {
    
    points += 25;
    generateNewEquation = true;
    newEquation1 = Math.floor(Math.random() * 11);
    newEquation2 = Math.floor(Math.random() * 11);
    newSum = newEquation1 + newEquation2;
    this.visible = false; // Set the block as invisible when hit
    setTimeout(this.respawn.bind(this)); // Respawn the block after 2 seconds
    eatingSound.currentTime = 0.1;
    eatingSound.play();
    
  }

  respawn() {
    this.xPos = random(0, 400); // Reset the position
    this.yPos = 0;
    this.visible = true; // Set the block as visible again
  }
  
}

  function draw() {

    background(220);
    
    // Draw the ball
    
    let equationX = width / 2;
    let scoreX = width/2;
   
    textAlign(CENTER, CENTER);

    fill(200, 50, 250)
    image(puffleImage, mouseX, 550, 60, 50);

    if (mouseX > 340) {
      mouseX = 340;
    } 

    if (mouseX < 0) {
      mouseX = 0;
    }

   

    for (let i = 0; i < correctArray.length; i++) {
      noStroke();

      fill(correctArray[i].redValue, correctArray[i].greenValue, correctArray[i].blueValue)
      image(appleImage, correctArray[i].xPos, correctArray[i].yPos, 50, 50);
      
      correctArray[i].yPos += correctArray[i].speedValue;
      
      fill(255);
      textSize(20);
      text(sum, correctArray[i].xPos + 25, correctArray[i].yPos + 25);

      

      if (correctArray[i].yPos > 600) {
        correctArray[i].yPos = 0;
        correctArray[i].xPos = random(0,340);
      }

      if (correctArray[i].yPos > 600) {
        correctArray[i].respawn(); // Respawn the block when it reaches the bottom
      }

      if (checkCollision(correctArray[i].xPos, correctArray[i].yPos, 50, 50)) {
        correctArray[i].hit(); // Call the hit method when the paddle hits the correct block
      }
      
    }

    if (generateNewEquation) {
      equation1 = newEquation1;
    equation2 = newEquation2;
    sum = newSum;
    generateNewEquation = false;
    }

    fill(0);
    textSize(50);
    text(equation1 + "+" + equation2, equationX, 100);
    textSize(20);
    text("Your Score: " + points, scoreX, 50);
    
    for (let i = 0; i < wrongArray.length; i++) {
      noStroke();

      fill(wrongArray[i].redValue, wrongArray[i].greenValue, wrongArray[i].blueValue)
      image(appleImage,wrongArray[i].xPos, wrongArray[i].yPos, 50, 50);
    
      wrongArray[i].yPos += wrongArray[i].speedValue;
      

      fill(255);
      textSize(20);
      text(numberArray[i], wrongArray[i].xPos + 25, wrongArray[i].yPos + 25);

      if (numberArray[i] == sum) {
        numberArray[i] = Math.floor(Math.random() * 20);
      }


      if (wrongArray[i].yPos > 600) {
        wrongArray[i].yPos = 0;
        wrongArray[i].xPos = random(0,340);
        
        let randomNumber = Math.floor(Math.random() * 20);
        numberArray[i] = randomNumber;
      }


      if (checkCollision(wrongArray[i].xPos, wrongArray[i].yPos, 40, 40)) {
        gameOver = true;
      }
    }

    myLeft = mouseX;
    myRight = mouseX + 60;
    myTop = 550;
    myBottom = 570;

    if (gameOver == true) {
      fill(255, 0, 0);
      textSize(50);
      text("Game Over", width / 2, height / 2);
      textSize(20);
      text("Now click restart on the top", width / 2, height / 1.75)
      text("to play again!", width / 2, height / 1.65);
      noLoop();
    } 

    
   

  }

  function checkCollision(x, y, w, h) {
    ballLeft = x;
    ballRight = x + w;
    ballTop = y;
    ballBottom = y + h;

    if (myLeft <= ballRight && 
      myRight >= ballLeft &&
      myTop <= ballBottom && 
      myBottom >= ballTop) {
        return true;
      } 

      return false;
  }

 


  class Wrong {
    constructor(x, y, r, g, b, speed) {
      this.xPos = x;
      this.yPos = y; 
      this.redValue = r;
      this.greenValue = g;
      this.blueValue = b;
      this.speedValue = speed; 
    }
  }



  function refreshPage() {
    location.reload(); // Refresh the page
  }