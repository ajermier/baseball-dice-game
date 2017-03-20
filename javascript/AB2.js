//At-Bat baseball
//A dice game to simulate an entire baeball game at the at-bat level.
//
/////////////////////////////////////
//
//Aaron Jermier 03/10/2017
//Week 2 devCodeCamp project

"use strict";

main();

/////////Game and Inning functions///////////
function getGameResults(){ //loops through 9 half innings to complete a full baseball game
  var runsAway = 0;
  var runsHome = 0;
  var inning = 0;
  var inningRuns;

  for(inning; inning < 18;){
    inningRuns = getInningResults();
    runsAway = runsAway + inningRuns;
    inning = inning + 1;

    endOfInningOutput("Away", inning, runsAway, runsHome, inningRuns); //update scoreboard for away team

    specialConsoleOutput(inning);

    if((inning === 17) && (runsHome > runsAway)){ //skip the bottom of the 9th if home team winning
      break;
    }

    inningRuns = getInningResults();
    runsHome = runsHome + inningRuns;
    inning = inning + 1;
    endOfInningOutput("Home", inning, runsAway, runsHome, inningRuns); //update scoreboard for home team
  }

  endOfGameOutput(runsAway, runsHome); //update scoreboard determine winner

  reset();
}

function getInningResults(){ //repeats at-bats while outs are <3
  var outs = 0;
  var totalBases = 0;
  var totalruns = 0;
  var currentBaseRunners = [0,0,0];

  for (outs; outs<3;){
    var atBatRuns = 0;

    totalBases = getAtBatResults(currentBaseRunners);
    outs = UpdateOuts(totalBases, outs);
    atBatRuns = UpdateRuns(totalBases, currentBaseRunners, atBatRuns);
    totalruns = totalruns + atBatRuns;
    currentBaseRunners = resetBaseRunners(totalBases, currentBaseRunners);
    endOfAtBatOutput(outs, atBatRuns, currentBaseRunners);
  }

  endOfHalfInningOutput();

  return totalruns;
}

/////////outcome functions//////////
function getAtBatResults(currentBaseRunners){

  var result;

  result = DetermineHitOrOut(getAtBatValues(getRoll(12)), currentBaseRunners);

  return result;
}

//12-sided //determines hit, walk, or out
function DetermineHitOrOut(getAtBatValues,currentBaseRunners){ //getAtBatValues: 0- out 1- walk 2- hit
  var result;

  if (getAtBatValues === 2){ //hit
    result = getTypeHit(getRoll(20));
  }else if (getAtBatValues === 1){ //walk
    result = 1;
  }else if(getAtBatValues === 0){ //out
    if(currentBaseRunners[0] === 0 && currentBaseRunners[1] === 0 && currentBaseRunners[2] === 0){ //no baserunners
      result = typeOutNoBaseRunners(getRoll(4));
    }else if((currentBaseRunners[0] === 1 && currentBaseRunners[1] === 0 && currentBaseRunners[2] === 0) || (currentBaseRunners[0] === 0 && currentBaseRunners[1] === 2 && currentBaseRunners[2] === 0) || (currentBaseRunners[0] === 0 && currentBaseRunners[1] === 0 && currentBaseRunners[2] === 3)){ //one baserunner
      result = typeOut1BaseRunner(getRoll(6));
    }else if((currentBaseRunners[0] === 1 && currentBaseRunners[1] === 2 && currentBaseRunners[2] === 0) || (currentBaseRunners[0] === 0 && currentBaseRunners[1] === 2 && currentBaseRunners[2] === 3)){ //two baserunners
      result = typeOut2BaseRunners(getRoll(8));
    }else if(currentBaseRunners[0] === 1 && currentBaseRunners[1] === 2 && currentBaseRunners[2] === 3){ //bases loaded
      result = typeOut3BaseRunners(getRoll(8));
    }
  }
  return result;
}

function UpdateOuts(totalBases, outs){
  if (totalBases < 0){//keep track of outs
    outs = outs + -totalBases;
    if(outs>3){//make sure outs never exceed 3
      outs = 3;
    }
  }
  return outs;
}

function UpdateRuns(totalBases, currentBaseRunners, totalruns){
  if(totalBases >= 0){//convert total baseses and current base runners to runs and new base runners
      totalruns = totalruns + getRuns(totalBases, currentBaseRunners);
  }
  return totalruns;
}

