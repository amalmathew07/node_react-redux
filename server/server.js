var mongoose = require('./mongooseplug');
var User = require('./user').User;
var LoginDet = require('./logindet').LoginDet;
var express = require('express');
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();

//middlewares for the express app
app.use(bodyparser.json());
app.use(['/listceleb','/deleteceleb/:id','/getceleb/:id',], verifyToken);

// post route for adding celebrity details
app.post('/addceleb',(req,res) => {
    var newCeleb = new User({id: req.body.id, celebName: req.body.celebName, celebStage: req.body.celebStage});

    newCeleb.save().then((doc)=> {
    res.json(`Celebrity Hologram Added for ${req.body.celebName}`).status(200);
    }).catch((err)=> {

    });
})

// post route for logging in
app.post('/login',(req,res) => {
    var user = new LoginDet({userName: req.body.userName, password: req.body.password});

    LoginDet.findOne({userName: user.userName}).then((doc)=> {
    if (doc.password === user.password) {
        jwt.sign(user.userName,'salt',(err,token) => {
            res.json({message:"Login Successful", token: token}).status(200);
        })    
    } else {
    res.json("Login Failed").status(200); 
    }
    }).catch((err)=> {
        res.json("No User Found").status(404);
    });
})

// get route for listing celebrity details
app.get('/listceleb',(req,res) => {
    jwt.verify(req.token,'salt',(err,data) => {
        if (err) {
            res.status(401).json("Not Authorized");
        } else {
            User.find().then((docs) => {
                res.send(docs);
            }).catch((err) => {
                res.status(400).send(err);
            }); 
        }
    });
});

// delete route for deleting celebrity details
app.delete('/deleteceleb/:id',(req,res) => {
    jwt.verify(req.token,'salt',(err,data) => {
        if (err) {
            res.status(401).json("Not Authorized");
        } else {
            User.findByIdAndRemove({_id: req.params.id}).then((docs) => {
                if (docs !== null) {
                res.json("Deleted successfully");
                } else {
                    res.json("Not found");
                }
            }).catch((err) => {
                res.json("Not found");
            });
        }
    });
});

// get route for getting celebrity details
app.get('/getceleb/:id',(req,res) => {

    jwt.verify(req.token,'salt',(err,data) => {
        if (err) {
            res.status(401).json("Not Authorized");
        } else {
            User.findById(req.params.id).then((docs) => {
                if (docs !== null) {
                res.send(docs);
                } else {
                    res.json("Not found");
                }
            }).catch((err) => {
                res.json("Not found");
            });
        }
    });
});


app.listen(5000,() => {
    console.log("Listening on 5000");
});

//Middleware function to extract jwt token
function verifyToken(req,res,next) {
    req.token = req.headers['token'];
    next();
}

module.exports = {
    app
}


