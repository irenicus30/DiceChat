var Dice = require('../models/dice');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db opened');
});
mongoose.connect('mongodb://localhost/dicechat');

Dice.collection.drop();

var dices = [
    new Dice({
        name: "k4",
        value: 4,
        imagePath: "images/k4.png",
        func: () => Math.ceil(Math.random()*2)
    }),
    new Dice({
        name: "k6",
        value: 6,
        imagePath: "images/k6.png",
        func: () => Math.ceil(Math.random()*6)
    }),
    new Dice({
        name: "k8",
        value: 8,
        imagePath: "images/k8.png",
        func: () => Math.ceil(Math.random()*8)
    }),
    new Dice({
        name: "k10",
        value: 10,
        imagePath: "images/k10.png",
        func: () => Math.ceil(Math.random()*10)
    }),
    new Dice({
        name: "k12",
        value: 12,
        imagePath: "images/k12.png",
        func: () => Math.ceil(Math.random()*12)
    }),
    new Dice({
        name: "k20",
        value: 20,
        imagePath: "images/k20.png",
        func: () => Math.ceil(Math.random()*20)
    }),

]

var dicesPromise = dices.map(dice => dice.save());
Promise.all(dicesPromise)
    .then( dice => console.log("saving successfully"))
    .catch( err => console.log("saving error " + JSON.stringify(err)));
