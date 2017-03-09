"use strict";

main();

/////////Game and Inning functions (majority of console/html output)///////////

function gameMaster(){
  var basesTotalA = 0;
  var basesTotalB = 0;
  var inning = 0;
  var inningBt;

  for(inning; inning < 9;){
    inningBt = inningMaster();
    basesTotalA = basesTotalA + inningBt;
    inning = inning + 0.5;
    console.log("After "+inning+", "+" team A score: "+basesTotalA+", team B score: "+basesTotalB);
    document.getElementById("A"+(inning+.5)).innerHTML = inningBt;
    inningBt = inningMaster();
    basesTotalB = basesTotalB + inningBt;
    inning = inning + 0.5;
    console.log("After "+inning+", "+" team A score: "+basesTotalA+", team B score: "+basesTotalB);
    document.getElementById("B"+(inning)).innerHTML = inningBt;
    //alert("After "+inning+", "+" team A score: "+basesTotalA+", team B score: "+basesTotalB);
  }
  document.getElementById("AF").innerHTML = basesTotalA;
  document.getElementById("BF").innerHTML = basesTotalB;
  console.log("GAME OVER");
  if(basesTotalA > basesTotalB){
    console.log("Team A wins!");
    document.getElementById("outcome").innerHTML = "Team A wins!";
  }else if(basesTotalB > basesTotalA){
    console.log("Team B wins!");
    document.getElementById("outcome").innerHTML = "Team B wins!";
  }else{
  console.log("The game ends in a tie!")
  document.getElementById("outcome").innerHTML = "It's a tie!";
  }
  document.getElementById("clear").disabled = false;
  document.getElementById("start").disabled = true;
  reset();

}

function inningMaster(){
  var outs = 0;
  var totalbases = 0;
  var value;

  for (outs; outs<3;){
    value = abMaster(totalbases);
    if (value < 0){
      outs = outs + -value;
      if(outs>3){
        outs = 3;
      }
    }else{
      totalbases = totalbases + value;
    }

    console.log("outs: ",outs);
    console.log("total bases: ", totalbases);
  }

  console.log("HALF INNING OVER");

  return totalbases;
}

/////////Master outcome functions//////////
function abMaster(totalbases){
  var roll;
  var value;
  var bases = totalbases;
  var result;
  var pass;

  roll = getRoll12();

  value = atBat(roll);

  result = hitOrOut(value,totalbases);

  if (result<0){
    pass = result;
  }else {
    pass = result;
  }

  return pass;
}

function hitOrOut(value,totalbases){
  var next = value;
  var bases = totalbases;
  var result;

  if (next === 2){
    result = hitMaster();
    return result;
  }else if (next === 1){
    result = 1;
    return result;
  }else if(next === 0){
    if(bases < 1){
      result = brEmptyMaster();
      return result;
    }else if(bases === 1){
      result = br1Master();
      return result;
    }else if( bases === 2){
      result = br2Master();
      return result;
    }else {
      result = br3Master();
      return result;
    }
  }
}

function hitMaster(){
  var roll;
  var value;

  roll = getRoll20();

  value = typeHit(roll);

  return value;

}

function brEmptyMaster(){
  var roll = getRoll4();
  var out;

  out = typeOutNoBr(roll);

  return out;

}

function br1Master(){
  var roll = getRoll6();
  var out;

  out = typeOut1Br(roll);

  return out;

}

function br2Master(){
  var roll = getRoll8();
  var out;

  out = typeOut2Br(roll);

  return out;

}

function br3Master(){
  var roll = getRoll10();
  var out;

  out = typeOut3Br(roll);

  return out;

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
