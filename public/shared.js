(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// EXPORT SHARED FUNCTION(S) 

module.exports = {
    menu: getMenu,
    menuKitchen: getMenuKitchen,
};

// FUNCTION |  getMenu()
// Retrieves data from /menu endpoint
//     * used by Menu page only (only available items)

function getMenu(next){
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/menu');
    request.addEventListener('load', function(){

        let response = JSON.parse(request.responseText);

            for(let i = 0; i < response.length; i++){
                    if (response[i].available === true){
                        next(response[i]);
                    };
            };
    });

    request.send();
};

// FUNCTION |  getMenuKitchen()
// Retrieves data from /menu endpoint
//     * used by Kitchen page only (all items)

function getMenuKitchen(next){
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/menu');
    request.addEventListener('load', function(){

        let response = JSON.parse(request.responseText);

            for(let i = 0; i < response.length; i++){
                        next(response[i]);
            };
    });

    request.send();
};




},{}]},{},[1]);
