// Function getBill()
// ------------------------------------------------------ 
//   - Retrieves data from /bill?table_id=<table_id> endpoint

function getBill(table) {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/bill?table_id='+table);
    request.addEventListener('load', function(){

        let response = JSON.parse(request.responseText);

            for(let i = 0; i < response.items.length; i++){
                        addBill(response.items[i]);
            };
            
        });

    request.send();
}

// Function addBill()
// ------------------------------------------------------ 
//  - Used in getTables() in 'load' event listener below
//  - For each object in /order, creates 'div' element in the 'orders' 
//    section and populates the mustache template with the applicable 
//    properties

function addBill(item) {

    let billTemplate = document.querySelector('#bill-template').innerHTML;
    let parent = document.querySelector('.menu');
    let container = document.createElement('div');
    container.classList.add('menuItem');
    container.innerHTML = Mustache.render(billTemplate, {
        description: item.name,
        price: item.price,
        });

    parent.appendChild(container);

};

function addTotal(total){
    let totalTemplate = document.querySelector('#total-template').innerHTML;
    let parent = document.querySelector('.menu');
    let container = document.createElement('div');
    container.classList.add('menuItemTotal');
    container.innerHTML = Mustache.render(totalTemplate, {
        totalBill: total,
        });

    parent.appendChild(container);
}

function getTotal(table) {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/bill?table_id='+table);
    request.addEventListener('load', function(){

        let response = JSON.parse(request.responseText);
        let total = 0;

            console.log(response.items.length);
            for(let i = 0; i < response.items.length; i++){
                        total = total + response.items[i].price;
            };
            
        addTotal(total.toFixed(2));

        });

    request.send();
}

function getTables() {
    let request = new XMLHttpRequest();
        request.open('GET', 'http://tiy-28202.herokuapp.com/order');
        request.addEventListener('load', function(){

            let response = JSON.parse(request.responseText);

            let selection = document.querySelector('.tableID');
            selection.addEventListener('change', function(){
                
            let showPayment = document.querySelector('.payment');
            showPayment.style.display = "block";

                    getTotal(selection.value);
                    getBill(selection.value);
                    let hide = document.querySelector('.pickOrder');
                    hide.style.display = "none";

                });

                for(let i = 0; i < response.length; i++){
                            addTable(response[i].table_id);
                };


                
            });

        request.send();


}

function addTable(table_id){
    let parent = document.querySelector('.tableID');
    let container = document.createElement('option');
    container.textContent = table_id;
    container.value = table_id;

    parent.appendChild(container); 

}


window.addEventListener('load', function() {
    getTables();

// RegEX Validation

// 1. Credit Card Number
let creditCardNum = document.querySelector('.creditCardNum');
creditCardNum.addEventListener('keyup', function () {
        if(validateCC.ccCheck(creditCardNum.value)==='Valid'){
        document.getElementById("ccNUM").style.color = "green";
         } 
});

// 2. Name (any string containing only alpha chars)
let name = document.querySelector('.name');
name.addEventListener('keyup', function(){
        if(validateName.alphaCheck(name.value)==="Valid"){
        document.getElementById("anyName").style.color = "green";
        }
});

// 3. Email 
let email = document.querySelector('.email');
email.addEventListener('keyup', function(){
        if(validateEmail.emailCheck(email.value)==="Valid"){
        document.getElementById("checkEmail").style.color = "green";
        }
});

/* Nav Bars - When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
    let navigation = document.querySelector('.fa');
    navigation.addEventListener('click', function(){
        console.log('test');
        document.getElementById("myDropdown").classList.toggle("show");
});

});

// Import Regex Modules
let validateCC = require('./shared'); 
let validateName = require('./shared'); 
let validateEmail = require('./shared'); 

// Nav Bars - Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.fa')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}