function getRuns(totalBases, currentBaseRunners){ //determines runs scored given result of at bat and current baserunners
  var newBaseRunners = [];
  var runs = 0;

  newBaseRunners = updateBaseRunners(totalBases, currentBaseRunners);

  if((newBaseRunners[0]  === 4) && (newBaseRunners[1] === 4) && (newBaseRunners[2] === 4)){//homerun hit with no one on base
    runs = runs + 1;
  }else if((newBaseRunners[0] > 4) && (newBaseRunners[1] === 4) && (newBaseRunners[2] === 4)){//homerun hit with first occupied
    runs = runs + 2;
  }else if((newBaseRunners[0] === 4) && (newBaseRunners[1] > 4) && (newBaseRunners[2] === 4)){//homerun hit with second occupied
    runs = runs + 2;
  }else if((newBaseRunners[0] === 4) && (newBaseRunners[1] === 4) && (newBaseRunners[2] > 4)){//homerun hit with third occupied
    runs = runs + 2;
  }else if((newBaseRunners[0] > 4) && (newBaseRunners[1] > 4) && (newBaseRunners[2] === 4)){//homerun hit with first and second occupied
    runs = runs + 3;
  }else if((newBaseRunners[0] > 4) && (newBaseRunners[1] === 4) && (newBaseRunners[2] > 4)){//homerun hit with first and third occupied
    runs = runs + 3;
  }else if((newBaseRunners[0] === 4) && (newBaseRunners[1] > 4) && (newBaseRunners[2] > 4)){//homerun hit with second and third occupied
    runs = runs + 3;
  }else if((newBaseRunners[0] > 4) && (newBaseRunners[1] > 4) && (newBaseRunners[2] > 4)){//homerun hit with bases loaded aka grand salami
    runs = runs + 4;
  }else if((currentBaseRunners[2] === 3)  && (currentBaseRunners[1] === 0) && (currentBaseRunners[0] === 0) && newBaseRunners[0] === 1){//third occupied and walk or single
    runs = runs + 0;//no runs scored
  }else{
    if(newBaseRunners[0] > 3){//first occupied
      runs = runs + 1;
      }
    if(newBaseRunners[1] > 3){//second occupied
      runs = runs + 1;
      }
    if(newBaseRunners[2] > 3){//third occupied
    runs = runs + 1;
    }
  }
  return runs;
}

function resetBaseRunners(totalBases,currentBaseRunners){
  var newBaseRunners = [];

  newBaseRunners = updateBaseRunners(totalBases, currentBaseRunners);

  newBaseRunners = UpdateThirdOccupied(totalBases, currentBaseRunners, newBaseRunners);
  newBaseRunners = UpdateSecondAndFirstOccupied(totalBases, currentBaseRunners, newBaseRunners);
  newBaseRunners = UpdateSecondOccupied(totalBases, currentBaseRunners, newBaseRunners);
  newBaseRunners = UpdateFirstOccupied(totalBases, currentBaseRunners, newBaseRunners);
  newBaseRunners = UpdateDoublePlayAndOut(totalBases, currentBaseRunners, newBaseRunners);

  return newBaseRunners;
}

function updateBaseRunners(totalBases, currentBaseRunners){ //adds total bases to current baserunners
  var newBaseRunners = [];
  var i;

  for(i=0; i<3; i++){
    newBaseRunners[i] = currentBaseRunners[i]+totalBases;
  }
  return newBaseRunners;
}

function UpdateThirdOccupied(totalBases, currentBaseRunners, newBaseRunners){
  if ((currentBaseRunners[2] === 3) && (newBaseRunners[3] === 4) && totalBases > 0){ //if third was occupied and a walk or single
    newBaseRunners[2] = 3; //third remains occupied (single assumes infield single)
  }else if (newBaseRunners[2] !== 3 && totalBases > 0){ //if third base doesn't have a 3 empty it
    newBaseRunners[2] = 0;
  }
  return newBaseRunners;
}

function UpdateSecondAndFirstOccupied(totalBases, currentBaseRunners, newBaseRunners){
  if (((currentBaseRunners[1] === 2) && (newBaseRunners[1] === 3)) && ((currentBaseRunners[0] === 1) && (newBaseRunners[0] === 2)) && totalBases > 0){// if first and second occupied and a single or walk
      newBaseRunners[0] = 1;
      newBaseRunners[1] = 2;
      newBaseRunners[2] = 3;
  }
  return newBaseRunners;
}

function UpdateSecondOccupied(totalBases, currentBaseRunners, newBaseRunners){
  if ((currentBaseRunners[1] === 2) && (newBaseRunners[1] === 3) && totalBases > 0){ //if second was occupied and a single or walk
    newBaseRunners[1] = 2; //second remains occupied
  }else if ((currentBaseRunners[1] === 2) && (newBaseRunners[1] === 4) && totalBases > 0){//if second was occupied and a double
    newBaseRunners[1] = 2; //second remains occupied
    newBaseRunners[2] = 0;
  }else if (newBaseRunners[1] === 3 && totalBases > 0){ //if second has a 3
    newBaseRunners[2] = 3;//turn third to 3
    newBaseRunners[1] = 0;//turn second to 0
  }else if (newBaseRunners[1] !== 2 && totalBases > 0){ //if second doesn't have a 2
    newBaseRunners[1] = 0; //turn second to 0
  }
  return newBaseRunners;
}

