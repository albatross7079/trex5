//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOver, restart,gameOverImage,restartImage, backGroundImg;

var score;



function preload(){
  
  backGroundImg = loadImage("ground.png");
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  obstacle7 = loadImage("obstacle7.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  canvas = createCanvas(displayWidth-20,displayHeight-30);
  
  textSize(30); 
  stroke("black");
  strokeWeight(3);
  fill("red");
  textStyle("algerian");
  
  trex = createSprite(displayWidth/2-500,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,displayHeight/3-65,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(500,200,displayWidth+displayWidth,20);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
//display gameOver and restart icon on the screen
   gameOver = createSprite(displayWidth/2-200,200);
   restart = createSprite(displayWidth/2-200,150);
   gameOver.addImage("gameOver",gameOverImage);
   gameOver.scale = 0.5;
   restart.addImage("restart",restartImage);
   restart.scale = 0.5;

   gameOver.visible = false;
   restart.visible = false;
   score = 0;
}

function draw() {
 
  text("Score: "+ score, 600,50);
  background(backGroundImg);


  if(gameState===PLAY)  {
  score = score + Math.round(getFrameRate()/60);
  
  console.log(trex.position.y);
  if(keyDown("UP_ARROW")&&trex.y>=166) {
    trex.velocityY = -20;
    //playSound("sound.mp3");  
  }
  
  // camera.position.x = displayWidth;
  if(keyDown("right"))  {
    trex.velocityX = 10;
  }
  else{
    trex.velocityX = ground.velocityX;
  }
  
 // if(keyDown("left"))  {
   // trex.velocityX = -10;
  //}else{
   // trex.velocityX =
 /// }

  trex.velocityY = trex.velocityY + 1.2;
  ground.velocityX = -8;
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnObstacles();
  
   //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(trex)){
    gameState = END;
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.position.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  drawSprites();
    
}



function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  trex.x = 170;
  
  score = 0;
  
}
  
  function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1200,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.8;
    cloud.velocityX = -5;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1400,170);
    obstacle.scale = 1;
    //generate random obstacles
    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      case 7: obstacle.addImage(obstacle7);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstaclesGroup.setVelocityXEach(-8);
  }
}