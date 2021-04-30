var balloon,database,position;
var ball,toroto;
function preload(){
  ball = loadImage("balloon.png");
  toronto= loadImage("toronto.jpg")
}
function setup() {
  database =firebase.database();
  console.log(database);
  createCanvas(1200,700);
 balloon =  createSprite(600, 350, 50, 50);
 balloon.addImage(ball)
 balloon.scale=0.3

 var ballposition = database.ref('balloon/position');
 ballposition.on("value",readPosition,showError);
}

function draw() {
  background(toronto); 
  
  if(keyDown (LEFT_ARROW)){
    changePosition(-1,0);
  } 
  else if (keyDown(RIGHT_ARROW)){
    changePosition(+1,0);
  }
  else if (keyDown(UP_ARROW)){
    changePosition(0,-1);
  }
    else if (keyDown(DOWN_ARROW)){
      changePosition(0,+1);
    }
    fill("black")
    textSize(30)
  text("Use the arrow keys to move the balloon!!",100,100)
  drawSprites();
}
function changePosition(x,y){
  database.ref('balloon/position').set({
  'x':position .x + x,
  'y':position .y+y
})
}
function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}
function showError(){
  console.log("Error Occured")
}