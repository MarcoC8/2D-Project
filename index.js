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
const hitAudio = new Audio("../audio/ping-pong-noise.mp3");
          hitAudio.play();
let ballX = boardWidth / 2;
let ballY = boardHeight / 2;
let ballSpeed;
let ballXTragectory = 0;
let ballYTragectory = 0;
let player1Score = 0;
let player2Score = 0;

function startGame(){
    
}


// Paddles for player 1 and 2. 

let paddle1 = {
    width: 25,
    height: 75,
    x: 0,
    y: 0
};
let paddle2 = {
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
            paddle1.y -= 50;
          }
        
          if(event.code === 'KeyS'){
            paddle1.y += 50;
          }
        
          if(event.code === 'ArrowUp'){
            paddle2.y -= 50;
          }
        
          if(event.code === 'ArrowDown'){
            paddle2.y += 50;
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
    ctx.fill();
    ctx.closePath()
    };
    

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
    };

    

    function moveBall(){
        ballX += (ballSpeed * ballXTragectory);
        ballY += (ballSpeed * ballYTragectory);
        ball(ballX, ballY)
    };


newBall();

let singleFrameAnimation = () => {
    ctx.clearRect(0, 0, boardWidth, boardHeight);
    moveBall();
    paddles();
    ballBounce();
}

setInterval(singleFrameAnimation, 16)

function updateScore(){
    score.textContent = `${player1Score} : ${player2Score}`;
};

// Collision for the ball. Including the top and bottom of the canvas, and also the paddles.

function ballBounce(){
    if(ballY <= 0 + 12.5){
        ballYTragectory *= -1;
    }
    if(ballY >= boardHeight - 12.5){
        ballYTragectory *= -1;
    }
    if(ballX >= boardWidth){
        player1Score+= 1;
        updateScore();
        newBall();
        return;
    }
    if(ballX <= 0){
        player2Score+= 1;
        updateScore();
        newBall();
        return;
    }
    if(ballX <= (paddle1.x + paddle1.width + 12.5)){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
            ballXTragectory *= -1;
            ballSpeed += 1;
            hitAudio.play();
        }
    }
    if(ballX >= (paddle2.x - 12.5)){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballXTragectory *= -1;
            ballSpeed += 1;
            hitAudio.play();
}
    }
};


//Reset button

resetButton.addEventListener("click", resetGame);

function resetGame(){
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 25,
        height: 75,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 75,
        x: boardWidth - 25,
        y: boardHeight - 75
    };
    ballSpeed = 1;
    ballXTragectory = 0;
    ballYTragectory = 0;
    newBall();
    updateScore();
}
