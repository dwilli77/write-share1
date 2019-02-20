const db = require("../models");

module.exports = {
    
   create: function(req, res) {
       db.Content.create({
           contentText: req.body.contentText,
           contentCreator: req.body.contentCreator
       })
       .then(result => db.Pod.findOneAndUpdate({_id: req.body.podId}, { $push: {content: result._id}}, {new: true}))
       .then(dbPod => res.json(dbPod))
       .catch(err=> res.status(422).json(err));
   }
  }
  