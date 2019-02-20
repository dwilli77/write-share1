const db = require("../models")

module.exports = {

  create: function(req, res) {
    db.Pod
      .create({
        topic: req.body.topic,
        name: req.body.name,
        creator: req.body.creator,
        creatorId: req.body.creatorId,
        numParticipants: req.body.numParticipants,
        activeParticipant: req.body.activeParticipant,
        totalParticipants: req.body.totalParticipants,
        participantIds: req.body.participantIds
      })
      .then(result => {
        return db.User.findOneAndUpdate({_id: req.body.userId}, {$push: {userPods: result._id}}, {new: true})
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err))
  },
  getMyPods: function(req, res) {
    db.Pod
      .find({ participantIds: req.body.userId})
      .then(result => res.json(result))
      .catch(err=> res.status(422).json(err))
  },
  getOnePod: function(req, res) {
    db.Pod
      .findById({_id: req.body.podId}).populate('content')
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  nextUser: function(req, res) {
    db.Pod
      .findOneAndUpdate({_id: req.body.podId}, {$set: {activeParticipant: req.body.newActive}}, {new:true})
      .then(result => res.send(result.activeParticipant))
      .catch(err => res.status(422).json(err));
  },
  read: function(req,res) {
    db.Pod
    .find({}).then(result => res.json(result))
    .catch(err => res.status(422).json(err))
  },
  joinPod: function(req, res) {
    db.Pod
    .findOneAndUpdate({_id: req.body.podId}, {$push: {totalParticipants: req.body.username, participantIds: req.body.userId}}, {new:true})
    .then(result => {
      return db.User.findOneAndUpdate({_id: req.body.userId}, {$push: {userPods: req.body.podId}}, {new: true})
    })
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err))
  },
  yourTurn: function(req, res) {
    db.Pod
    .find({participantIds: req.body.id, activeParticipant: req.body.username}).populate('content')
    .then(result=> res.json(result))
    .catch(err=> res.status(422).json(err));
  }
};
