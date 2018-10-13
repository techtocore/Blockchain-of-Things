var { ObjectID } = require('mongodb');
var { mongoose } = require("./../db/mongoose.js");
var { Sensor1 } = require("./../models/sensor1");
var moment = require('moment');



var addSensor1 = async (obj) => {

  var date = moment();
  var dat = date.format('MMM Do, YYYY');
  var time = date.format('HH:mm:ss');
  var newVal = new Sensor1({
    value: obj.value,
    device: obj.device,
    capture_date: dat,
    capture_time: time
  });
  var ret3 = await newVal.save();

  return obj;
};


module.exports = { addSensor1 };
