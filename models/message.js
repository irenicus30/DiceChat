var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
    username: {type: String, required: false},
    text: {type: String, required: true},
    date: {type: Date, required: true}
});

MessageSchema.virtual('full_message').get(function() {
    var s = "";
    if(this.username) {
        s += this.username;
    } else {
        s += 'anonymous';
    }
    s += ': ' + this.text;
    s = moment(this.date).format('lll') + ' '+ s;
    return s;
});

module.exports = mongoose.model("Message", MessageSchema);