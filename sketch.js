var play = 1;
var end = 0;
var gameState = 1;

var rocket, rocketImage;
var buzzBee,buzzBeeImage;
var star,starImage;
var bg, bgImage;
var score = 0;
var meteors, meteorImage, meteorGroup;
var gameover, gameoverImage;
var playAgain, playagainImage;
var edges;

function preload() {

  bgImage = loadImage("space.jpg");
  starImage = loadImage ("star4.png");
  buzzBeeImage = loadImage("flying_bee2.png");
  rocketImage = loadImage("rocket.png");
  meteorImage = loadImage("meteors.png");
  gameoverImage = loadImage("gameover.jpg");
  playagainImage = loadImage("unnamed.png");

}

function setup() {

  createCanvas(1500,950);

  
  bg = createSprite(550, -100,300,20);
  bg.addImage(bgImage);
  bg.scale = 1;

  star = createSprite(350, 200, 20, 20);
  star.addImage(starImage);
  star.scale = 0.5;

  buzzBee = createSprite(450, 500, 20, 20);
  buzzBee.addImage(buzzBeeImage);
  buzzBee.scale = 0.2;

  rocket = createSprite(350, 500, 20, 20);
  rocket.addImage(rocketImage);
  rocket.scale = 0.2;

  


  //var edges = createEdgeSprites();
  //rocket.collide(edges[1]);
 // rocket.collide(edges[0]);


 gameover = createSprite(width/2-60,camera.position.y,100,100);
 gameover.addImage(gameoverImage);
 gameover.scale = 3.4;

 playAgain = createSprite(width/2-60, camera.position.y+200,100,100);
 playAgain.addImage(playagainImage);
 meteorGroup = new Group();
 bg.velocityY = -3;

}

function draw() {

  
  background("black");

  

  if (gameState === 1) {

    meteor();
   console.log(bg.y)
   bg.velocityY = -3;
    playAgain.visible = false;
   gameover.visible = false;
    

    rocket.visible = true;
    buzzBee.visible = true;
   

    if (frameCount % 20 === 0) {
      score = score + 1;
    }

    if (bg.y < -20) {
      bg.y = 300;
    }

    if (keyDown(87)) {
      rocket.velocityY = -5;
      
    }

    if (keyDown(87)) {
      buzzBee.velocityY = -5;
      
    }

    if (keyDown(87)) {
      star.velocityY = -5;
      
    }

    if (keyDown(83)) {
      rocket.velocityY = 5;

    }

    if (keyDown(83)) {
      buzzBee.velocityY = 5;

    }

    if (keyDown(83)) {
      star.velocityY = 5;

    }

    if(keyDown(65)) {
      rocket.velocityX = -5;
    }

    if(keyDown(65)) {
      buzzBee.velocityX = -5;
    }

    if(keyDown(68)) {
      rocket.velocityX = 5;
    }

    if(keyDown(68)) {
      buzzBee.velocityX = 5;
    }

    if(keyDown(65)){
      star.velocityY = 2;
    }

    if (score === 100) {
      gameState = 2;
    
    }


    if (rocket.isTouching(meteorGroup)) {
      meteorGroup.destroyEach()
      gameState = 0;
    }

    if (buzzBee.isTouching(meteorGroup)) {
      meteorGroup.destroyEach()
      gameState = 0;
    }

    camera.position.x = displayWidth/2;
    camera.position.y = rocket.y;
    camera.position.y = buzzBee.y;
  }

  if (gameState === 0) {
    // rocket.lifetime = 1;

    bg.velocityY = 0;
    playAgain.visible = true;
    gameover.visible = true;

    rocket.visible = false;
    rocket.velocityX = 0;
    rocket.velocityY = 0;

    buzzBee.visible = false;
    buzzBee.velocityX = 0;
    buzzBee.velocityY = 0;


    if (mousePressedOver(playAgain)) {
  
      reset();
      
    }
    
 
  }

  if(gameState === 2){
    textSize(50);
    fill("orange");
    text("Congratulations",270,400);
    text("YOU WON THE GAME",200,465);

    playAgain.visible = true;

    if (mousePressedOver(playAgain)) {
      console.log("click")
      
      reset();
      
    }

  }
  

  drawSprites();

  textSize(30);
  fill("orange");
  text("Score:" + score, 50, rocket.y-400);

}

function meteor() {
  if (frameCount % 10 === 0) {
    meteors = createSprite(50, 200);
    meteors.y = Math.round(random(-5000, 5000));
    meteors.addImage(meteorImage);
    meteors.scale = 0.2;
    meteors.velocityX = score / 1;
    meteors.lifetime = 400;

    meteorGroup.add(meteors);
  }
}

function reset() {
  console.log("reset")
  meteorGroup.destroyEach();
  gameState = 1;
  score = 0;
  rocket.x = width/2-100;
  rocket.y = height/2;
  rocket.velocityX = 0;
  rocket.velocityY = 0;
  buzzBee.x = width/2-100;
  buzzBee.y = height/2;
  buzzBee.velocityX = 0;
  buzzBee.velocityY = 0;
  playAgain.visible = false;
  gameover.visible = false;
  
}