var { ObjectID } = require('mongodb');
var { mongoose } = require("./../db/mongoose.js");
var { Sensor } = require("./../models/sensor");
var moment = require('moment');



var addSensor = async (obj) => {

  var date = moment();
  var dat = date.format('MMM Do, YYYY');
  var time = date.format('HH:mm:ss');
  var newVal = new Sensor({
    value: obj.value,
    parameter: obj.parameter,
    capture_date: dat,
    capture_time: time
  });
  var ret = await newVal.save();

  return ret;
};


module.exports = { addSensor };
