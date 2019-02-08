var express = require('express');
var router = express.Router();
var Dice = require('../models/dice');

/* PORT roll. */
router.post('/', function(req, res, next) {
    console.log(req.headers['content-type'])
    var diceToRoll = JSON.parse(req.body.diceToRoll);
    result = []  
    //query for all dices
    Dice.find()
        .sort("value")
        .exec(function(err, dices) {
            if(err) return;
            dices.forEach( (dice) => {
                for(diceRequest of diceToRoll) {
                    if(diceRequest.name==dice.name) {
                        console.log("rolling dice " + dice.name + " " + diceRequest.numberOfRolls + " times");
                        if(diceRequest.numberOfRolls==0)
                            continue;
                        let rolledValues = []
                        for(let i=0; i<diceRequest.numberOfRolls; i++) {
                            let rolledValue = Math.ceil(Math.random() * dice.value);
                            console.log(rolledValue)
                            rolledValues.push(rolledValue);
                        }
                        result.push({
                            name: dice.name,
                            rolledValues: rolledValues
                        });
                    }
                }
            });
            res.json(result);
        });
});

module.exports = router;
