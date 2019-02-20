const db = require("../models");
var CryptoJS = require("crypto-js")
var SHA256 = require("crypto-js/sha256")

module.exports = {
    
    login: function(req, res) {
        db.User
            .findOne({email: req.body.email})
            .then(result => {
                if(!result){
                  res.send('no user');
                }
                //then checks the password to make sure it matches what's in the db
                let hashedPassword = CryptoJS.SHA256(req.body.password).toString();
                if(hashedPassword !== result.password){
                  res.send('incorrect password');
                }
                //if all's good - then returns the data for that user
                res.json(result);
              })
              .catch(err=> console.log(err))
    },
    register: function(req, res) {
        db.User
            .findOne({email: req.body.email})
            .then(result=>{
                if(!result){
                  //encrypt the password before storing it in the db
                  req.body.password = CryptoJS.SHA256(req.body.password).toString();
                  db.User.create(req.body).then(data=> {
                    res.json(data)
                  }).catch(err=> {
                    console.log(err);
                    res.status(404).end()
                  });
                }else(
                  res.send("user already exists")
                );
              })
              .catch(err=>console.log(err))
    }
   
  };
  