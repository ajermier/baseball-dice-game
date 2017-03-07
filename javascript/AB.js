"use strict"

/////////Master outcome functions//////////
function brMaster(){
  var roll = getRoll4();

}

function br1Master(){
  var roll = getRoll6();

}

function br2Master(){
  var roll = getRoll8();

}

function br3Master(){
  var roll = getRoll10();

}

function abMaster(){
  var roll = getRoll12();

  atBat(roll);
}

function hitMaster(){
  var roll = getRoll20();

}

/////////Get roll from user//////////
function getRoll4(){
  var roll = document.getElementById("roll4");
  var roll4 = Math.ceil(Math.random()*4);

  console.log(roll4);

  return roll4;
}

function getRoll6(){
  var roll = document.getElementById("roll6");
  var roll6 = Math.ceil(Math.random()*6);

  console.log(roll6);

  return roll6;
}

function getRoll8(){
  var roll = document.getElementById("roll8");
  var roll8 = Math.ceil(Math.random()*8);

  console.log(roll8);

  return roll8;
}

function getRoll10(){
  var roll = document.getElementById("roll10");
  var roll10 = Math.ceil(Math.random()*10);

  console.log(roll10);

  return roll10;
}

function getRoll12(){
  var roll = document.getElementById("roll12");
  var roll12 = Math.ceil(Math.random()*12);

  console.log(roll12);

  return roll12;
}

function getRoll20(){
  var roll = document.getElementById("roll20");
  var roll20 = Math.ceil(Math.random()*20);

  console.log(roll20);

  return roll20;
}

////////////Assign baseball values to die//////////
function atBat(roll){
  var roll;
  var outcome;

  if (roll <= 8){
    outcome = "out";
  }else if (roll === 9){
    outcome = "walk";
  }else{
    outcome = "hit";
  }
console.log(outcome)

return outcome;
}
