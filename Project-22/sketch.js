//creating variables
var starImg,bgImg;
var star, starBody;
var fairy,fairyImg;

//extracting constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){

	//loading images,animations and sounds
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");
	fairyImg=loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	music=loadSound("sound/JoyMusic.mp3");
}

function setup() {
	//creating canvas
	createCanvas(800, 750);
   //playing sound
	music.play();
	//creating sprites and describing properties
	fairy=createSprite(150,500);
	fairy.addAnimation("fairy",fairyImg);
	fairy.scale=0.25;
	fairy.setCollider("rectangle",500,0,250,100);

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;
    
	

	//creating engine and world
	engine = Engine.create();
	world = engine.world;

	//creating body of te star sprite
	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});

	//writing code to run the physics engine
	World.add(world, starBody);
	Engine.run(engine);
}

function draw() {
	//adding background image
	background(bgImg);
	
	//creating edge sprites
	edges=createEdgeSprites();

	//writing code to collide the fairy sprite with the edges
	fairy.collide(edges);

	//relating coordinates
	star.x= starBody.position.x;
	star.y= starBody.position.y;

	//adding functions 
	movement();
	keyPressed();

	//writing code to stop the star in the hand of the fairy
	if(star.isTouching(fairy)){
	fairy.velocityX=0;
	Matter.Body.setStatic(starBody,true);
	}

	//drawing sprites
	drawSprites();
}

//describing functions

//function to  make the star sprite fall
function keyPressed() {
	if (keyCode === DOWN_ARROW) {
	Matter.Body.setStatic(starBody,false); 
	}
}

//function to make the fairy move left and right
function movement(){
	if(keyDown(LEFT_ARROW)){
	fairy.velocityX=-1;
	}
	if(keyDown(RIGHT_ARROW)){
	fairy.velocityX=1;
	}
}
