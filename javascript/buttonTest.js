"use strict"
play();

function game(){
  var flag = true;
  while(flag = true){
  document.getElementById("button1").disabled = false;
  document.getElementById("play").disabled = true;
    button1Click(flag);
    button2Click(flag);
    button3Click(flag);
  }
}

function play(){
  var click = document.getElementById("play");

  click.addEventListener("click", game);
}

function button1Click(flag){
  var click = document.getElementById("button1");
  var flag = false;

  document.getElementById("button1").disabled = false;

  click.addEventListener("click", button1);

  return flag;
}

function button2Click(){
  var click = document.getElementById("button2");

  document.getElementById("button2").disabled = false;

  click.addEventListener("click", button2);
}

function button3Click(){
  var click = document.getElementById("button3");

  document.getElementById("button3").disabled = false;

  click.addEventListener("click", button3);
}

function button1(){
  var flag = true;
  document.getElementById("outcome").innerHTML = "You pressed button 1";

  document.getElementById("button1").disabled = true;

  return flag;
}

function button2(){
  document.getElementById("outcome").innerHTML = "You pressed button 2";

  document.getElementById("button2").disabled = true;
}

function button3(){
  document.getElementById("outcome").innerHTML = "You pressed button 3";

  document.getElementById("button3").disabled = true;
}
