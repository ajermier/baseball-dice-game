//At-Bat baseball
//A dice game to simulate an entire baeball game at the at-bat level.
//Contains 30 (mostly pure) functions
/////////////////////////////////////
//Aaron Jermier 03/10/2017
//Week 2 devCodeCamp project

"use strict";

main();

/////////Game and Inning functions///////////
function gameMaster(){
  var runTotalA = 0;
  var runTotalB = 0;
  var inning = 0;
  var inningRun;

  for(inning; inning < 9;){
    inningRun = inningMaster();

    runTotalA = runTotalA + inningRun;
    inning = inning + 0.5;

    endOfinningA(inning, runTotalA, runTotalB, inningRun); //update scoreboard for away team
    if(inning === 7.5){ //skip the bottom of the 9th if home team winning
      console.log("TAKE ME OUT TO THE BALL GAME...");
      console.log("ROLL OUT THE BARREL...");
    }
    if((inning === 8.5) && (runTotalB > runTotalA)){ //skip the bottom of the 9th if home team winning
      break;
    }

    inningRun = inningMaster();

    runTotalB = runTotalB + inningRun;
    inning = inning + 0.5;

    endOfinningB(inning, runTotalA, runTotalB, inningRun); //update scoreboard for home team
  }

  endOfGame(runTotalA, runTotalB); //update scoreboard determine winner

  reset();
} //loop through 9-innings

function inningMaster(){
  var outs = 0;
  var totalbases = 0;
  var totalruns = 0;
  var runs = 0;
  var br = [0,0,0];

  for (outs; outs<3;){
    totalbases = abMaster(br);
    if(totalbases === -2){
      br[0]=0;
      br[1]=0;
    }
    if (totalbases < 0){
      outs = outs + -totalbases;
      if(outs>3){
        outs = 3;
      }
    }else{
      runs = runConverter(totalbases, br);
      br = brReset(totalbases, br);
      totalruns = totalruns + runs;
    }

    console.log("outs: ",outs);
    console.log("runs: ", runs);
  }

  console.log("HALF INNING OVER");

  return totalruns;
} //loop through each half-inning at-bats

/////////Master outcome functions//////////
function abMaster(br){
  var roll;
  var value;
  var result;

  roll = getRoll12();

  value = atBat(roll);

  result = hitOrOut(value,br);

  return result;
} //12-sided //determines hit, walk, or out

function hitOrOut(value,br){
  var result;

  if (value === 2){ //hit
    result = hitMaster();
  }else if (value === 1){ //walk
    result = 1;
  }else if(value === 0){ //out
    if(br[0] === 0 && br[1] === 0 && br[2] === 0){ //no baserunners
      result = brEmptyMaster();
    }else if((br[0] === 1 && br[1] === 0 && br[2] === 0) || (br[0] === 0 && br[1] === 2 && br[2] === 0) || (br[0] === 0 && br[1] === 0 && br[2] === 3)){ //one baserunner
      result = br1Master();
    }else if((br[0] === 1 && br[1] === 2 && br[2] === 0) || (br[0] === 0 && br[1] === 2 && br[2] === 3)){ //two baserunners
      result = br2Master();
    }else if(br[0] === 1 && br[1] === 2 && br[2] === 3){ //bases loaded
      result = br3Master();
    }
  }
  return result;
} //determines which die to roll (hit die or out die)

function hitMaster(){
  var roll;
  var value;

  roll = getRoll20();

  value = typeHit(roll);

  return value;

} //determines type of hit (single, double, triple, homerun)

function brEmptyMaster(){
  var roll = getRoll4();
  var out;

  out = typeOutNoBr(roll);

  return out;

} //determines type of out with no baserunners

function br1Master(){
  var roll = getRoll6();
  var out;

  out = typeOut1Br(roll);

  return out;

} //determines type of out with 1 baserunner

function br2Master(){
  var roll = getRoll8();
  var out;

  out = typeOut2Br(roll);

  return out;

} //determines type of out with 2 baserunners

