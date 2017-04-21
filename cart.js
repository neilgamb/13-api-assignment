// Function getBill()
// ------------------------------------------------------ 
//   - Retrieves data from /bill?table_id=<table_id> endpoint

function getBill() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/bill?table_id=neilson');
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

function getTotal() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/bill?table_id=neilson');
    request.addEventListener('load', function(){

        let response = JSON.parse(request.responseText);
        let total = 0;

            for(let i = 0; i < response.items.length; i++){
                        total = total + response.items[i].price;
            };
            
        addTotal(total);

        });

    request.send();
}

function getTables() {
    let request = new XMLHttpRequest();
        request.open('GET', 'http://tiy-28202.herokuapp.com/order');
        request.addEventListener('load', function(){

            let response = JSON.parse(request.responseText);
            console.log(response);

                let selection = document.querySelector('.tableID');
                selection.addEventListener('change', function(){

                    let showPayment = document.querySelector('.payment');
                    showPayment.style.display = "block";

                    getTotal();
                    getBill();

                });

                for(let i = 0; i < response.length; i++){
                            addTable(response[i].table_id);
                };
                
            });

        request.send();


}

function addTable(table_id){
    let dropdown = document.querySelector('#dropdown-template').innerHTML;
    let parent = document.querySelector('.tableID');
    let container = document.createElement('option');
    container.innerHTML = Mustache.render(dropdown, {
        tableName: table_id,
        });

    parent.appendChild(container); 

}


window.addEventListener('load', function() {
    getTables();
    // getTotal();
    // getBill();
});