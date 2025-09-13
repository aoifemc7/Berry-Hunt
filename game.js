
// game where you must collect strawberries but you take damage from bees and roses

// my loops weren't working, sorry for the repeating code

let requestId;
let canvas;
let context;

let fpsInterval = 1000 / 30; // the denominator is frames per second
let now;
let then = Date.now();

// background of grey bar
let healthBar = {
  x: 160,
  width: 250,
  height: 20,
};
// actual health level on bar
let health = {
  max: 248,
  x: 161,
  width: 248,
  height: 18,
};

let totalStrawberries = 10;

let player = {
  x: 0,
  y: 0,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 10
}
let beeUp = {
  x: 0,
  y: 0,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: randint(1, 3),
  yChange: randint(1, 3),
  size: 20
}
let beeDown = {
  x: 0,
  y: 0,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: randint(-1, 1),
  yChange: randint(-1, 1),
  followX: 0,
  followY: 0,
  size: 20
}

// player.frameX = (player.frameX + 1) % 4
let floor;
let playerImage = new Image();
let gardenImages = new Image();
let backgroundImage = new Image();
let tilesPerRow = 4;
let tilesPerCol = 4;
let tileSize = 32;
let num_cols = 40;
let num_rows = 32;

let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;

let background = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
]

// this line calls the function, its all about timing, don't want to call the function to early
// runs function only when DOMContentLoaded, essentially when the whole website has been built, happens in ms, prevents premature initialisation
document.addEventListener("DOMContentLoaded", init, false);


// function instead of def then also name, then also names of pieces of data you feed into function, js knows function ended with squiggly brackets not indentation
function init() {
  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");
  playerImage.src = "uwo.png";

  player.x = canvas.width / 2;
  player.y = canvas.height / 2;


  window.addEventListener("keydown", activate, false);
  window.addEventListener("keyup", deactivate, false);

  // fixes a delay if something lads slowly
  load_assets([
    { "var": playerImage, "url": "uwo.png" },
    { "var": gardenImages, "url": "garden.png" },
    // {"var": backgroundImage, "url": "tiles.png"}
  ], draw);
}

function draw() {
  requestId = window.requestAnimationFrame(draw);
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed <= fpsInterval) {
    return;
  }
  then = now - (elapsed % fpsInterval);

  // Draw background 
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgb(128, 153, 94)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  //   for (let r= 0; r < 32; r += 1) {
  //     for (let c = 0; c < 40; c += 1) {
  //       let tile = background[r][c];
  //       if (tile >= 0) {
  //         let tileRow = Math.floor(tile / tilesPerRow);
  //         let tileCol = Math.floor(tile % tilesPerCol);
  //         context.drawImage(backgroundImage, tileCol * tileSize, tileRow * tileSize, tileSize, tileSize, c * tileSize, r * tileSize, tileSize, tileSize);
  //       }
  //     }
  //   }

  // draw player
  drawPlayer()
  updatePlayerPosition()
  handlePlayerMovement()

  // draw bees
  drawBees()
  updateBeePosition()
  handleBeeMovement()

  // draw other items
  drawItems()
  drawPlantsFImages()
  drawPlantImages()

  // stay on screen
  stayOnScreen()

  //barricades()

  // speed - friction
  player.xChange *= 0.5;
  player.yChange *= 0.5;

  //collided()
  collisionEnemy(beeDown)
  collisionEnemy(beeUp)
  collisionEnemy(rose)
  collisionEnemy(rose2)
  collisionEnemy(rose3)
  collisionEnemy(rose4)
  collisionEnemy(rose5)
  collisions()
  collisionsPlus()
  collisionStrawberries(player, strawberry)
  collisionStrawberries(player, strawberry2)
  collisionStrawberries(player, strawberry3)
  collisionStrawberries(player, strawberry4)
  collisionStrawberries(player, strawberry5)
  collisionStrawberries(player, strawberry6)
  collisionStrawberries(player, strawberry7)
  collisionStrawberries(player, strawberry8)
  collisionStrawberries(player, strawberry9)
  collisionStrawberries(player, strawberry10)


  // draw health bar
  context.fillStyle = "grey";
  context.fillRect(healthBar.x, canvas.height - 30, healthBar.width, healthBar.height);

  context.fillStyle = "pink";
  context.fillRect(health.x, canvas.height - 29, health.width, health.height);

  let outcome_element = document.querySelector("#strawberries");
  outcome_element.innerHTML = totalStrawberries

  if (totalStrawberries == 0) {
    youLose("You Win!")
  }
}

function updatePlayerPosition() {
  player.x += player.xChange;
  player.y += player.yChange;
}
function handlePlayerMovement() {
  if (moveLeft) {
    player.xChange -= 3;
    player.frameY = 1;
  }
  if (moveRight) {
    player.xChange += 3;
    player.frameY = 3;
  }
  if (moveUp) {
    player.yChange -= 3;
    player.frameY = 2;
  }
  if (moveDown) {
    player.yChange += 3;
    player.frameY = 0;
  }
  if (
    moveLeft ||
    moveRight ||
    ((moveUp || moveDown) && !(moveLeft && moveRight) && !(moveUp && moveDown))
  ) {
    player.frameX = (player.frameX + 1) % 4;
  }
}

