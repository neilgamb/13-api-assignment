function getMenu(){
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/menu');
    request.addEventListener('load', function(){

        let response = JSON.parse(request.responseText);

            for(let i = 0; i < response.length; i++){
                    console.log(response[i].available)
                    if (response[i].available === true){
                        addItem(response[i]);
                    }
            }
  
    });

    request.send();

}

function addItem(item){
    let parent = document.querySelector('.menu');
    parent.classList.add('menu');

    let menuItem = document.createElement('div');
    menuItem.classList.add('menuItem');

    let itemName = document.createElement('h2');
    itemName.classList.add('itemName');
    itemName.textContent = item.name;

    let description = document.createElement('p');
    description.classList.add('descr');
    description.textContent = item.description;

    let price = document.createElement('p');
    price.classList.add('price');
    price.textContent = item.price;

    let button = document.createElement('button');
    button.classList.add('orderButton');
    button.textContent = "Order";

    button.addEventListener('click', function(){

        let request = new XMLHttpRequest();
        request.open('POST', 'http://tiy-28202.herokuapp.com/order');

        request.addEventListener('load', function() {
        console.log('received response');
        console.log(item.id);
    })
        request.send(JSON.stringify({
        table_id: 1,
        menu_id: item.id,

    }));

    });

        parent.appendChild(menuItem);
        menuItem.appendChild(itemName);
        menuItem.appendChild(description);
        menuItem.appendChild(price);
        menuItem.appendChild(button);
}

window.addEventListener('load', function() {
    getMenu();

});
