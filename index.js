// I wanted to work on orginazing my code and making it easier to read 

const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const score = document.querySelector('#score');
const resetButton = document.querySelector('#resetButton');
const boardWidth = gameBoard.width;
const boardHeight = gameBoard.height;
const paddleBorder = 'black';
const paddle1Color = 'pink';
const paddle2Color = 'yellow';
const ballColor = 'black';
let ballX = boardWidth / 2;
let ballY = boardHeight / 2;
let ballSpeed;
let ballXTragectory = 0;
let ballYTragectory = 0;
let intervalId;
let player1Score = 0;
let player2Score = 0;

// Paddles for player 1 and 2. 

const paddle1 = {
    width: 25,
    height: 75,
    x: 0,
    y: 0
};
const paddle2 = {
    width: 25,
    height: 75,
    x: boardWidth - 25,
    y: boardHeight - 75
};



function paddles () {
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

};
       
function paddleMovement(){
    window.addEventListener('keydown', function(event){

        if(event.code === 'KeyW'){
            paddle1.y -= 20;
            //clearBoard();
          }
        
          if(event.code === 'KeyS'){
            paddle1.y += 20;
            //clearBoard();
          }
        
          if(event.code === 'ArrowUp'){
            paddle2.y -= 20;
            //clearBoard();
          }
        
          if(event.code === 'ArrowDown'){
            paddle2.y += 20;
            //clearBoard();
          }
      
      })
};

paddleMovement();

// Ping Pong Ball

function ball (ballX, ballY){
    ctx.fillStyle = ballColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, 12.5, 0, 2 * Math.PI)
    //ctx.stroke();
    ctx.fill();
    ctx.closePath()
    };
    
    // ball(ballX, ballY);

function newBall (){
        ballSpeed = 1;
        if(Math.round(Math.random()) == 1){
            ballXTragectory =  1; 
        }
        else{
            ballXTragectory = -1; 
        }
        if(Math.round(Math.random()) == 1){
            ballYTragectory = Math.random() * 1; //more random directions
        }
        else{
            ballYTragectory = Math.random() * -1; //more random directions
        }
        ballX = boardWidth / 2;
        ballY = boardHeight / 2;
        //ball(ballX, ballY);
        // clearBoard();
    };

    

    function moveBall(){
        ballX += (ballSpeed * ballXTragectory);
        ballY += (ballSpeed * ballYTragectory);
        console.log(ballX);
        // clearBoard();
        //newBall();
        ball(ballX, ballY)
    };

    //moveBall();


// function clearBoard (){
//     ctx.clearRect(0, 0, boardWidth, boardHeight)
//     paddles();
//     ball(ballX, ballY);
//     //newBall();
//     // moveBall();

// };

newBall();

let singleFrameAnimation = () => {
    ctx.clearRect(0, 0, boardWidth, boardHeight);
    moveBall();
    paddles();
}

setInterval(singleFrameAnimation, 16)