function updateBeePosition() {
  // flying bee
  beeUp.x = beeUp.x + beeUp.xChange
  beeUp.y = beeUp.y + beeUp.yChange

  // crawling bee
  beeDown.x = beeDown.x + beeDown.xChange
  beeDown.y = beeDown.y + beeDown.yChange
}
function handleBeeMovement() {
  // flying bee
  if (beeUp.x > canvas.width || beeUp.x < 0) {
    beeUp.xChange = - beeUp.xChange;
  }
  if (beeUp.y > canvas.height || beeUp.y < 0) {
    beeUp.yChange = -beeUp.yChange;
  }
  // crawling bee

  if (player.x > beeDown.x) {
    beeDown.x += 2;
  }
  if (player.x < beeDown.x) {
    beeDown.x -= 2;
  }
  if (player.y > beeDown.y) {
    beeDown.y += 2;
  }
  if (player.y < beeDown.y) {
    beeDown.y -= 2;
  }

}

function stayOnScreen() {
  if (player.x < -7) { // left
    player.x -= player.xChange;
  }
  if (player.x > canvas.width - 25) { // right
    player.x = canvas.width - 25;
  }
  if (player.y < 2) { // top
    player.y -= player.yChange;
  }
  if (player.y > canvas.height - 33) {  //bottom
    player.y = canvas.height - 33;
  }
}

