var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DiceSchema = new Schema ({
    name: {type: String, required: true},
    value: {type: Number, required: false},
    imagePath: {type: String, required: false}
});

module.exports = mongoose.model("Dice", DiceSchema);