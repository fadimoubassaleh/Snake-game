
// 
// 
//      VARIABELS
// 
// 

var pos_l_r = 0;
var pos_u_d = 0;
var t;
var Result = document.getElementById("result");
var Restart = document.getElementById("restart");
var Up = document.getElementById("up");
var Left = document.getElementById("left");
var Down = document.getElementById("down");
var Right = document.getElementById("right");
var Snake = document.getElementById('snake');
var action = "";
// timer vars
var theTimer;
var typeTimer = document.getElementById('getTimer');
var secs = 0;
// put fruits vars
var theFruit = document.getElementById("fruit");
var pos_fr_l_r = 100;
var pos_fr_u_d = 100;
var theApple;
var runAppleVar = 0;
// score
var score = 0;
var outputScore = document.getElementById("getScore");
// tail
// var tailSize = 0;
var tail = []
    tail[0] = "a"
var recorderPosition = []
    recorderPosition[0] = "hi";
var recorderAction = []
var gameContainer = document.getElementById("tail");
var theLastAction = "";




// 
// 
//      BUTTOMS & KEYBOARD
// 
// 



// BUTTOMS



Right.addEventListener("click", runRight);
Left.addEventListener("click", runLeft);
Up.addEventListener("click", runUp);
Down.addEventListener("click", runDown);
Restart.addEventListener("click", runRestart);
window.onload = Restart.style.visibility = 'hidden';



// KEYBOARD



window.addEventListener('keyup', function(evt){
    switch (evt.keyCode){
        case 39:    runRight();     break;
        case 37:    runLeft();      break;
        case 38:    runUp();        break;
        case 40:    runDown();      break;
        case 13:    runRestart();   break;
    }
})
// 
// 
//      FUNCTIONS
// 
//


//      RUN LEFT


function runLeft(){
    if (action == "right" || action == "left"){}
    else{
        action = "left";
            console.log(action);
        runLoop();
    }
}


//      RUN RIGHT


function runRight(){
    if (action == "right" || action == "left"){}
    else{
        action = "right";
            console.log(action);
        runLoop();
    }
}


//      RUN UP


function runUp(){
    if (action == "up" || action == "down"){}
    else{
        action = "up";
            console.log(action);
        runLoop();
    }
}


//      RUN DOWN


function runDown(){
    if (action == "up" || action == "down"){}
    else{
        action = "down";
            console.log(action);
        runLoop();
    }
}


//      RUN RETART


function runRestart (){
    
    // location.reload();
    clearInterval(t);
    clearInterval(theTimer);
    clearInterval(theApple);
    stopApple();
    secs = 0;
    action = "";
    pos_fr_l_r = "";
    pos_fr_u_d = "";
    score = -1;
    outputScore.innerHTML = "Total score: 0";
    Restart.style.visibility = 'hidden';
    Up.style.visibility = 'visible';
    Down.style.visibility = 'visible';
    Left.style.visibility = 'visible';
    Right.style.visibility = 'visible';
    Result.innerHTML = "";
    pos_l_r = 0;
    pos_u_d = 0;
        console.log(pos_l_r+" "+pos_u_d)
    Snake.style.left = pos_l_r+'px';
    Snake.style.top = pos_u_d+'px';
    typeTimer.innerHTML = ("Total Time: 0 Seconds");
    tail = []
    tail[0] = "a"
    recorderPosition = []
    recorderAction = []
    gameContainer.innerHTML = "";
}


//      RUN LOSER


function runLoser(){
    // stopApple();
    Restart.style.visibility = 'visible';
    Up.style.visibility = 'hidden';
    Down.style.visibility = 'hidden';
    Left.style.visibility = 'hidden';
    Right.style.visibility = 'hidden';
    clearInterval(t);
    clearInterval(theTimer);
    clearInterval(theApple);
    theApple = 0;
    t = 0;
    theTimer = 0;
    console.log(theTimer);
    return Result.innerHTML = "YOU LOST :(";
}


//      GAME LOOP (make new posistions)


