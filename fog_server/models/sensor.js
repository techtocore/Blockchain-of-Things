var mongoose = require('mongoose');

var SensorSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
      trim: true
    },
    parameter: {
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



var Sensor = mongoose.model('Sensor', SensorSchema);


module.exports = { Sensor };
