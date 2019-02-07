var express = require('express');
var bodyParser = require('body-parser');
var { addToBlockChain } = require("./utility/addToBlockChain.js");
var { addSensor } = require("./utility/addSensor.js");
var { setLimits } = require("./utility/setLimits.js");
var { Sensor } = require('./models/sensor');
var { Limits } = require('./models/limits');
var path = require("path");
var moment = require('moment');



var cors = require('cors');
var app = express();
app.use(cors());


app.get('/', function (req, res) {
    res.send("I'm listening");
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/sensorValues', function (req, res) {
    var data = req.body.data;
    var obj = {};

    data.forEach(element => {
        var tmp = {};
        tmp.parameter = element.parameter;
        tmp.value = element.value;
        addSensor(tmp).then((ob) => {
            console.log(ob);
            addToBlockChain(ob).then((kk) => {
                console.log("\nAdded\n");
                //res.status(200).send();
            }).catch((err) => {
                res.status(400).json({ err: err.message });
            });

        }).catch((err) => {
            res.status(400).json({ err: err.message });
        });
    });

    res.status(200).send();

});


app.post('/setLimits', function (req, res) {
    var data = req.body;
    console.log(data);
    setLimits(data).then((ob) => {
        console.log(ob);
        res.status(200).send();

    }).catch((err) => {
        res.status(400).json({ err: err.message });
    });

});



app.get('/sensordata/:parameter', function (req, res) {

    Sensor.find().then((obj) => {
        var keys = [];
        for (let i = 0; i < obj.length; i++) {
            //console.log(obj[i]);
            var st = req.params.parameter;
            if (obj[i].parameter === st) {
                var tmp = {};
                var time = [];
                time = obj[i].capture_time.split(":").map(Number);;
                var sec = time[0]*3600 + time[1]*60 + time[2];
                tmp.time = sec;
                tmp.value = obj[i].value;
                keys.push(tmp);
            }

        }
        var ret = { "keys": keys };
        res.json(ret);
    });
});


const PORT = 3000;
const HOST = '0.0.0.0';


app.listen(3000, () => {
    console.log(`Server Up and Running on 3000`);
});
