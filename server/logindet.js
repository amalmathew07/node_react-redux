var mongoose = require('mongoose');

var LoginDet = mongoose.model('LoginDetails',{
    userName : {type:String},
    password: {type:String}
});

module.exports = {
    LoginDet
}