var mongoose = require('mongoose');

var Sensor1Schema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
      trim: true
    },
    device: {
      type: String,
      required: true,
      trim: true
    },
    capture_date: {
      type: String,
      default: null
    },

    capture_time: {
      type: String,
      default: null
    }
  }
);



var Sensor1 = mongoose.model('Sensor1', Sensor1Schema);


module.exports = { Sensor1 };
