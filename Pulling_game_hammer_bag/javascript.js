const bua = document.getElementById("bua");
const giay = document.getElementById("giay");
const keo = document.getElementById("keo");
var summary = document.getElementById("summary");
const replay = document.querySelector("#option");
const hiddenoptions = document.querySelector(".hidden");
var result = document.getElementById("result");
var playerPoint = document.querySelector(".player-score");
var computerScore = document.querySelector(".computer-score");
var Player_score = 0;
var Machine_point = 0;
bua.onclick = function () {
    if (Player_score == 3) {
        playerisWinningTurn();
    } else if (Machine_point == 3) {
        machineisWinningTurn();
    } else {
        gameProcessing("Rock", "Scissors", "Paper");
    }

};
giay.onclick = function () {
    if (Player_score == 3) {
        playerisWinningTurn();
    } else if (Machine_point == 3) {
        machineisWinningTurn();
    } else {
        gameProcessing("Rock", "Scissors", "Paper");
    }

};

keo.onclick = function () {
    if (Player_score == 3) {
        playerisWinningTurn();
    } else if (Machine_point == 3) {
        machineisWinningTurn();
    } else {
        gameProcessing("Rock", "Scissors", "Paper");
    }
};
function gameProcessing(params, param1, param2) {
    var randomPlayer = Math.floor(Math.random() * 10);
    var randomMachine = Math.floor(Math.random() * 10);

    if (randomPlayer > randomMachine) {
        result.innerText = `Player wins! ${params} beats ${param1}`
        Player_score++;
        playerPoint.innerText = "Player Score: " + Player_score;
    } else if (randomPlayer < randomMachine) {
        result.innerText = `Computer wins! ${param2} beats ${params}`
        Machine_point++;
        computerScore.innerText = "Computer Score: " + Machine_point;
    } else if (randomPlayer == randomMachine) {
        result.innerText = `It's a tie! Both chose ${params}`
    }

}

function playerisWinningTurn() { //xử lí đưa ra kết quả khi người chơi thắng
    replay.classList.add("hidden");
    result.inertText = "Player has won the game!"
    hiddenoptions.classList.remove("hidden");
    hiddenoptions.onclick = function () {
        replay.classList.remove("hidden");
        playerPoint.innerText = "Player Score: 0";
        computerScore.innerText = "Computer Score: 0";
        hiddenoptions.classList.add("hidden");
        result.textContent = "";
        Player_score = 0;// gán lại để lần tính toán sau bắt đầu lại từ đầu 
        Machine_point = 0;
    }
}

function machineisWinningTurn() { //xử lí đưa ra kết quả khi máy thắng

    replay.classList.add("hidden");
    result.inertText = "Computer has won the game!"
    hiddenoptions.classList.remove("hidden");
    hiddenoptions.onclick = function () {

        replay.classList.remove("hidden");
        computerScore.innerText = "Computer Score: 0";
        playerPoint.innerText = "Player Score: 0";

        hiddenoptions.classList.add("hidden");

        result.textContent = "";
        Player_score = 0;
        Machine_point = 0;

    }
}