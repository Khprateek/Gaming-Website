// constants and variables //
let inputDir = {x:0,y:0};
const foodsound = new Audio('../Sounds/food.mp3');
const gameoversound = new Audio('../Sounds/gameover.mp3');
const movesound = new Audio('../Sounds/move.mp3');
let speed = 16;
let score  = 0;
let lastPainTime =0;
let snakearr = [
  {x:13, y:15}
]
// to rotate thehead
let headDire = "down";
const a = 1;
const b = 46;
const c = 1;
const d = 34;
food = {x : Math.round(a + (b-a) * Math.random()), y : Math.round(c + (d-c) * Math.random())}


// game functions //


function main(ctime){
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if((ctime - lastPainTime)/1000 < 1/speed){
    return;
  }
    lastPainTime =ctime;
    gameEngine();
}


function isCollide(snake){
  // if you bite yourself
  if(snake[0].x >= 47 || snake[0].x <= 0 || snake[0].y >= 35 || snake[0].y <= 0){
    return true;
  }
  for(let i = 1; i < snakearr.length ;i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
      return true;
    }
  }
}


function gameEngine(){
  // part 1: update the snake food array & Food
  if(isCollide(snakearr)){
    gameoversound.play();
    inputDir ={x : 0, y :0};
    alert("Game over. Press any key to play again!");
    snakearr =[{x : 13 , y : 15}];
    score  =0;

  }
  // if you have eaten the food increse the length 
  if(snakearr[0].y === food.y && snakearr[0].x === food.x){
    foodsound.play();
    score += 1;
    scoreBox.innerHTML = "Score: " + score;
    snakearr.unshift({x : snakearr[0].x + inputDir.x, y : snakearr[0].y + inputDir.y});
    food = { x : Math.round(a + (b-a) * Math.random()), y : Math.round(c + (d-c) * Math.random())}
  }
  // Moving the snake
  for(let i = snakearr.length -2 ; i >= 0; i--){
    const element = snakearr[i];
    snakearr[i+1] = {...snakearr[i]};
  }
  snakearr[0].x += inputDir.x;
  snakearr[0].y += inputDir.y;


  // part 2: display the food and snake
  // display the snake
  board.innerHTML ="";
  snakearr.forEach((e, index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart =e.y;
    snakeElement.style.gridColumnStart =e.x;
    if(index === 0){
      snakeElement.classList.add('head');
      switch (headDire) {
        case 'up':
          snakeElement.style.transform = 'rotate(0deg)';
          break;
        case 'down':
          snakeElement.style.transform = 'rotate(180deg)';
          break;
        case 'left':
          snakeElement.style.transform = 'rotate(-90deg)';
          break;
        case 'right':
          snakeElement.style.transform = 'rotate(90deg)';
          break;
      }
    }
    else{
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  });
  // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// main   logic //


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
  inputDir = {x:0, y:1}
  movesound.play();
  switch (e.key){
    case "ArrowUp":
        inputDir = {x : 0 ,y : -1};
        headDire = 'up';
      break;

    case "ArrowDown":
        inputDir = {x : 0 ,y : 1};
        headDire = 'down';
      break;

    case "ArrowLeft":
        inputDir = {x : -1 ,y : 0};
        headDire = 'left';
      break;

    case "ArrowRight":
        inputDir = {x : 1 ,y : 0};
        headDire = 'right';
      break;

    default:
      break;
  }

})