function UpdateFirstOccupied(totalBases, currentBaseRunners, newBaseRunners){
  if ((currentBaseRunners[0] === 1) && (newBaseRunners[0] === 2) && totalBases > 0){ //if first was occupied and a single or walk
    newBaseRunners[0] = 1; //first remains occupied
    newBaseRunners[1] = 2; //second becomes occupied
  }else if (newBaseRunners[0] === 3 && totalBases > 0){//if first has a 3
    newBaseRunners[2] = 3;//turn third to 3
    newBaseRunners[0] = 0;//turn first to 0
  }else if (newBaseRunners[0] === 2 && totalBases > 0){//if first has a 2
    newBaseRunners[1] = 2;//turn second to 2
    newBaseRunners[0] = 0;//turn first to a 0
  }else if (newBaseRunners[0] !== 1 && totalBases > 0){//if first has a 1
    newBaseRunners[0] = 0;//turn first to 0
  }
  return newBaseRunners;
}

function UpdateDoublePlayAndOut(totalBases, currentBaseRunners, newBaseRunners){
  if(totalBases === -1){//if an out
    return currentBaseRunners;
  }else if(totalBases === -2){ //if double play
      if((currentBaseRunners[0] === 1 && currentBaseRunners[1] === 2 && currentBaseRunners[2] === 0) || (currentBaseRunners[0] === 0 && currentBaseRunners[1] === 2 && currentBaseRunners[2] === 3) || (currentBaseRunners[0] === 1 && currentBaseRunners[1] === 0 && currentBaseRunners[2] === 3) ){
        newBaseRunners[0] = 0;
        newBaseRunners[1] = 0;
        newBaseRunners[2] = 3;//if first and second or second and third and double play runner remains on 3
        return newBaseRunners;
      }else if ((currentBaseRunners[0] === 1 && currentBaseRunners[1] === 2 && currentBaseRunners[2] === 3)){
        newBaseRunners[0] = 1;
        newBaseRunners[1] = 2;
        newBaseRunners[2] = 0;
        return newBaseRunners;
      }else {
        newBaseRunners[0] = 0;
        newBaseRunners[1] = 0;
        newBaseRunners[2] = 0;
        return newBaseRunners;
      }

    }
  return newBaseRunners;
}

/////////Get rolls//////////
function getRoll(die){
  var roll = Math.ceil(Math.random()*die);
  rollOutput(die, roll);

  return roll;
}

////////////Assign baseball values to die//////////
function getAtBatValues(roll){
  var roll;
  var outcome;
  var value;

  if (roll <= 8){
    outcome = "out";
    value = 0;
  }else if (roll === 9){
    outcome = "walk";
    value = 1;
  }else{
    outcome = "hit";
    value = 2;
  }
  rollOutcomeOutput(outcome);
  return value;
}

function getTypeHit(roll){
  var roll;
  var outcome;
  var value;

  if (roll <= 13){
    outcome = "single";
    value = 1;
  }else if (roll <=17){
    outcome = "double";
    value = 2;
  }else if (roll === 18){
    outcome = "triple";
    value = 3;
  }else {
    outcome = "homerun";
    value = 4;
  }
  rollOutcomeOutput(outcome);
  return value;
}

function typeOutNoBaseRunners(roll){
  var roll;
  var outcome;
  var outs;

  if(roll === 1){
    outcome = "strikeout";
    outs = -1;
  }else if(roll === 2){
    outcome = "pop fly";
    outs = -1;
  }else if(roll === 3){
    outcome = "ground out";
    outs = -1;
  }else{
    outcome = "line out";
    outs = -1;
  }
  rollOutcomeOutput(outcome);
  return outs;
}

function typeOut1BaseRunner(roll){
  var roll;
  var outcome;
  var outs = 0;

  if(roll <= 2){
    outcome = "strikeout";
    outs = -1;
  }else if(roll === 3){
    outcome = "pop fly";
    outs = -1;
  }else if(roll === 4){
    outcome = "ground out";
    outs = -1;
  }else if(roll === 5){
    outcome = "line out";
    outs = -1;
  }else{
    outcome = "double play";
    outs = -2;
  }
  rollOutcomeOutput(outcome);
  return outs;
}