function gameLoop(){
    
    recorder()
    if (pos_l_r >= 489 || pos_l_r < 0 || pos_u_d < 0 || pos_u_d >= 240){
        runLoser();
    }
    else{
        switch (action){
            case "right":
            pos_l_r += 1;
            break;
            case "left":
            pos_l_r -= 1;
            break;
            case "up":
            pos_u_d -= 1;
            break;
            case "down":
            pos_u_d += 1;
            break;
        }
    }
    if ( (  pos_fr_l_r - 9) <= pos_l_r      &&
    pos_l_r <= (pos_fr_l_r + 9  )   && 
    (  pos_fr_u_d - 9) <= pos_u_d      &&
    pos_u_d <= (pos_fr_u_d + 9  ) )
    // pos_l_r == pos_fr_l_r && pos_u_d == pos_fr_u_d)
    {
        // theFruit.style.visibility = 'hidden';
        eatApple();
        console.log("akal");
    }
    Snake.style.top  = pos_u_d + 'px';
    Snake.style.left = pos_l_r + 'px';
    runApple();


    tailLoop();
    theLastAction = recorderAction[0]
}


//      run LOOP (run GAME LOOP ON TIME)


function runLoop(){
    clearInterval(t);
    runTimer();
    t = setInterval(gameLoop, 10);
}




//      TIMER 


function timer(){
    secs++;
    // console.log("timer " + secs)
    typeTimer.innerHTML = ("Total Time: " + secs + " Seconds");
}

function runTimer(){
    if (pos_u_d == 0 && pos_l_r == 0)
    theTimer = setInterval(timer, 1000);
    // console.log(theTimer);
}


//      put an APPLE


function randomMaxMin(max,min){
    return Math.random() * (max - min) + min;
}

function setApplePostion(){
    pos_fr_l_r = randomMaxMin(0, 490);
    pos_fr_u_d = randomMaxMin(0, 241);
    theFruit.style.left = pos_fr_l_r + 'px';
    theFruit.style.top = pos_fr_u_d + 'px';
    console.log(theApple)
}

function runApple(){
    if (runAppleVar == 0){
        theApple = setInterval(setApplePostion, 10000);
        theFruit.style.left = pos_fr_l_r + 'px';
        theFruit.style.top = pos_fr_u_d + 'px';
        theFruit.style.visibility = 'visible';
    }
    runAppleVar = 1;
}

function stopApple(){
    runAppleVar = 0;
    clearInterval (theApple);
}


//      WHEN THE APPLE EATEN 


function eatApple(){
    stopApple();
    score ++;
    // console.log(score);
    outputScore.innerHTML = "Total score: " + score;
    setApplePostion();
    // theFruit.style.visibility = 'hidden';
    runApple();
    addTail();
}   


//      MAKE A FUCKING TAIL


function recorder(){
    var currentPosition = {};
    currentPosition.pos_l_r = pos_l_r;
    currentPosition.pos_u_d = pos_u_d;
    while (recorderPosition.length < tail.length*12){

        recorderPosition.push(currentPosition);
    }
    if (recorderPosition.length == tail.length*12){
        recorderPosition.push(currentPosition);
        recorderPosition.shift();
    }
}

function addTail(){
    if (score > 0){
        if (tail[0] == "a"){
            var tailForm = document.createElement("div");
                tailForm.className = "main";
            gameContainer.appendChild(tailForm);
            tail.shift();
            tail.push(tailForm);
        }else{
            var tailForm = document.createElement("div");
                tailForm.className = "main";
            gameContainer.appendChild(tailForm);
            tail.push(tailForm);
        }
    }
}
function tailLoop(){
    if(tail[0] != "a"){
        for(i = 0; i < tail.length ;i++){
            var j = tail.length -1 -i;
            tail[i].pos_l_r = recorderPosition[j * 12].pos_l_r;
            tail[i].pos_u_d = recorderPosition[j * 12].pos_u_d;
            tail[i].style.left = tail[i].pos_l_r + "px";
            tail[i].style.top  = tail[i].pos_u_d + "px";
        }
    }
}