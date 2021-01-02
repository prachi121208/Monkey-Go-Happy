
var ground;
var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score;
var PLAY=1;
var END=0;
var gameState=PLAY;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

 
}

function setup(){
  createCanvas(600,200);
  ground=createSprite(300,195,600,20);
  
  monkey = createSprite(50,180,20,50);
  
  monkey.addAnimation("running", monkey_running);

  monkey.scale = 0.12;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw (){
  background("white");
  
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {
   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    //change the monkey animation
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    /*if(mousePressedOver(restart)) {
      reset();
    }*/
  }
  
  
  drawSprites();
}

function spawnFood() {
  //write code here to spawn the banana
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.12;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6
    
    //generate random obstacles
    obstacle.addImage(obstaceImage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  