function typeOut2BaseRunners(roll){
  var roll;
  var outcome;
  var outs = 0;

  if(roll <= 2){
    outcome = "strikeout";
    outs = -1;
  }else if(roll <= 4){
    outcome = "pop fly";
    outs = -1;
  }else if(roll === 5){
    outcome = "ground out";
    outs = -1;
  }else if(roll === 6){
    outcome = "line out";
    outs = -1;
  }else{
    outcome = "double play";
    outs = -2;
  }
  rollOutcomeOutput(outcome);
  return outs;
}

function typeOut3BaseRunners(roll){
  var roll;
  var outcome;
  var outs;

  if(roll <= 3){
    outcome = "strikeout";
    outs = -1;
  }else if(roll <=5){
    outcome = "pop fly";
    outs = -1;
  }else if(roll === 6){
    outcome = "ground out";
    outs = -1;
  }else if(roll === 7){
    outcome = "double play";
    outs = -2;
  }else if(roll <= 9){
    outcome = "double play";
    outs = -2;
  }else{
    outcome = "triple play";
    outs = -3;
  }
  rollOutcomeOutput(outcome);
  return outs;
}

//////////Console and scoreboard updaters//////////
function specialConsoleOutput(inning){
  if(inning === 15){ //7th inning stretch
    console.log("TAKE ME OUT TO THE BALL GAME...");
    console.log("ROLL OUT THE BARREL...");
  }
}

function rollOutput(die, roll){
  console.log(die+" sided die roll: " + roll);
}

function rollOutcomeOutput(outcome){
  console.log("    ----> " + outcome);
}

function endOfAtBatOutput(outs, runs, currentBaseRunners){
  console.log("outs: ",outs);
  console.log("runs: ", runs);
  console.log("Baserunners: "+currentBaseRunners);
}

function endOfHalfInningOutput(){
  console.log("HALF INNING OVER");
  console.log("------------------");
  console.log("------------------");
}

function endOfInningOutput(team, inning, runsAway, runsHome, inningRuns){ //update console and scoreboard
  console.log("After " + (inning/2) + ",  away: " + runsAway + ", home: "+runsHome);
  console.log("------------------");
  console.log("------------------");
  document.getElementById(team + (inning)).innerHTML = inningRuns;
}

function endOfGameOutput(runsAway, runsHome){
  document.getElementById("AwayF").innerHTML = runsAway;
  document.getElementById("HomeF").innerHTML = runsHome;
  console.log("GAME OVER");
  if(runsAway > runsHome){
    console.log("Away team wins!");
    document.getElementById("outcome").innerHTML = "AWAY TEAM WINS!";
  }else if(runsHome > runsAway){
    console.log("Home team wins!");
    document.getElementById("outcome").innerHTML = "HOME TEAM WINS!";
  }else{
  console.log("The game ends in a tie!")
  document.getElementById("outcome").innerHTML = "IT'S A TIE!";
  }
  document.getElementById("clear").disabled = false;
  document.getElementById("start").disabled = true;
}

//////////Administrative buttons (start/clear) management//////////
function main(){
  var prompt = document.getElementById("start");
  document.getElementById("start").disabled = false;
  document.getElementById("clear").disabled = true;
  prompt.addEventListener("click", getGameResults);
}

function reset(){
  var prompt = document.getElementById("clear");
  prompt.addEventListener("click", clearItems);
}

function clearItems(){
  document.getElementById("Away1").innerHTML = "";
  document.getElementById("Away3").innerHTML = "";
  document.getElementById("Away5").innerHTML = "";
  document.getElementById("Away7").innerHTML = "";
  document.getElementById("Away9").innerHTML = "";
  document.getElementById("Away11").innerHTML = "";
  document.getElementById("Away13").innerHTML = "";
  document.getElementById("Away15").innerHTML = "";
  document.getElementById("Away17").innerHTML = "";
  document.getElementById("AwayF").innerHTML = "";
  document.getElementById("Home2").innerHTML = "";
  document.getElementById("Home4").innerHTML = "";
  document.getElementById("Home6").innerHTML = "";
  document.getElementById("Home8").innerHTML = "";
  document.getElementById("Home10").innerHTML = "";
  document.getElementById("Home12").innerHTML = "";
  document.getElementById("Home14").innerHTML = "";
  document.getElementById("Home16").innerHTML = "";
  document.getElementById("Home18").innerHTML = "";
  document.getElementById("HomeF").innerHTML = "";
  document.getElementById("prompt").innerHTML = "";
  document.getElementById("outcome").innerHTML = "";

  document.getElementById("start").disabled = false;
  document.getElementById("clear").disabled = true;
}