function br3Master(){
  var roll = getRoll10();
  var out;

  out = typeOut3Br(roll);

  return out;

} //determines type of out with bases loaded

function runConverter(totalbases, br){ //determines runs scored given result of at bat and current baserunners
  var newBr = [];
  var runs = 0;

  newBr = brUpdater(totalbases, br);

  if((newBr[0]  === 4) && (newBr[1] === 4) && (newBr[2] === 4)){//homerun hit with no one on base
    runs = runs + 1;
  }else if((newBr[0] > 4) && (newBr[1] === 4) && (newBr[2] === 4)){//homerun hit with first occupied
    runs = runs + 2;
  }else if((newBr[0] === 4) && (newBr[1] > 4) && (newBr[2] === 4)){//homerun hit with second occupied
    runs = runs + 2;
  }else if((newBr[0] === 4) && (newBr[1] === 4) && (newBr[2] > 4)){//homerun hit with third occupied
    runs = runs + 2;
  }else if((newBr[0] > 4) && (newBr[1] > 4) && (newBr[2] === 4)){//homerun hit with first and second occupied
    runs = runs + 3;
  }else if((newBr[0] > 4) && (newBr[1] === 4) && (newBr[2] > 4)){//homerun hit with first and third occupied
    runs = runs + 3;
  }else if((newBr[0] === 4) && (newBr[1] > 4) && (newBr[2] > 4)){//homerun hit with second and third occupied
    runs = runs + 3;
  }else if((newBr[0] > 4) && (newBr[1] > 4) && (newBr[2] > 4)){//homerun hit with bases loaded aka grand salami
    runs = runs + 4;
  }else{
    if(newBr[0] > 3){//first occupied
      runs = runs + 1;
      }
    if(newBr[1] > 3){//second occupied
      runs = runs + 1;
      }
    if(newBr[2] > 3){//third occupied
    runs = runs + 1;
    }
  }

  return runs;
}

function brReset(totalbases,br){
  var newBr = [];

  newBr = brUpdater(totalbases, br);

  if ((br[2] === 3) && (newBr[3] === 4)){ //if third was occupied and a walk or single
    newBr[2] = 3; //third remains occupied (single assumes infield single)
  }else if (newBr[2] !== 3){ //if third base doesn't have a 3 empty it
    newBr[2] = 0;
  }

  if (((br[1] === 2) && (newBr[1] === 3)) && ((br[0] === 1) && (newBr[0] === 2))){// if first and second occupied and a single or walk
      newBr[0] = 1;
      newBr[1] = 2;
      newBr[2] = 3;
    }

  if ((br[1] === 2) && (newBr[1] === 3)){ //if second was occupied and a single or walk
    newBr[1] = 2; //second remains occupied
  }else if ((br[1] === 2) && (newBr[1] === 4)){//if second was occupied and a double
    newBr[1] = 2; //second remains occupied
    newBr[2] = 0;
  }else if (newBr[1] === 3){ //if second has a 3
    newBr[2] = 3;//turn third to 3
    newBr[1] = 0;//turn second to 0
  }else if (newBr[1] !== 2){ //if second doesn't have a 2
    newBr[1] = 0; //turn second to 0
  }

  if ((br[0] === 1) && (newBr[0] === 2)){ //if first was occupied and a single or walk
      newBr[0] = 1; //first remains occupied
      newBr[1] = 2; //second becomes occupied
    }else if (newBr[0] === 3){//if first has a 3
      newBr[2] = 3;//turn third to 3
      newBr[0] = 0;//turn first to 0
    }else if (newBr[0] === 2){//if first has a 2
      newBr[1] = 2;//turn second to 2
      newBr[0] = 0;//turn first to a 0
    }else if (newBr[0] !== 1){//if first has a 1
      newBr[0] = 0;//turn first to 0
    }

  console.log("Baserunners: "+newBr);
  return newBr;
} //updates base runners//resets baserunners given result of at bat and current baserunners

