var { ObjectID } = require('mongodb');
var { mongoose } = require("./../db/mongoose.js");
var { Limits } = require("./../models/limits");
var moment = require('moment');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

var setLimits = async (obj) => {

  var date = moment();
  var dat = date.format('MMM Do, YYYY');
  var time = date.format('HH:mm:ss');
  var json = {
    "value": obj.value,
    "parameter": obj.parameter,
    "capture_date": dat,
    "capture_time": time
  }
  var flag = 0;
  //var ret = await Limits.findOneAndUpdate({}, { $set: newVal });
  var ret = await Limits.find({}).then(async (ob) => {

    for (var i = 0; i < ob.length; i++) {
      if (ob[i].parameter === obj.parameter) {
        let parameter = ob[i].parameter;
        var ret1 = await Limits.updateOne({ "parameter": parameter },
          { $set: json }
        );
        flag = 1;
        break;

      }
    }

  });
  if (flag === 0) {
    var newVal = new Limits(json);
    var ret1 = await newVal.save();
  }


  return ret;
}


module.exports = { setLimits };
