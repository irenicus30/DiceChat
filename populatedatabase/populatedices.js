var Dice = require('../models/dice');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db opened');
});
var mongoDB = 'mongodb://irenicus30:irenicus30@ds127545.mlab.com:27545/dicechat' ||  process.env.MONGODB_URI;
mongoose.connect(mongoDB);

Dice.collection.drop();

var dices = [
    new Dice({
        name: "k4",
        value: 4,
        imagePath: "images/k4.png",
        type: "classic",
        order: 1
    }),
    new Dice({
        name: "k6",
        value: 6,
        imagePath: "images/k6.png",
        type: "classic",
        order: 2
    }),
    new Dice({
        name: "k8",
        value: 8,
        imagePath: "images/k8.png",
        type: "classic",
        order: 3
    }),
    new Dice({
        name: "k10",
        value: 10,
        imagePath: "images/k10.png",
        type: "classic",
        order: 4
    }),
    new Dice({
        name: "k12",
        value: 12,
        imagePath: "images/k12.png",
        type: "classic",
        order: 5
    }),
    new Dice({
        name: "k20",
        value: 20,
        imagePath: "images/k20.png",
        type: "classic",
        order: 6
    }),
    new Dice({
        name: "blue",
        value: 6,
        imagePath: "images/blue.png",
        type: "descent",
        order: 7
    }),
    new Dice({
        name: "red",
        value: 6,
        imagePath: "images/red.png",
        type: "descent",
        order: 8
    }),
    new Dice({
        name: "yellow",
        value: 6,
        imagePath: "images/yellow.png",
        type: "descent",
        order: 9
    }),
    new Dice({
        name: "green",
        value: 6,
        imagePath: "images/green.png",
        type: "descent",
        order: 10
    }),
    new Dice({
        name: "brown",
        value: 6,
        imagePath: "images/brown.png",
        type: "descent",
        order: 11
    }),
    new Dice({
        name: "grey",
        value: 6,
        imagePath: "images/grey.png",
        type: "descent",
        order: 12
    }),
    new Dice({
        name: "black",
        value: 6,
        imagePath: "images/black.png",
        type: "descent",
        order: 13
    }),

]

var dicesPromise = dices.map(dice => dice.save());
Promise.all(dicesPromise)
    .then( dice => console.log("saving successfully"))
    .catch( err => console.log("saving error " + JSON.stringify(err)));
