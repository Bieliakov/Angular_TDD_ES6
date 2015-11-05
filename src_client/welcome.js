'use strict';

module.exports = function(message){

    if (NODE_ENV == 'development'){
        console.log(message);
    }
    console.log(USER);
    alert(`Welcome ${message}`);
};