function collisions() {
  collisionBarriers(player, plantFlowers)
  collisionBarriers(player, plantFlowers2)
  collisionBarriers(player, plantFlowers3)
  collisionBarriers(player, plantFlowers4)
  collisionBarriers(player, plantFlowers5)
  collisionBarriers(player, plantFlowers6)
  collisionBarriers(player, plantFlowers7)
  collisionBarriers(player, plantFlowers8)
  collisionBarriers(player, plantFlowers9)
  collisionBarriers(player, plantFlowers10)
  collisionBarriers(player, plantFlowers11)
  collisionBarriers(player, plantFlowers12)
  collisionBarriers(player, plantFlowers13)
  collisionBarriers(player, plantFlowers14)
  collisionBarriers(player, plantFlowers15)
  collisionBarriers(player, plantFlowers16)
  collisionBarriers(player, plantFlowers17)
  collisionBarriers(player, plantFlowers18)
  collisionBarriers(player, plantFlowers19)
  collisionBarriers(player, plantFlowers20)
  collisionBarriers(player, plantFlowers21)
  collisionBarriers(player, plantFlowers22)
  collisionBarriers(player, plantFlowers23)
  collisionBarriers(player, plantFlowers24)
  collisionBarriers(player, plantFlowers25)
  collisionBarriers(player, plantFlowers26)
  collisionBarriers(player, plantFlowers27)
  collisionBarriers(player, plantFlowers28)
  collisionBarriers(player, plantFlowers29)
  collisionBarriers(player, plantFlowers30)
  collisionBarriers(player, plantFlowers31)
  collisionBarriers(player, plantFlowers32)
  collisionBarriers(player, plantFlowers33)
  collisionBarriers(player, plantFlowers34)
  collisionBarriers(player, plantFlowers35)

  collisionBarriers(player, plant)
  collisionBarriers(player, plant2)
  collisionBarriers(player, plant3)
  collisionBarriers(player, plant4)
  collisionBarriers(player, plant5)
  collisionBarriers(player, plant6)
  collisionBarriers(player, plant7)
  collisionBarriers(player, plant8)
  collisionBarriers(player, plant9)
  collisionBarriers(player, plant10)
  collisionBarriers(player, plant11)
  collisionBarriers(player, plant12)
  collisionBarriers(player, plant13)
  collisionBarriers(player, plant14)
  collisionBarriers(player, plant15)
  collisionBarriers(player, plant16)
  collisionBarriers(player, plant17)
  collisionBarriers(player, plant18)
  collisionBarriers(player, plant19)
  collisionBarriers(player, plant20)
  collisionBarriers(player, plant21)
  collisionBarriers(player, plant22)
  collisionBarriers(player, plant23)
  collisionBarriers(player, plant24)
  collisionBarriers(player, plant25)
  collisionBarriers(player, plant26)
  collisionBarriers(player, plant27)
  collisionBarriers(player, plant28)
  collisionBarriers(player, plant29)
  collisionBarriers(player, plant30)
  collisionBarriers(player, plant32)
  collisionBarriers(player, plant32)
  collisionBarriers(player, plant33)
  collisionBarriers(player, plant34)
  collisionBarriers(player, plant35)

  collisionBarriers(beeDown, plantFlowers)
  collisionBarriers(beeDown, plantFlowers2)
  collisionBarriers(beeDown, plantFlowers3)
  collisionBarriers(beeDown, plantFlowers4)
  collisionBarriers(beeDown, plantFlowers5)
  collisionBarriers(beeDown, plantFlowers6)
  collisionBarriers(beeDown, plantFlowers7)
  collisionBarriers(beeDown, plantFlowers8)
  collisionBarriers(beeDown, plantFlowers9)
  collisionBarriers(beeDown, plantFlowers10)
  collisionBarriers(beeDown, plantFlowers11)
  collisionBarriers(beeDown, plantFlowers12)
  collisionBarriers(beeDown, plantFlowers13)
  collisionBarriers(beeDown, plantFlowers14)
  collisionBarriers(beeDown, plantFlowers15)
  collisionBarriers(beeDown, plantFlowers16)
  collisionBarriers(beeDown, plantFlowers17)
  collisionBarriers(beeDown, plantFlowers18)
  collisionBarriers(beeDown, plantFlowers19)
  collisionBarriers(beeDown, plantFlowers20)
  collisionBarriers(beeDown, plantFlowers21)
  collisionBarriers(beeDown, plantFlowers22)
  collisionBarriers(beeDown, plantFlowers23)
  collisionBarriers(beeDown, plantFlowers24)
  collisionBarriers(beeDown, plantFlowers25)
  collisionBarriers(beeDown, plantFlowers26)
  collisionBarriers(beeDown, plantFlowers27)
  collisionBarriers(beeDown, plantFlowers28)
  collisionBarriers(beeDown, plantFlowers29)
  collisionBarriers(beeDown, plantFlowers30)
  collisionBarriers(beeDown, plantFlowers32)
  collisionBarriers(beeDown, plantFlowers32)
  collisionBarriers(beeDown, plantFlowers33)
  collisionBarriers(beeDown, plantFlowers34)
  collisionBarriers(beeDown, plantFlowers35)

  collisionBarriers(beeDown, plant)
  collisionBarriers(beeDown, plant2)
  collisionBarriers(beeDown, plant3)
  collisionBarriers(beeDown, plant4)
  collisionBarriers(beeDown, plant5)
  collisionBarriers(beeDown, plant6)
  collisionBarriers(beeDown, plant7)
  collisionBarriers(beeDown, plant8)
  collisionBarriers(beeDown, plant9)
  collisionBarriers(beeDown, plant10)
  collisionBarriers(beeDown, plant11)
  collisionBarriers(beeDown, plant12)
  collisionBarriers(beeDown, plant13)
  collisionBarriers(beeDown, plant14)
  collisionBarriers(beeDown, plant15)
  collisionBarriers(beeDown, plant16)
  collisionBarriers(beeDown, plant17)
  collisionBarriers(beeDown, plant18)
  collisionBarriers(beeDown, plant19)
  collisionBarriers(beeDown, plant20)
  collisionBarriers(beeDown, plant21)
  collisionBarriers(beeDown, plant22)
  collisionBarriers(beeDown, plant23)
  collisionBarriers(beeDown, plant24)
  collisionBarriers(beeDown, plant25)
  collisionBarriers(beeDown, plant26)
  collisionBarriers(beeDown, plant27)
  collisionBarriers(beeDown, plant28)
  collisionBarriers(beeDown, plant29)
  collisionBarriers(beeDown, plant30)
  collisionBarriers(beeDown, plant32)
  collisionBarriers(beeDown, plant32)
  collisionBarriers(beeDown, plant33)
  collisionBarriers(beeDown, plant34)
  collisionBarriers(beeDown, plant35)
  collisionBarriers(beeDown, plant36)
  collisionBarriers(beeDown, plant37)
  collisionBarriers(beeDown, plant38)
  collisionBarriers(beeDown, plant39)
  collisionBarriers(beeDown, plant40)
  collisionBarriers(beeDown, plant42)
  collisionBarriers(beeDown, plant42)
  collisionBarriers(beeDown, plant43)
  collisionBarriers(beeDown, plant44)
  collisionBarriers(beeDown, plant45)
  collisionBarriers(beeDown, plant46)
  collisionBarriers(beeDown, plant47)
  collisionBarriers(beeDown, plant48)
  

}
function collided() {
  health.width = health.width - 2
  damage()
}
function collisionsPlus() {
  collisionFix(flower)
  collisionFix(flower2)
  collisionFix(flower3)
  collisionFix(flower4)
  collisionFix(flower5)
}
function collidedPlus() {
  health.width = health.width + 2
  fix()
}

