var frame;
var ball;
var total = [];
var gameOver = true;
window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/Bowling/sw.js')
            .then(function() { console.log('Service Worker Registered'); });
    }
}
                  
function startup() {
    console.log("startup called");
    let col = 10;
    for (let i = 0; i < col; i++) {
        total[i] = [];
    }
    console.log(total);
}

function calcScore() {
    console.log("calcScore");
    let totalScore = 0;
    for (let i = 0; i < frame; i++) {
        let frameScore = 0;
        switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                console.log("frames 1 - 8");
                if (total[i][0] == 10) {
                    if (total[i + 1][0] == 10) {
                        frameScore = 20 + total[i + 2][0];
                    } else {
                        frameScore = 10 + total[i + 1][0] + total[i + 1][1];
                    }
                } else if (total[i][0] + total[i][1] == 10) {
                    frameScore = 10 + total[i + 1][0];
                } else {
                    frameScore = total[i][0] + total[i][1];
                }
                break;
            case 8:
                console.log("Frame 9");
                if (total[8][0] == 10) {
                    if (total[9][0] == 10) {
                        frameScore = 20 + total[9][1];
                    } else {
                        frameScore = 10 + total[9][0] + total[9][1];
                    }
                } else if (total[8][0] + total[8][1] == 10) {
                    frameScore = 10 + total[9][0];
                } else {
                    frameScore = total[8][0] + total[8][1];
                }
                break;
            case 9:
                console.log("Frame 10");
                if (total[9][0] == 10) {
                    if (total[9][1] == 10) {
                        frameScore = 20 + total[9][2];
                    } else {
                        frameScore = 10 + total[9][1] + total[9][2];
                    }
                } else if (total[9][0] + total[9][1] == 10) {
                    frameScore = 10 + total[9][2];
                } else {
                    frameScore = total[9][0] + total[9][1];
                }
                break;

        }
        totalScore += frameScore;
        console.log("Frame Score: " + frameScore);
        console.log("Total Score: " + totalScore)
        let ele = "frame" + (i + 1) + "score";
        document.getElementById(ele).innerText = totalScore;
    }
}


function disablePin(numOfPins) {
    if (numOfPins > 0) {
        for (let i = 10 - numOfPins + 1; i <= 10; i++) {
            //console.log("i = " + i);
            let elename = "b" + i;
            //console.log("elename = " + elename);
            let ele = document.getElementById(elename);
            //console.log(ele);
            ele.style.display = "none";
        }
    }
}

function enablePin() {
    for (let i = 0; i <= 10; i++) {
        //console.log("i = " + i);
        let elename = "b" + i;
        //console.log("elename = " + elename);
        let ele = document.getElementById(elename);
        //console.log(ele);
        ele.style.display = "inline-block";
    }
}
function numOfPins(pinNum) {
    console.log("Number of Pins is " + pinNum);
       if (gameOver) {
        console.log("game is over");
        return;
    }
    let pinscoreele;
    if (frame == 10) {
        pinscoreele = "f" + frame + "b" + (ball - 1)
    } else {
        pinscoreele = "f" + frame + "b" + ball;
    }
    console.log(pinscoreele);
    total[frame - 1][ball - 1] = pinNum;
    console.log(total[frame - 1][ball - 1]);
    let icon = pinNum;
    if (pinNum == 10 && (ball == 1 || frame == 10)) {
        icon = "X";
    } else if (total[frame - 1][0] + total[frame - 1][1] == 10 && ball == 2) {
        icon = "/";
    }
    document.getElementById(pinscoreele).innerText = icon;

    if (ball == 1) {
        if (pinNum == 10) {
            if (frame < 10) {
                frame++;
            } else {
                ball++;
            }
            enablePin();
        } else {
            ball++;
            disablePin(pinNum);
        }
    }
    else if (ball == 2) {
        if (frame < 10) {
            ball = 1;
            frame++;
            enablePin();
        } else {
            if
            ((total[9][0] == 10) || ((total[9][0] + total[9][1]) == 10)) {
                ball++;
                enablePin();
            } else {
                gameOver = true;
                disablePin(0);
            }
        }
    }
    else {
        gameOver = true;
        enablePin();
    }
    //console.log("Frame " + frame + "Ball " + ball);
    //console.log(total);
    calcScore();
}

function newGame() {
    console.log("newGame called");
    for (let i = 1; i <= 10; i++) {
        let ele = "frame" + i + "score";
        console.log(ele);
        let x = document.getElementById(ele);
        x.innerText = "";
        for (let b = 0; b <= 2; b++) {
            ele = "f" + i + "b" + b;
            console.log(ele);
            let x = document.getElementById(ele);
            x.innerText = "";
        }
    }
    frame = 1;
    ball = 1;

    for (let i = 0; i <= 9; i++) {
        for (let b = 0; b <= 2; b++) {
            total[i][b] = 0;
        }
    }
    //console.log(total);
    enablePin();
    gameOver = false;
}

function correct() {
    console.log("correct called");
}
