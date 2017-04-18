function getMenu(){
    let request = new XMLHttpRequest();
    request.open('GET', 'http://tiy-28202.herokuapp.com/menu');
    request.addEventListener('load', function(){

        let response = JSON.parse(request.responseText);

            for(let i = 0; i < response.length; i++){
                    console.log(response[i].available)
                    if (response[i].available === true){
                        addItem(response[i]);
                    };
            };
  
    });

    request.send();

}

function addItem(item){
    let template = document.querySelector('#menu-template').innerHTML;

    let parent = document.querySelector('.menu');
    let container = document.createElement('div');
    container.classList.add('menuItem');
    container.innerHTML = Mustache.render(template, {
        name: item.name,
        description: item.description,
        price: item.price,
    });

    parent.appendChild(container);
}


window.addEventListener('load', function() {
    getMenu();

});
