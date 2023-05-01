// object defining '1' and '-1' as players and null for an empty square 
const COLORS = {
    'null': 'white',
    '1': 'red',
    '-1': 'black',
}
// combinations of winning posibilities
const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];
// Variables
let board;
let turn;
let winner;


//cached elements
const messageEl = document.querySelctor('h1');
const resetGameBtn = document.querySelector('button');
// event listeners
document.getElementById('board').addEventListener('click', handleMove);
resetGameBtn.addEventListener('click', init);

// function storing 9 elements and 

init();
function init(){
board = new Array(9).fill(null);

turn = 1;
winner = null;
render();
}
// in reponse to the user update all impacted

function handleMove(evt){
    const idx = parseInt(evt.target.id.replace('sq-', ''));

    if(isNan(idx) || board[idx] || winner) return;

    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
}

function getWinner(){
    for(let i = 0; i<winningComb.length; i++){
        if(Math.abs(board[winningComb[i][0]] + board[winningComb[i][1]] +
            board[winnningComb[i][2]]) === 3) return board[winningComb[i][0]];
    }

    if(board.includes(null)) return null;
    return 'T';
}
//render 
function render(){
    renderBoard();
    renderMessage();
}

function renderBoard(){
    board.forEach(function(sqVal, idx){
        const squareEl = document.getElementById(`sq-${idx}`);
        squareEl.style.backgroundColor = COLORS[sqVal];
        squareEl.className = !sqVal ? 'avail' : '';
    })
}

// function to show message
function renderMessage(){
    if(winner === 'T'){
      messageEl.innerText = "It's a Tie!!!";
    }else if(winner){
      messageEl.innerHTML = `<span style="color:
      ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span>'s Wins!`;
    }else{
      messageEl.innerHTML = `<span style="color:     
      ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
      
    }
  }
  