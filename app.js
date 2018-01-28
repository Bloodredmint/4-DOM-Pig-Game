/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//add new variable for storing previous roll
//add new variable for storing winning score
var scores, roundScore, activePlayer, gamePlaying, prevRoll;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    //random number
    var dice=Math.floor(Math.random()*6)+1;

    //display result
    var diceDOM=document.querySelector('.dice');
    diceDOM.style.display='block';
    diceDOM.src='dice-'+dice+'.png';

    //update round score if not equal to 1
    if(dice!==1){
      //reset all scores and next player if both equal 6
      if(dice===6 && prevRoll===6){
        document.getElementById('current-'+activePlayer).textContent='0';
        document.getElementById('score-'+activePlayer).textContent='0';
        nextPlayer();
      }
      else{
      //add score
      roundScore+=dice;
      document.querySelector('#current-'+activePlayer).textContent=roundScore;
      }
      //store dice in previous rolls
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
    if(scores[activePlayer]>=100){
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
  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display='none';
  //reset previous roll to 0
  prevRoll=0;

};

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  scores=[0,0];
  activePlayer=0;
  roundScore=0;
  gamePlaying=true;
// set previous roll to 0
  prevRoll=0;
  document.querySelector('.dice').style.display='none';

  //display HTML input field and button
  //if input is null,score set at default:100
  //else set score to user defined

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

console.log(prevRoll);




//document.querySelector('#current-'+activePlayer).textContent=dice;
//document.querySelector('#current-'+activePlayer).innerHTML='<em>'+dice+'</em>';
//var x=document.querySelector('#score-0').textContent;
