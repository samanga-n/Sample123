var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["6cee8ab7-5ec2-4e43-bf43-432121abd2bb"],"propsByKey":{"6cee8ab7-5ec2-4e43-bf43-432121abd2bb":{"name":"golfball_1","sourceUrl":"assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var ball;
var score = 0;

ball = createSprite(200,200,10,10);
ball.setAnimation("golfball_1");
ball.scale = 0.05;

var paddle = createSprite(200, 350, 120, 10);
paddle.shapeColor = "blue";

createEdgeSprites();

var bricks = createGroup();


var gameState="serve";



function createBrickRow(y, color) {
  for(c=0; c<6; c++)
  {
    var brick = createSprite(65+54*c,y,50, 25);
    brick.shapeColor = color;
    bricks.add(brick);
  }
}

createBrickRow(65, "red");
createBrickRow(65+29, "orange");
createBrickRow(65+29+29, "green");
createBrickRow(65+29+29+29, "yellow");

function draw() {
  background("black");
  
  if(gameState==="serve"){
    text("Click to serve the ball",150,250)
  
  }
  textSize(20);

  text("Score: "+score,40,25);
  
  paddle.x = World.mouseX;
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }
  drawSprites();
  //rotation = rotation + 5;
  ball.bounceOff(topEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  //ball.bounceOff(paddle);
  ball.bounceOff(bricks, brickHit);
  if(ball.bounceOff(paddle))
  {
    playSound("assets/category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3");
  }
  if(!bricks[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("Well Done!!",150,200);
  }
}

function mousePressed()
{  
  if(gameState==="serve"){
    ball.velocityX = 10;
    ball.velocityY = 6;
    gameState="play";
  }
}

function brickHit(ball, brick) {
 playSound("assets/category_hits/puzzle_game_button_04.mp3");
 brick.remove();
 score = score+5;
  
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
