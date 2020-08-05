var player, player_running, player_collided;
var ground, invisibleGround, groundImage;
var backgroundImg, background1
var playerImg;
var player1Img
var PLAY = 1
var END = 0
var gameState = PLAY
var birdsGroup, birdImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOverImg
var restartImg

var score;


function preload(){
  playerImg = loadAnimation("Images/player1.png","Images/player2.png","Images/player3.png")
  player1Img = loadImage("Images/player1.png")
  obstacleImg = loadImage("Images/coin.png");
 enemyImg = loadImage("Images/enemy.png");
 backgroundImg = loadImage("Images/background.png")
 birdImage = loadImage("Images/bird.png");
 gameOverImg = loadImage("Images/gameOver.jpeg")
 restartImg = loadImage("Images/restart.png")
  //player_running = loadAnimation("player1.png","player3.png","player4.png");
  
  /*player_collided = loadImage("player_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  

  
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  */
}


function setup() {
  createCanvas(600, 200);
  
  player = createSprite(50,180,20,50);
  player.addAnimation("running", playerImg);
  player.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.visible = false
  //ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  birdsGroup = new Group();
  obstaclesGroup = new Group();
  enemysGroup = new Group();
  
  var gameOver = createSprite(50,50,90,20);
  var restart = createSprite(50,60,70,20);
  
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;
  restart.addImage(restartImg);
  restart.scale = 0.2;
  gameOver.visible = false
  restart.visible = false
  
  score = 0;
}

function draw() {
  background(backgroundImg);
  text("Score: "+ score, 500,50);
  if(gameState === PLAY){
    if(keyDown("space")) {
      player.velocityY = -10;
    }
    
    player.velocityY = player.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  
    if(player.isTouching(obstaclesGroup)){
  score = score+5
  
  
    }
    if(player.isTouching(enemysGroup)){
     gameState = END
    }
    spawnbirds();
  spawnObstacles();
  spawnEnemies();
    
  }
  else if(gameState===END){
    
ground.velocityX = 0
player.velocityY = 0

obstaclesGroup.setVelocityXEach(0);
    birdsGroup.setVelocityXEach(0);
    enemysGroup.setVelocityXEach(0);
    
    //change the trex animation
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    birdsGroup.setLifetimeEach(-1);
    enemysGroup.setLifetimeEach(-1);
    console.log("game end")
    gameOver.visible = true
  restart.visible = true
    player.changeAnimation(player1Img)
  }
 
  
  
  
 
 
  
  player.collide(invisibleGround);
  
  drawSprites();
  
}
function reset(){

}

function spawnbirds() {
  //write code here to spawn the birds
  if (frameCount % 60 === 0) {
    var bird = createSprite(600,120,40,10);
    bird.y = Math.round(random(80,120));
    bird.addImage(birdImage);
    bird.scale = 0.1
    bird.velocityX = -3;
    
     //assign lifetime to the variable
    bird.lifetime = 200;
    
    //adjust the depth
    bird.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each bird to the group
    birdsGroup.add(bird);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    obstacle.addImage(obstacleImg)
    //generate random obstacles
    //var rand = Math.round(random(1,6));
    /*switch(rand) {
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
      default: break;
    }
    */
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
  
}
function spawnEnemies(){
  if(frameCount % 100 ===0){
    var enemy = createSprite(600,165,10,40);
    enemy.velocityX = -4
    enemy.addImage(enemyImg)
    enemy.scale = 0.3
    enemy.lifetime = 300;
    enemysGroup.add(enemy);

  }
}

