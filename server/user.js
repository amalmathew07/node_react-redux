var mongoose = require('mongoose');

var User = mongoose.model('Celebrities',{
    celebName : {type:String},
    celebStage: {type:String}
});

module.exports = {
    User
}