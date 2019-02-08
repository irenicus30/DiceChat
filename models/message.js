var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
    username: {type: String, required: false},
    text: {type: String, required: true},
    date: {type: Date, required: true}
});

MessageSchema.virtual('full_message').get(function() {
    var s = '[' + moment(this.date).format('MMM Do YY, h:mm:ss a') + ', ';
    if(this.username) {
        s += this.username;
    } else {
        s += 'anonymous';
    }
    s += ']<br>' + this.text;
    return s;
});

module.exports = mongoose.model("Message", MessageSchema);