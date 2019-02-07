var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
var murl = 'mongodb://localhost:27017/thingqbator';

mongoose.connect(murl,{ useNewUrlParser: true });

module.exports = {
  mongoose: mongoose
};
