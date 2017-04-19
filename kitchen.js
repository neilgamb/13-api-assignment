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

function addItem(item){

let avail;
 
    if(item.available === true){
        avail = "Available" 
    } else {
        avail = "SOLD OUT"
    }

    let menuTemplate = document.querySelector('#menu-template').innerHTML;

    let parent = document.querySelector('.menu');
    let container = document.createElement('div');
    container.classList.add('menuItem');
    container.innerHTML = Mustache.render(menuTemplate, {
        name: item.name,
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

function getTables() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/order');
    request.addEventListener('load', function(){

        let response = JSON.parse(request.responseText);

            for(let i = 0; i < response.length; i++){
                        addTable(response[i]);

            };
    });

    request.send();
}


function addTable(item) {

    let ordersTemplate = document.querySelector('#orders-template').innerHTML;
    let parent = document.querySelector('.orders');
    let container = document.createElement('div');
    container.classList.add('table');
    container.innerHTML = Mustache.render(ordersTemplate, {
        tableName: item.table_id,
        in_progress: item.in_progress,
        items: item.items,
});

    parent.appendChild(container);

    let button = container.querySelector('.complete');
    button.addEventListener('click', function(){
        let request = new XMLHttpRequest();
        request.open('POST', 'http://tiy-28202.herokuapp.com/order/'+item.items.id);
        request.send(JSON.stringify({
            in_progress: !item.items.in_progress,
        }));

    });

};


window.addEventListener('load', function() {
    getMenu();
    getTables();
});
