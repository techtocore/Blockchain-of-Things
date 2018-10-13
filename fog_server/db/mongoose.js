var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
var murl = 'mongodb://localhost:27017/IntelHack';

mongoose.connect(murl,{ useNewUrlParser: true });

module.exports = {
  mongoose: mongoose
};
