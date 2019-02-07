const axios = require("axios");

var url = "http://localhost:3001/mineBlock";

var addToBlockChain = async (obj) => {

    //const config = { headers: { 'Content-Type': 'application/json' } };
    //console.log("log = " + obj);
    //var ret3 = await axios.post(url, {"data": obj}, config);

    return true;
};


module.exports = { addToBlockChain };