function collisionEnemy(enemy) {
  if (player.x + player.width < enemy.x ||
    player.x > enemy.x + enemy.width ||
    player.y + player.height < enemy.y ||
    player.y > enemy.y + enemy.height) {
    return
  }
  collideEnemy(enemy);
}
function collideEnemy(enemy) {
  let playerTop_ObjBottom = player.y - (enemy.y + enemy.height);
  let playerRight_ObjLeft = (player.x + player.width) - enemy.x;
  let playerLeft_ObjRight = player.x - (enemy.x + enemy.width);
  let playerBottom_ObjTop = (player.y + player.height) - enemy.y;

  if (playerTop_ObjBottom < 0) {
    playerTop_ObjBottom = playerTop_ObjBottom * -1
  } if (playerRight_ObjLeft < 0) {
    playerRight_ObjLeft = playerRight_ObjLeft * -1
  } if (playerLeft_ObjRight < 0) {
    playerLeft_ObjRight = playerLeft_ObjRight * -1
  } if (playerBottom_ObjTop < 0) {
    playerBottom_ObjTop = playerBottom_ObjTop * -1
  }

  if ((player.y <= enemy.y + enemy.height && player.y + player.height > enemy.y + enemy.height) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
    collided()
  }
  if ((player.y + player.height >= enemy.y && player.y < enemy.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
    collided()
  }
  if ((player.x + player.w >= enemy.x && player.x < enemy.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
    collided()
  }
  if ((player.x <= enemy.x + enemy.w && player.x + player.width > enemy.x + enemy.width) && (playerLeft_ObjRight < playerTop_ObjBottom && playerLeft_ObjRight < playerBottom_ObjTop)) {
    collided()
  }
}

function collisionFix(enemy) {
  if (player.x + player.width < enemy.x ||
    player.x > enemy.x + enemy.width ||
    player.y + player.height < enemy.y ||
    player.y > enemy.y + enemy.height) {
    return
  }
  collideFix(enemy);
}
function collideFix(enemy) {
  let playerTop_ObjBottom = player.y - (enemy.y + enemy.height);
  let playerRight_ObjLeft = (player.x + player.width) - enemy.x;
  let playerLeft_ObjRight = player.x - (enemy.x + enemy.width);
  let playerBottom_ObjTop = (player.y + player.height) - enemy.y;

  if (playerTop_ObjBottom < 0) {
    playerTop_ObjBottom = playerTop_ObjBottom * -1
  } if (playerRight_ObjLeft < 0) {
    playerRight_ObjLeft = playerRight_ObjLeft * -1
  } if (playerLeft_ObjRight < 0) {
    playerLeft_ObjRight = playerLeft_ObjRight * -1
  } if (playerBottom_ObjTop < 0) {
    playerBottom_ObjTop = playerBottom_ObjTop * -1
  }

  if ((player.y <= enemy.y + enemy.height && player.y + player.height > enemy.y + enemy.height) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
    collidedPlus()
  }
  if ((player.y + player.height >= enemy.y && player.y < enemy.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
    collidedPlus()
  }
  if ((player.x + player.w >= enemy.x && player.x < enemy.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
    collidedPlus()
  }
  if ((player.x <= enemy.x + enemy.w && player.x + player.width > enemy.x + enemy.width) && (playerLeft_ObjRight < playerTop_ObjBottom && playerLeft_ObjRight < playerBottom_ObjTop)) {
    collidedPlus()
  }
}

function collisionBarriers(collider1, collider2) {
  if (collider1.x + collider1.width < collider2.x ||
    collider1.x > collider2.x + collider2.width ||
    collider1.y + collider1.height < collider2.y ||
    collider1.y > collider2.y + collider2.height) {
    return
  }
  collideBarriers(collider1, collider2);
}
function collideBarriers(collider1, collider2) {
  let playerTop_ObjBottom = collider1.y - (collider2.y + collider2.height);
  let playerRight_ObjLeft = (collider1.x + collider1.width) - collider2.x;
  let playerLeft_ObjRight = collider1.x - (collider2.x + collider2.width);
  let playerBottom_ObjTop = (collider1.y + collider1.height) - collider2.y;

  if (playerTop_ObjBottom < 0) {
    playerTop_ObjBottom = playerTop_ObjBottom * -1
  } if (playerRight_ObjLeft < 0) {
    playerRight_ObjLeft = playerRight_ObjLeft * -1
  } if (playerLeft_ObjRight < 0) {
    playerLeft_ObjRight = playerLeft_ObjRight * -1
  } if (playerBottom_ObjTop < 0) {
    playerBottom_ObjTop = playerBottom_ObjTop * -1
  }

  // bottom of square
  if ((collider1.y <= collider2.y + collider2.height && collider1.y + collider1.height > collider2.y + collider2.height) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
    collider1.y = collider2.y + collider2.height;
  }
  // top of square
  if ((collider1.y + collider1.height >= collider2.y && collider1.y < collider2.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
    collider1.y = collider2.y - collider1.height;
  }
  // right of square
  if ((collider1.x + collider1.w >= collider2.x && collider1.x < collider2.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
    collider1.x = collider2.x - collider1.width;
  }
  // left of square
  if ((collider1.x <= collider2.x + collider2.w && collider1.x + collider1.width > collider2.x + collider2.width) && (playerLeft_ObjRight < playerTop_ObjBottom && playerLeft_ObjRight < playerBottom_ObjTop)) {
    collider1.x = collider2.x + collider2.width;
  }
}

function collisionStrawberries(collider1, collider2) {
  if (collider1.x + collider1.width < collider2.x ||
    collider1.x > collider2.x + collider2.width ||
    collider1.y + collider1.height < collider2.y ||
    collider1.y > collider2.y + collider2.height) {
    return
  }
  collideStrawberries(collider1, collider2);
}
function collideStrawberries(collider1, collider2) {
  let playerTop_ObjBottom = collider1.y - (collider2.y + collider2.height);
  let playerRight_ObjLeft = (collider1.x + collider1.width) - collider2.x;
  let playerLeft_ObjRight = collider1.x - (collider2.x + collider2.width);
  let playerBottom_ObjTop = (collider1.y + collider1.height) - collider2.y;

  if (playerTop_ObjBottom < 0) {
    playerTop_ObjBottom = playerTop_ObjBottom * -1
  } if (playerRight_ObjLeft < 0) {
    playerRight_ObjLeft = playerRight_ObjLeft * -1
  } if (playerLeft_ObjRight < 0) {
    playerLeft_ObjRight = playerLeft_ObjRight * -1
  } if (playerBottom_ObjTop < 0) {
    playerBottom_ObjTop = playerBottom_ObjTop * -1
  }

  // bottom of square
  if ((collider1.y <= collider2.y + collider2.height && collider1.y + collider1.height > collider2.y + collider2.height) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
    collider2.x = 1000
    totalStrawberries -= 1
  }
  // top of square
  if ((collider1.y + collider1.height >= collider2.y && collider1.y < collider2.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
    collider2.x = 1000
    totalStrawberries -= 1
  }
  // right of square
  if ((collider1.x + collider1.w >= collider2.x && collider1.x < collider2.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
    collider2.x = 1000
    totalStrawberries -= 1
  }
  // right of square
  if ((collider1.x <= collider2.x + collider2.w && collider1.x + collider1.width > collider2.x + collider2.width) && (playerLeft_ObjRight < playerTop_ObjBottom && playerLeft_ObjRight < playerBottom_ObjTop)) {
    collider2.x = 1000
    totalStrawberries -= 1
  }
}

function damage() {
  context.fillStyle = "grey";
  context.fillRect(healthBar.x, canvas.height - 30, healthBar.width, healthBar.height);

  context.fillStyle = "pink";
  context.fillRect(health.x, canvas.height - 29, health.width, health.height);
  if (health.width <= 0) {
    youLose("You lose!")
  }
}

function fix() {
  context.fillStyle = "grey";
  context.fillRect(healthBar.x, canvas.height - 30, healthBar.width, healthBar.height);

  context.fillStyle = "pink";
  context.fillRect(health.x, canvas.height - 29, health.width, health.height);
  if (health.width >= 248) {
    health.width = 248;
  }
}

function activate(event) {
  let key = event.key
  if (key === "ArrowLeft") {
    moveLeft = true;
  } else if (key === "ArrowUp") {
    moveUp = true;
  } else if (key === "ArrowDown") {
    moveDown = true;
  } else if (key === "ArrowRight") {
    moveRight = true;
  }
}

function deactivate(event) {
  let key = event.key
  if (key === "ArrowLeft") {
    moveLeft = false;
  } else if (key === "ArrowUp") {
    moveUp = false;
  } else if (key === "ArrowDown") {
    moveDown = false;
  } else if (key === "ArrowRight") {
    moveRight = false;
  }
}

function drawPlayer() {
  context.drawImage(playerImage,
    player.frameX * player.width,
    player.frameY * player.height,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width,
    player.height);
}

function drawBees() {
  // bee up
  context.drawImage(gardenImages,
    beeUp.frameX * beeUp.width,
    ((beeUp.frameY + 1) * beeUp.height),
    beeUp.width,
    beeUp.height,
    beeUp.x,
    beeUp.y,
    beeUp.width,
    beeUp.height);

  // bee down
  context.drawImage(gardenImages,
    ((beeDown.frameX + 1) * beeDown.width),
    ((beeDown.frameY + 1) * beeDown.height),
    beeDown.width,
    beeDown.height,
    beeDown.x,
    beeDown.y,
    beeDown.width,
    beeDown.height);
}

function drawItems() {

  // rose  
  context.drawImage(gardenImages,
    ((rose.frameX + 3) * rose.width),
    rose.frameY * rose.height,
    rose.width,
    rose.height,
    rose.x,
    rose.y,
    rose.width,
    rose.height);

  // rose  2
  context.drawImage(gardenImages,
    ((rose2.frameX + 3) * rose2.width),
    rose2.frameY * rose2.height,
    rose2.width,
    rose2.height,
    rose2.x,
    rose2.y,
    rose2.width,
    rose2.height);

  // rose  3
  context.drawImage(gardenImages,
    ((rose3.frameX + 3) * rose3.width),
    rose3.frameY * rose3.height,
    rose3.width,
    rose3.height,
    rose3.x,
    rose3.y,
    rose3.width,
    rose3.height);

  // rose  4
  context.drawImage(gardenImages,
    ((rose4.frameX + 3) * rose4.width),
    rose4.frameY * rose4.height,
    rose4.width,
    rose4.height,
    rose4.x,
    rose4.y,
    rose4.width,
    rose4.height);

  // rose  5
  context.drawImage(gardenImages,
    ((rose5.frameX + 3) * rose5.width),
    rose5.frameY * rose5.height,
    rose5.width,
    rose5.height,
    rose5.x,
    rose5.y,
    rose5.width,
    rose5.height);

  // flower
  context.drawImage(gardenImages,
    ((flower.frameX + 3) * flower.width),
    ((flower.frameY + 1) * flower.height),
    flower.width,
    flower.height,
    flower.x,
    flower.y,
    flower.width,
    flower.height);

  // flower 2
  context.drawImage(gardenImages,
    ((flower2.frameX + 3) * flower2.width),
    ((flower2.frameY + 1) * flower2.height),
    flower2.width,
    flower2.height,
    flower2.x,
    flower2.y,
    flower2.width,
    flower2.height);

  // flower 3
  context.drawImage(gardenImages,
    ((flower3.frameX + 3) * flower3.width),
    ((flower3.frameY + 1) * flower3.height),
    flower3.width,
    flower3.height,
    flower3.x,
    flower3.y,
    flower3.width,
    flower3.height);

  // flower 4
  context.drawImage(gardenImages,
    ((flower4.frameX + 3) * flower4.width),
    ((flower4.frameY + 1) * flower4.height),
    flower4.width,
    flower4.height,
    flower4.x,
    flower4.y,
    flower4.width,
    flower4.height);

  // flower 5
  context.drawImage(gardenImages,
    ((flower5.frameX + 3) * flower5.width),
    ((flower5.frameY + 1) * flower5.height),
    flower5.width,
    flower5.height,
    flower5.x,
    flower5.y,
    flower5.width,
    flower5.height);

  // strawberry
  context.drawImage(gardenImages,
    ((strawberry.frameX + 2) * strawberry.width),
    ((strawberry.frameY + 1) * strawberry.height),
    strawberry.width,
    strawberry.height,
    strawberry.x,
    strawberry.y,
    strawberry.width,
    strawberry.height);

  // strawberry
  context.drawImage(gardenImages,
    ((strawberry2.frameX + 2) * strawberry2.width),
    ((strawberry2.frameY + 1) * strawberry2.height),
    strawberry2.width,
    strawberry2.height,
    strawberry2.x,
    strawberry2.y,
    strawberry2.width,
    strawberry2.height);

  // strawberry
  context.drawImage(gardenImages,
    ((strawberry3.frameX + 2) * strawberry3.width),
    ((strawberry3.frameY + 1) * strawberry3.height),
    strawberry3.width,
    strawberry3.height,
    strawberry3.x,
    strawberry3.y,
    strawberry3.width,
    strawberry3.height);

  // strawberry
  context.drawImage(gardenImages,
    ((strawberry4.frameX + 2) * strawberry4.width),
    ((strawberry4.frameY + 1) * strawberry4.height),
    strawberry4.width,
    strawberry4.height,
    strawberry4.x,
    strawberry4.y,
    strawberry4.width,
    strawberry4.height);

  // strawberry
  context.drawImage(gardenImages,
    ((strawberry5.frameX + 2) * strawberry5.width),
    ((strawberry5.frameY + 1) * strawberry5.height),
    strawberry5.width,
    strawberry5.height,
    strawberry5.x,
    strawberry5.y,
    strawberry5.width,
    strawberry5.height);

  // strawberry
  context.drawImage(gardenImages,
    ((strawberry6.frameX + 2) * strawberry6.width),
    ((strawberry6.frameY + 1) * strawberry6.height),
    strawberry6.width,
    strawberry6.height,
    strawberry6.x,
    strawberry6.y,
    strawberry6.width,
    strawberry6.height);

  // strawberry
  context.drawImage(gardenImages,
    ((strawberry7.frameX + 2) * strawberry7.width),
    ((strawberry7.frameY + 1) * strawberry7.height),
    strawberry7.width,
    strawberry7.height,
    strawberry7.x,
    strawberry7.y,
    strawberry7.width,
    strawberry7.height);

  // strawberry 8
  context.drawImage(gardenImages,
    ((strawberry8.frameX + 2) * strawberry8.width),
    ((strawberry8.frameY + 1) * strawberry8.height),
    strawberry8.width,
    strawberry8.height,
    strawberry8.x,
    strawberry8.y,
    strawberry8.width,
    strawberry8.height);

  // strawberry 9
  context.drawImage(gardenImages,
    ((strawberry9.frameX + 2) * strawberry9.width),
    ((strawberry9.frameY + 1) * strawberry9.height),
    strawberry9.width,
    strawberry9.height,
    strawberry9.x,
    strawberry9.y,
    strawberry9.width,
    strawberry9.height);

  // strawberry 10
  context.drawImage(gardenImages,
    ((strawberry10.frameX + 2) * strawberry10.width),
    ((strawberry10.frameY + 1) * strawberry10.height),
    strawberry10.width,
    strawberry10.height,
    strawberry10.x,
    strawberry10.y,
    strawberry10.width,
    strawberry10.height);
}

function drawPlantsFImages() {
  drawPlants(plantFlowers)
  drawPlants(plantFlowers2);
  drawPlants(plantFlowers3);
  drawPlants(plantFlowers4);
  drawPlants(plantFlowers5);
  drawPlants(plantFlowers6);
  drawPlants(plantFlowers7);
  drawPlants(plantFlowers8);
  drawPlants(plantFlowers9);
  drawPlants(plantFlowers10);
  drawPlants(plantFlowers11);
  drawPlants(plantFlowers12);
  drawPlants(plantFlowers13);
  drawPlants(plantFlowers14);
  drawPlants(plantFlowers15);
  drawPlants(plantFlowers16);
  drawPlants(plantFlowers17);
  drawPlants(plantFlowers18);
  drawPlants(plantFlowers19);
  drawPlants(plantFlowers20);
  drawPlants(plantFlowers21);
  drawPlants(plantFlowers22);
  drawPlants(plantFlowers23);
  drawPlants(plantFlowers24);
  drawPlants(plantFlowers25);
  drawPlants(plantFlowers26);
  drawPlants(plantFlowers27);
  drawPlants(plantFlowers28);
  drawPlants(plantFlowers29);
  drawPlants(plantFlowers30);
  drawPlants(plantFlowers31);
  drawPlants(plantFlowers32);
  drawPlants(plantFlowers33);
  drawPlants(plantFlowers34);
  drawPlants(plantFlowers35);
}
function drawPlants(plantFlowersX) {
  // plant with flowers 
  context.drawImage(gardenImages,
    plantFlowersX.frameX * plantFlowersX.width,
    plantFlowersX.frameY * plantFlowersX.height,
    plantFlowersX.width,
    plantFlowers.height,
    plantFlowersX.x,
    plantFlowersX.y,
    plantFlowersX.width,
    plantFlowersX.height);
}
function drawPlantImages() {
  drawPlant(plant);
  drawPlant(plant2);
  drawPlant(plant3);
  drawPlant(plant4);
  drawPlant(plant5);
  drawPlant(plant6);
  drawPlant(plant7);
  drawPlant(plant8);
  drawPlant(plant9);
  drawPlant(plant10);
  drawPlant(plant11);
  drawPlant(plant12);
  drawPlant(plant13);
  drawPlant(plant14);
  drawPlant(plant15);
  drawPlant(plant16);
  drawPlant(plant17);
  drawPlant(plant18);
  drawPlant(plant19);
  drawPlant(plant20);
  drawPlant(plant21);
  drawPlant(plant22);
  drawPlant(plant23);
  drawPlant(plant24);
  drawPlant(plant25);
  drawPlant(plant26);
  drawPlant(plant27);
  drawPlant(plant28);
  drawPlant(plant29);
  drawPlant(plant30);
  drawPlant(plant31);
  drawPlant(plant32);
  drawPlant(plant33);
  drawPlant(plant34);
  drawPlant(plant35);
  drawPlant(plant36);
  drawPlant(plant37);
  drawPlant(plant38);
  drawPlant(plant39);
  drawPlant(plant40);
  drawPlant(plant41);
  drawPlant(plant42);
  drawPlant(plant43);
  drawPlant(plant44);
  drawPlant(plant45);
  drawPlant(plant46);
  drawPlant(plant47);
  drawPlant(plant48);
}
function drawPlant(plantX) {
  context.drawImage(gardenImages,
    ((plantX.frameX + 2) * plantX.width),
    plantX.frameY * plantX.height,
    plantX.width,
    plantX.height,
    plantX.x,
    plantX.y,
    plantX.width,
    plantX.height);
}

function randint(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function load_assets(assets, callback) {
  let num_assets = assets.length;
  let loaded = function () {
    console.log("loaded");
    num_assets = num_assets - 1;
    if (num_assets === 0) {
      callback();
    }
  };
  for (let asset of assets) {
    let element = asset.var;
    if (element instanceof HTMLImageElement) {
      console.log("img");
      element.addEventListener("load", loaded, false);
    } else if (element instanceof HTMLAudioElement) {
      console.log("audio");
      element.addEventListener("canplaythrough", loaded, false);
    }
    element.src = asset.url;
  }
}

function youLose(result) {
  window.removeEventListener("keyup", activate, false)
  window.cancelAnimationFrame(requestId)

  let outcome_element = document.querySelector("#result");
  outcome_element.innerHTML = result
}


let rose = {
  x: 150,
  y: 60,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let rose2 = {
  x: 480,
  y: 0,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let rose3 = {
  x: 360,
  y: 210,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let rose4 = {
  x: 60,
  y: 240,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let rose5 = {
  x: 510,
  y: 360,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
}
let flower = {
  x: 60,
  y: 0,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let flower2 = {
  x: 420,
  y: 90,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let flower3 = {
  x: 300,
  y: 240,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let flower4 = {
  x: 0,
  y: 300,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let flower5 = {
  x: 510,
  y: 420,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}

// collecting strawberries
let strawberry = {
  x: 120,
  y: 0,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let strawberry2 = {
  x: 450,
  y: 30,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let strawberry3 = {
  x: 270,
  y: 150,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let strawberry4 = {
  x: 540,
  y: 150,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let strawberry5 = {
  x: 0,
  y: 210,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let strawberry6 = {
  x: 420,
  y: 210,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let strawberry7 = {
  x: 300,
  y: 330,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let strawberry8 = {
  x: 420,
  y: 360,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let strawberry9 = {
  x: 0,
  y: 410,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let strawberry10 = {
  x: 300,
  y: 410,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}

// constructing maze:
let plantFlowers = {
  x: 30,
  y: 30,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let plantFlowers2 = {
  x: 90,
  y: 30,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let plantFlowers3 = {
  x: 150,
  y: 30,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let plantFlowers4 = {
  x: 300,
  y: 30,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let plantFlowers5 = {
  x: 360,
  y: 60,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}
let plantFlowers6 = {
  x: 420,
  y: 60,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers7 = {
  x: 480,
  y: 60,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers8 = {
  x: 0,
  y: 90,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers9 = {
  x: 180,
  y: 90,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers10 = {
  x: 240,
  y: 90,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers11 = {
  x: 300,
  y: 120,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers12 = {
  x: 420,
  y: 120,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers13 = {
  x: 510,
  y: 120,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers14 = {
  x: 30,
  y: 150,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers15 = {
  x: 30,
  y: 180,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers16 = {
  x: 90,
  y: 180,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers17 = {
  x: 240,
  y: 180,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
}

let plantFlowers18 = {
  x: 330,
  y: 180,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers19 = {
  x: 420,
  y: 180,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers20 = {
  x: 180,
  y: 210,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers21 = {
  x: 330,
  y: 240,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers22 = {
  x: 390,
  y: 240,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers23 = {
  x: 120,
  y: 270,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers24 = {
  x: 240,
  y: 270,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers25 = {
  x: 300,
  y: 300,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers26 = {
  x: 0,
  y: 330,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers27 = {
  x: 60,
  y: 330,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers28 = {
  x: 180,
  y: 330,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers29 = {
  x: 420,
  y: 330,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers30 = {
  x: 480,
  y: 330,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers31 = {
  x: 120,
  y: 390,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers32 = {
  x: 270,
  y: 390,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers33 = {
  x: 330,
  y: 390,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers34 = {
  x: 390,
  y: 390,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plantFlowers35 = {
  x: 510,
  y: 390,
  width: 64,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
};

let plant = {
  x: 30,
  y: 0,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 }
 
 
 let plant2 = {
  x: 240,
  y: 0,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 }
 
 
 let plant3 = {
  x: 510,
  y: 0,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant4 = {
  x: 240,
  y: 30,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant5 = {
  x: 360,
  y: 30,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant6 = {
  x: 420,
  y: 30,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant7 = {
  x: 510,
  y: 30,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant8 = {
  x: 120,
  y: 60,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant9 = {
  x: 240,
  y: 60,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant10 = {
  x: 120,
  y: 90,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant11 = {
  x: 300,
  y: 90,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant12 = {
  x: 390,
  y: 90,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant13 = {
  x: 120,
  y: 120,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant14 = {
  x: 180,
  y: 120,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant15 = {
  x: 390,
  y: 120,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant16 = {
  x: 180,
  y: 150,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant17 = {
  x: 240,
  y: 150,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant18 = {
  x: 510,
  y: 150,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant19 = {
  x: 510,
  y: 180,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant20 = {
  x: 30,
  y: 210,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant21 = {
  x: 120,
  y: 210,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant22 = {
  x: 240,
  y: 210,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant23 = {
  x: 450,
  y: 210,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant24 = {
  x: 510,
  y: 210,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant25 = {
  x: 30,
  y: 240,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant26 = {
  x: 120,
  y: 240,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant27 = {
  x: 450,
  y: 240,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant28 = {
  x: 510,
  y: 240,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant29 = {
  x: 210,
  y: 270,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant30 = {
  x: 390,
  y: 270,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 
 
 let plant31 = {
  x: 450,
  y: 270,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant32 = {
  x: 60,
  y: 300,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant33 = {
  x: 150,
  y: 300,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant34 = {
  x: 270,
  y: 300,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant35 = {
  x: 390,
  y: 300,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant36 = {
  x: 150,
  y: 330,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant37 = {
  x: 270,
  y: 330,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant38 = {
  x: 330,
  y: 330,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant39 = {
  x: 390,
  y: 330,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant40 = {
  x: 90,
  y: 360,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant41 = {
  x: 210,
  y: 360,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant42 = {
  x: 270,
  y: 360,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant43 = {
  x: 390,
  y: 360,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant44 = {
  x: 30,
  y: 390,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant45 = {
  x: 210,
  y: 390,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant46 = {
  x: 450,
  y: 390,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant47 = {
  x: 30,
  y: 420,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };
 let plant48 = {
  x: 270,
  y: 420,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 0,
  xChange: 0,
  yChange: 0,
  size: 20
 };