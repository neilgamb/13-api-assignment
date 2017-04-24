// EXPORT SHARED REGEX MODULES 

module.exports = {
    ccCheck: checkCreditCard,
    alphaCheck: checkAlpha,
    emailCheck: checkEmail,
};


function checkCreditCard(ccNumber){
    let check = new RegExp("(([0-9]{4}[- ]{0,1}){3})[0-9]{4}");

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

