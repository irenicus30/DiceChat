var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DiceSchema = new Schema ({
    name: {type: String, required: true},
    value: {type: Number, required: true},
    imagePath: {type: String, required: true},
    type: {type: String, required: true},
    order: {type: Number, required: true}
});

module.exports = mongoose.model("Dice", DiceSchema);