function brUpdater(totalbases, br){ //adds total bases to current baserunners
  var newBr = [];
  var i;

  for(i=0; i<3; i++){
    newBr[i] = br[i]+totalbases;
  }
  return newBr;
}

/////////Get rolls//////////
function getRoll4(){
  var roll4 = Math.ceil(Math.random()*4);

  return roll4;
}

function getRoll6(){
  var roll6 = Math.ceil(Math.random()*6);

  return roll6;
}

function getRoll8(){
  var roll8 = Math.ceil(Math.random()*8);

  return roll8;
}

function getRoll10(){
  var roll10 = Math.ceil(Math.random()*10);

  return roll10;
}

function getRoll12(){
  var roll12 = Math.ceil(Math.random()*12);

  return roll12;
}

function getRoll20(){
  var roll20 = Math.ceil(Math.random()*20);

  return roll20;
}

////////////Assign baseball values to die//////////
function atBat(roll){
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
  console.log("roll12: "+roll+" "+"outcome: "+outcome);
  return value;
}

function typeHit(roll){
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

  console.log("roll20: "+roll+" "+"outcome: "+outcome);

  return value;
}

function typeOutNoBr(roll){
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

  console.log("roll4: "+roll+" "+"outcome: "+outcome);

  return outs;
}

function typeOut1Br(roll){
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

  console.log("roll6: "+roll+" "+"outcome: "+outcome);

  return outs;
}

function typeOut2Br(roll){
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

  console.log("roll8: "+roll+" "+"outcome: "+outcome);

  return outs;
}

function typeOut3Br(roll){
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

  console.log("roll10: "+roll+" "+"outcome: "+outcome);
  return outs;
}

//////////Console and scoreboard updaters//////////
function endOfinningA(inning, runTotalA, runTotalB, inningRuns){
  console.log("After "+inning+", "+" away: "+runTotalA+", home: "+runTotalB);
  document.getElementById("A"+(inning+.5)).innerHTML = inningRuns;
}

function endOfinningB(inning, runTotalA, runTotalB, inningRuns){
  console.log("After "+inning+", "+" away: "+runTotalA+", home: "+runTotalB);
  document.getElementById("B"+(inning)).innerHTML = inningRuns;
}

function endOfGame(runTotalA, runTotalB){
  document.getElementById("AF").innerHTML = runTotalA;
  document.getElementById("BF").innerHTML = runTotalB;
  console.log("GAME OVER");
  if(runTotalA > runTotalB){
    console.log("Away team wins!");
    document.getElementById("outcome").innerHTML = "AWAY TEAM WINS!";
  }else if(runTotalB > runTotalA){
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
  prompt.addEventListener("click", gameMaster);
}

function reset(){
  var prompt = document.getElementById("clear");
  prompt.addEventListener("click", clearItems);
}

function clearItems(){
  document.getElementById("A1").innerHTML = "";
  document.getElementById("A2").innerHTML = "";
  document.getElementById("A3").innerHTML = "";
  document.getElementById("A4").innerHTML = "";
  document.getElementById("A5").innerHTML = "";
  document.getElementById("A6").innerHTML = "";
  document.getElementById("A7").innerHTML = "";
  document.getElementById("A8").innerHTML = "";
  document.getElementById("A9").innerHTML = "";
  document.getElementById("AF").innerHTML = "";
  document.getElementById("B1").innerHTML = "";
  document.getElementById("B2").innerHTML = "";
  document.getElementById("B3").innerHTML = "";
  document.getElementById("B4").innerHTML = "";
  document.getElementById("B5").innerHTML = "";
  document.getElementById("B6").innerHTML = "";
  document.getElementById("B7").innerHTML = "";
  document.getElementById("B8").innerHTML = "";
  document.getElementById("B9").innerHTML = "";
  document.getElementById("BF").innerHTML = "";
  document.getElementById("prompt").innerHTML = "";
  document.getElementById("outcome").innerHTML = "";

  document.getElementById("start").disabled = false;
  document.getElementById("clear").disabled = true;
}
