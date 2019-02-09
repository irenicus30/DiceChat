var express = require('express');
var router = express.Router();
var Dice = require('../models/dice');

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = 'Dice Chat';
  var diceList = [];
  //query for all dices
  Dice.find()
    .sort("order")
    .exec(function(err, dices) {
      for(dice of dices) {
        diceList.push(dice);
      }
      res.render('index', { title: title, diceList: diceList });
    });
});

module.exports = router;
