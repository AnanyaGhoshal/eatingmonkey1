var ground, groundImg;
var invisibleground;
var monkey , monkeyrunning;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImg;
var survivaltime;
var gameoversound;
var monkeycollided;
//var jump;
function preload(){
  

monkeyrunning = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeycollided = loadAnimation("monkey.png");
  groundImg = loadImage("ground.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartImg = loadImage("reset.png");
  gameoversound = loadSound("gameover.wav");
 // jump = loadSound("jump.mp3");
}



function setup() {
 
  createCanvas(400,400);
  
  
  ground = createSprite(300,0.1,600,1);
  ground.addImage(groundImg);
  ground.scale = 1;
  ground.x = ground.width/2;
  monkey = createSprite(100,380,10,10);
  monkey.addAnimation("running",monkeyrunning);
  monkey.addAnimation("collided",monkeycollided);
  monkey.scale = 0.1;
  
 
  invisibleground = createSprite(300,405,600,10);
  invisibleground.visible = false;
  FoodGroup = createGroup();
  obstacleGroup = createGroup(); 
  score = 0;
  survivaltime = 0;
  restart = createSprite(200,200,10,10);
  restart.addImage(restartImg);
  //restart.debug = true;
  restart.scale = 0.1;
   
}


function draw() {

  if (gameState === PLAY){
     restart.visible = false;
     ground.velocityX = -(6+survivaltime/150);
     spawnFoods();
     spawnObstacles();
     if (keyDown("space") && monkey.y>=350){
         monkey.velocityY = -12;
         
    
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+1;
  }
  
  survivaltime = survivaltime+Math.round(getFrameRate()/60);
    
  if (monkey.isTouching(obstacleGroup)){
     monkey.changeAnimation("collided", monkeycollided);
     restart.visible = true;
     gameState = END;
     gameoversound.play(); 
  }
   }  else if (gameState === END){
   
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    ground.velocityX = 0;  
    monkey.velocityY = 0;
   
      
    }
  
    
    if (gameState === END && mousePressedOver(restart)){
         reset();
  }
  
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  
  monkey.collide(invisibleground);
  
  
 
  drawSprites();
  fill("black");
  textSize(10);
  text("Survival Time: "+survivaltime,180,20);
  fill("black");
  textSize(10);
  text("Score:" +score,350,50);
  if (gameState === END){
    
    fill("red");
    textSize(20);
    text("Game Over",150,180);
    
  }
}

function spawnFoods(){
  if (frameCount % 80 === 0){
  var banana = createSprite(550,50,10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -(6+survivaltime/150);
  banana.lifetime = 140; 
  banana.y = Math.round(random(220,300));
  FoodGroup.add(banana);
  }
 
}
 
function spawnObstacles(){
  if (frameCount % 200 === 0){
    var obstacles = createSprite(590,380,10,10);
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.1;
    obstacles.velocityX = -(6+survivaltime/150);
    obstacles.lifetime = 140;
    obstacleGroup.add(obstacles);
  }
}

function reset(){
  gameState = PLAY;
  monkey.changeAnimation("running",monkeyrunning);
  restart.visible = false;
  score = 0;
  survivaltime = 0;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
}



