"use strict"

//inningMaster();

//function inningMaster(){
//  var runsa = 0;
//  var runsb = 0;
//  var hitsa = 0;
//  var hitsb = 0;
//  var i;
//  var outs;

//  for (i=1; i<=18; i++){
//    outs = 0;
//    console.log("inning "+i);

//    for (out; out<3;){
//          document.getElementById("roll12").disabled = false;

//    }
//  }
//}

/////////Master outcome functions//////////
function abMaster(){
  var roll;
  var value;
  var outs;
  var bases;
  var result;

  roll = getRoll12();

  value = atBat(roll);

  document.getElementById("roll12").disabled = true;

  result = hitOrOut(value,bases);

  if (reslut<0){
    outs = outs + -(result);
  }else {
    document.getElementById("roll20").disabled = false;
    bases = bases + hitMaster();
  }

  return outs;

}

function hitMaster(){
  var roll;
  var value;

  roll = getRoll20();

  value = typeHit(roll);

  document.getElementById("roll20").disabled = true;

  return value;

}

function brEmptyMaster(){
  var roll = getRoll4();
  var out = 1;

  typeOutNoBr(roll);

  return out;

}

function br1Master(){
  var roll = getRoll6();
  var out = 1;

  typeOut1Br(roll);

  return out;

}

function br2Master(){
  var roll = getRoll8();
  var out = 1;

  typeOut2Br(roll);

  return out;

}

function br3Master(){
  var roll = getRoll10();
  var out = 1;

  typeOut3Br(roll);

  return out;

}

function hitOrOut(value,totalbases){
  var next = value;
  var bases = totalbases;

  if (next === 2){
    document.getElementById("roll20").disabled = false;
    return document.getElementById("roll20").onclick;
  }else if (next === 1){
    document.getElementById("roll12").disabled = false;
    return 1;
  }else if(next === 0){
    if(bases < 1){
      document.getElementById("roll4").disabled = false;
      return document.getElementById("roll4").onclick;
    }
    document.getElementById("roll12").disabled = false;

  }

}

/////////Get rolls//////////
function getPlayBall(){
  var newgame = document.getElementById("start");

}
function getRoll4(){
  var roll4 = Math.ceil(Math.random()*4);

  console.log(roll4);

  return roll4;
}

function getRoll6(){
  var roll6 = Math.ceil(Math.random()*6);

  console.log(roll6);

  return roll6;
}

function getRoll8(){
  var roll8 = Math.ceil(Math.random()*8);

  console.log(roll8);

  return roll8;
}

function getRoll10(){
  var roll10 = Math.ceil(Math.random()*10);

  console.log(roll10);

  return roll10;
}

function getRoll12(){
  var roll12 = Math.ceil(Math.random()*12);

  console.log(roll12, atBat(roll12));

  return roll12;
}

function getRoll20(){
  var roll20 = Math.ceil(Math.random()*20);

  console.log(roll20, typeHit(roll20));

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

  console.log(roll,outcome)

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

  console.log(roll,outcome)

  return value;
}

function typeOutNoBr(roll){
  var roll;
  var outcome;
  var outs = 0;

  if(roll === 1){
    outcome = "strikeout";
    outs = 1;
  }else if(roll === 2){
    outcome = "pop fly";
    outs = 1;
  }else if(roll === 3){
    outcome = "ground out";
    outs = 1;
  }else{
    outcome = "line out";
    outs = 1;
  }

  console.log(outcome);

  return outs;
}

function typeOut1Br(roll){
  var roll;
  var outcome;
  var outs = 0;

  if(roll <= 2){
    outcome = "strikeout";
    outs = 1;
  }else if(roll === 3){
    outcome = "pop fly";
    outs = 1;
  }else if(roll === 4){
    outcome = "ground out";
    outs = 1;
  }else if(roll === 5){
    outcome = "line out";
    outs = 1;
  }else{
    outcome = "double play";
    outs = 2;
  }

  console.log(outcome);

  return outs;
}

function typeOut2Br(roll){
  var roll;
  var outcome;
  var outs = 0;

  if(roll <= 2){
    outcome = "strikeout";
    outs = 1;
  }else if(roll <= 4){
    outcome = "pop fly";
    outs = 1;
  }else if(roll === 5){
    outcome = "ground out";
    outs = 1;
  }else if(roll === 6){
    outcome = "line out";
    outs = 1;
  }else{
    outcome = "double play";
    outs = 2;
  }

  console.log(outcome);

  return outs;
}

function typeOut3Br(roll){
  var roll;
  var outcome;
  var outs;

  if(roll <= 3){
    outcome = "strikeout";
    outs = 1;
  }else if(roll <=5){
    outcome = "pop fly";
    outs = 1;
  }else if(roll === 6){
    outcome = "ground out";
    outs = 1;
  }else if(roll === 7){
    outcome = "line out";
    outs = 1;
  }else if(roll <= 9){
    outcome = "double play";
    outs = 2;
  }else{
    outcome = "triple play";
    outs = 3;
  }

  console.log(outcome);

  return outs;
}
