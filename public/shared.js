(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// EXPORT SHARED REGEX MODULES 

module.exports = {
    ccCheck: checkCreditCard,
    alphaCheck: checkAlpha,
    emailCheck: checkEmail,
};


function checkCreditCard(ccNumber){
    let check = new RegExp("([0-9]{4}[- ]{0,1}){3}[0-9]{4}");

    if (check.test(ccNumber)){
        return 'Valid'
    } else {
        return 'Invalid Credit Card Number'
    }   
}

function checkAlpha(string){
    let check = new RegExp("[A-Za-z]+");

    if (check.test(string)){
        return 'Valid'
    } else {
        return 'Invalid'
    }   
}

function checkEmail(email){
    let check = new RegExp("[A-Za-z0-9._+-]+@[a-zA-Z0-9.-]+\.[A-Za-z0-9]+");

    if (check.test(email)){
        return 'Valid'
    } else {
        return 'Invalid'
    }   
}


},{}]},{},[1]);
