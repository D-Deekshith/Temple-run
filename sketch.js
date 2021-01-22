var backgroundImg;
var boy,boyImg;
var bg;
var enemy,enemyImg;
var coinImg;
var score = 0;
var coins = 0;
var highScore = 0;
var coinsGroup;
var obstacleImg;
var obstacleGroup;
var death1Img;
var PLAY;
var END;
var gameState;
var jump;
var reset;

function preload(){
  backgroundImg = loadImage('images/background2.png');
  coinImg = loadAnimation('images/coin1.png','images/coin2.png','images/coin3.png','images/coin4.png','images/coin5.png','images/coin6.png','images/coin7.png','images/coin8.png')
  enemyImg = loadAnimation('images/ene4.png','images/ene3.png','images/ene2.png','images/ene1.png')
  obstacleImg = loadImage('images/obstacles.png');
  death1Img = loadImage('images/temple run  after death.png');
  boyImg = loadAnimation('images/boy1.png','images/boy2.png','images/boy3.png','images/boy4.png','images/boy5.png','images/boy6.png','images/boy7.png','images/boy8.png');
}

function setup() {
  createCanvas(580,800);
  
  bg = createSprite(290,0,10,10);
  bg.addImage("bg",backgroundImg);
  bg.scale = 1.7;
  bg.velocityY = 10;

  jump = 0;

  boy = createSprite(300,600,10,10);
  boy.addAnimation('boy',boyImg);
  boy.scale = 1.5;

  enemy = createSprite(300,730,10,10);
  enemy.addAnimation('enemy',enemyImg);
  enemy.scale = 2;

  coinsGroup = new Group();
  obstacleGroup = new Group();

  reset = createButton("RESET");
  reset.position(510,760);
  reset.style('background','yellow');
  reset.style('color','blue');
  reset.hide();

  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function draw() {
  background("skyblue");
  
  if(gameState === PLAY){
    if(keyDown(RIGHT_ARROW)){
      boy.x += 10;
    }

    if(keyDown(LEFT_ARROW)){
      boy.x -= 10;
    }

    if(keyDown(UP_ARROW)){
      jump = 1;
    }

    bg.velocityY = 10;

    bg.height = height/2;  

  enemy.x = boy.x +0;

    if(bg.y > 800){
      bg.y = 0
    }

    if(keyWentUp(UP_ARROW)){
      jump = 0;
    }

    if(boy.y <= 50){
      boy.y = 600;
    }

    console.log(jump);

    if(coinsGroup.isTouching(boy)){
      coinsGroup.destroyEach();
      coins += 1;
    }

    if(obstacleGroup.isTouching(boy) && jump === 0){
      gameState = END;
    }

    reset.hide();

    score = score + Math.round(getFrameRate()/30);

  spawnCoins();
  spawnObstacles();
  }

  else if(gameState === END){
    jump = 0;
    boy.visible = false;
    obstacleGroup.visible = false;
    enemy.visible = false;
    coinsGroup.visble = false;
    bg.addImage("bg",death1Img);
    bg.scale = 2;
    bg.velocityY = 0;
    bg.y = +400;
    coinsGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    coinsGroup.setVelocityYEach(0);
    obstacleGroup.setVelocityYEach(0);
    coinsGroup.destroyEach();
    obstacleGroup.destroyEach();
    coinsGroup.y = -100;
    obstacleGroup.y = -100;
    reset.show();

    if(highScore < score){
      highScore = score
    }

    reset.mousePressed(function(){
      boy.visible = true;
      enemy.visible = true;
      gameState = PLAY;
      score = 0;
      bg.addImage("bg",backgroundImg);
      boy.y = 600;
      coins = 0;
      boy.x = 290;
    });
  }

  edges = createEdgeSprites();
  boy.bounceOff(edges[0]);
  boy.bounceOff(edges[1]);

  drawSprites();

  fill("red");
  textSize(20);
  strokeWeight(2.5);
  stroke("red");
  text("Score : "+score,400,50);
  text("Coins : "+coins,400,100);
  text("High Score : "+highScore,200,50);
}

function spawnCoins(){
  if(frameCount % 80===0){
    var coin = createSprite(random(40,540),0,10,10);
    coin.addAnimation("coin",coinImg);
    coin.scale = 0.5
    coin.velocityY = 10;
    coin.depth = enemy.depth;
    coin.depth = coin.depth-1

    coinsGroup.add(coin);
  }
}

function spawnObstacles(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(290,0,10,10);
    obstacle.addImage("obstacle",obstacleImg);
    obstacle.scale = 2;
    obstacle.velocityY = 10;
    obstacle.depth = boy.depth;
    boy.depth = boy.depth+1;

    obstacleGroup.add(obstacle);
  }
}