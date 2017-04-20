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



