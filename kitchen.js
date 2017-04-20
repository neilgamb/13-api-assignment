// Function getMenu()
// ------------------------------------------------------ 
//    Retrieves data from /menu endpoint.  All items are
//    called using addItem() below

function getMenu(){
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/menu');
    request.addEventListener('load', function(){

        let response = JSON.parse(request.responseText);

            for(let i = 0; i < response.length; i++){
                     addItem(response[i]);
            };
    });

    request.send();
};

// Function addItem()
// ------------------------------------------------------ 
//    For each  object in /menu, creates 'div' 
//    element in the 'menu' section and populates the mustache 
//    template with the applicable properties
//    On 'Kitchen' page, the button element that is created is an 
//    'Change Availability' button

function addItem(item){

    let avail;

    if (item.available === true){
        avail = "Available";
    } else {
        avail = "SOLD OUT";
    };

    let menuTemplate = document.querySelector('#menu-template').innerHTML;

    let parent = document.querySelector('.menu');
    let container = document.createElement('div');
    container.classList.add('menuItem');
    container.innerHTML = Mustache.render(menuTemplate, {
        name: item.name,
        description: item.description,
        price: item.price,
        available: avail,
    });

    parent.appendChild(container);


    let button = container.querySelector('.changeAvail');
    button.addEventListener('click', function(){
        let request = new XMLHttpRequest();
        request.open('POST', 'http://tiy-28202.herokuapp.com/menu/'+item.id);
        request.send(JSON.stringify({
            available: !item.available,
        }));
    });
};

// Function addItem()
// ------------------------------------------------------ 
//  - Retrieves data from /order endpoint

function getTables() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/order');
    request.addEventListener('load', function(){

        let response = JSON.parse(request.responseText);

            for(let i = 0; i < response.length; i++){
                 if(response[i].in_progress === true){
                        addTable(response[i]);
                 }
            };
        });

    request.send();
}

// Function addTable()
// ------------------------------------------------------ 
//  - Used in getTables() in 'load' event listener below
//  - For each object in /order, creates 'div' element in the 'orders' 
//    section and populates the mustache template with the applicable 
//    properties

function addTable(item) {

    let progress;

    if (item.in_progress === true){
        progress = "In Progress";
    };

    let ordersTemplate = document.querySelector('#orders-template').innerHTML;
    let parent = document.querySelector('.orders');
    let container = document.createElement('div');
    container.classList.add('table');
    container.innerHTML = Mustache.render(ordersTemplate, {
        tableName: item.table_id,
        in_progress: progress,
        items: item.items,
        });

    parent.appendChild(container);

    let button = container.querySelector('.complete');
    button.addEventListener('click', function(){
        let request = new XMLHttpRequest();
        request.open('POST', 'http://tiy-28202.herokuapp.com/order/'+item.table_id);
        request.send(JSON.stringify({
            in_progress: !item.in_progress,
            }));
        });
};

window.addEventListener('load', function() {
    getMenu();
    getTables();
});
