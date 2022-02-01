"use strict";

// Lazy!
const getEls = x => document.getElementsByClassName(x);

// Persistent modifier to remember what box we highlighed last. 
let boxPos = -1;

// Get ID from event caller: Literally just the last char of the proper ID. 
const getId = el => parseInt(el.target.id.slice(-1), 10);

// function to run when an element is focused. 
function setBox(el) {
  // boxPos stores the current box. Hassle free!
  boxPos = getId(el);
}

function unsetBox(el) {
  // -1 = no box selected.
  boxPos = -1;
}

function nextBox(el) {
  if (el.target.value === "") return;
  if (boxPos === 4) {
    boxPos = -1;
    // deselect all boxes.
    return;
  }
  boxPos++;
}

function focusOn(el) {
  el.focus();
}

// Initialization function. This won't work if this is loaded before the elements are. 
function init() {
  const LETTERS = getEls("input-word");
  
  LETTERS.foreach(x => {
    x.addEventListener("input", nextBox);
    x.addEventListener("focus", setBox);
    x.addEventListener("blur", unsetBox);
  });

}