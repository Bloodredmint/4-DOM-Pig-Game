/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//add new variable to store previous roll
//add new variable to store win amount

var scores, roundScore, activePlayer, gamePlaying, prevRoll, toWin;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
  //hide HTML input field
  if(gamePlaying){
    //random number
    var dice=[0,0];

    for(var i=0;i<2;i++){
      dice[i]=Math.floor(Math.random()*6)+1;
    }

    console.log(dice);
    //var dice=Math.floor(Math.random()*6)+1;

    //display result
    var diceDOM1=document.querySelector('#dice-0');
    var diceDOM2=document.querySelector('#dice-1');
    diceDOM1.style.display='block';
    diceDOM1.src='dice-'+dice[0]+'.png';
    diceDOM2.style.display='block';
    diceDOM2.src='dice-'+dice[1]+'.png';

    //check prevRoll and dice is equal to 6
    console.log(prevRoll +' '+dice);
    if(prevRoll===[6,6] && dice===[6,6]){
      scores[activePlayer]=0;
      document.querySelector('#score-'+activePlayer).textContent='0';
      document.querySelector('#current-'+activePlayer).textContent='0';
      nextPlayer();
    }


    //update round score if not equal to 1
     else if(dice[0]!==1&&dice[1]!==1){
      //add score
      var total=dice[0]+dice[1];
      roundScore+=total;
      document.querySelector('#current-'+activePlayer).textContent=roundScore;
      prevRoll=dice;
    }
    else{
      //next player
      nextPlayer();
    }
  }


});

document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    //add current to GLOBAL
    scores[activePlayer]+=roundScore;

    //update UI
    document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];

    //check win condition
    if(scores[activePlayer]>=toWin){
      //activePlayer wins the game
      document.querySelector('#name-'+activePlayer).textContent='!!!WINNER!!!';
      document.querySelector('.dice').style.display='none';
      document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
      gamePlaying=false;
    }else{
      nextPlayer();
    }
  }


});

function nextPlayer(){
  //next player
  activePlayer===0?activePlayer=1:activePlayer=0;
  roundScore=0;
  prevRoll=0;
  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-0').style.display='none';
  document.getElementById('dice-1').style.display='none';
};

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-win').addEventListener('click', function(){
  toWin=document.getElementById('to-win').valueAsNumber;
  if(isNaN(toWin)){
    toWin=100;
  }
  document.getElementById('to-win').style.display='none';
  document.querySelector('.btn-win').style.display='none';
  document.querySelector('.btn-roll').style.display='block';
  document.querySelector('.btn-hold').style.display='block';
  document.getElementById('setting').textContent='Score to beat is '+toWin;
});

function init(){
  //display at start of game
  scores=[0,0];
  activePlayer=0;
  roundScore=0;
  gamePlaying=true;
  prevRoll=0;

  document.getElementById('dice-0').style.display='none';
  document.getElementById('dice-1').style.display='none';
  document.getElementById('to-win').style.display='block';
  document.querySelector('.btn-win').style.display='block';
  document.getElementById('setting').style.display='block';
  document.querySelector('.btn-roll').style.display='none';
  document.querySelector('.btn-hold').style.display='none';
  document.getElementById('setting').textContent='Please enter score to beat';

  document.getElementById('score-0').textContent='0';
  document.getElementById('score-1').textContent='0';
  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';

  document.getElementById('name-0').textContent='Player 1';
  document.getElementById('name-1').textContent='Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('acitve');
};






//document.querySelector('#current-'+activePlayer).textContent=dice;
//document.querySelector('#current-'+activePlayer).innerHTML='<em>'+dice+'</em>';
//var x=document.querySelector('#score-0').textContent;
