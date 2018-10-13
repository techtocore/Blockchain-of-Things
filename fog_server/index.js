var express = require('express');
var bodyParser = require('body-parser');
var { addSensor1 } = require("./utility/addSensor1.js");
var { addToBlockChain } = require("./utility/addToBlockChain.js");
var { Sensor1 } = require('./models/sensor1');
var path = require("path");


var cors = require('cors');
var app = express();
app.use(cors());


app.get('/', function (req, res) {
    res.send("I'm listening");
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/sensor/:tagId', function (req, res) {
    var val = req.query.value;
    var obj = {};
    obj.device = "sensor" + req.params.tagId;
    obj.value = val;

    addSensor1(obj).then((ob) => {
        console.log(ob);
        addToBlockChain(ob).then((kk) => {
            res.status(200).send();
        }).catch((err) => {
            res.status(400).json({ err: err.message });
        });

    }).catch((err) => {
        res.status(400).json({ err: err.message });
    });
});


app.get('/sensordata/:tagId', function (req, res) {

    Sensor1.find().then((obj) => {
        var keys = [];
        for (let i = 0; i < obj.length; i++) {
            console.log(obj[i]);
            var st = "sensor" + req.params.tagId;
            if (obj[i].device === st) {
                var tmp = [];
                var time = [];
                time = obj[i].capture_time.split(":").map(Number);;
                tmp.push(time);
                tmp.push(obj[i].value);
                keys.push(tmp);
            }

        }
        var ret = { "keys": keys };
        res.json(ret);
    });
});


app.get("/visualize/sensor/1", function(req,res)
{
    res.sendFile(path.join(__dirname + "/../dashboard/sensor1.html"));
});

const PORT = 3000;
const HOST = '0.0.0.0';


var server = app.listen(3000, function(){
    console.log("running");
});
//console.log('Running on http://localhost:3000');