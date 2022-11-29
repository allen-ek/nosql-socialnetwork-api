const { User, Thought } = require('../models');

//export methods for the thoughts
module.exports = {
  //get all the thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },

  //get thought by id
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((data) =>
        !data
          ? res.status(404).json({ message: "Thought not found" })
          : res.json(data)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // create thought
 
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(data => {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: data._id }},
          { new: true }
        )
      .then(data => {
        if(!data) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
  },

  //update thought by id
 
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      body,
      { new: true }
    )
    .then(data => {
      if(!data) {
        res.status(404).json({ message: "Thought not found" });
        return;
      }
      res.json(data);
    })
    .catch(err => res.status(500).json(err));
  },
  
  //delete a thought by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(data => {
      if(!data) {
        res.status(404).json({ message: "Thought not found"});
        return;
      }
      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId }},
        )
      .then(() => {
          res.status(200).json({ message: `Deleted the thought` });
      })
      .catch(err => res.status(500).json(err));
    })  
    .catch(err => res.status(500).json(err));
  },

  //add  reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions:  body }},
      { new: true, runValidators: true }
      )
      .then(data => {
        if(!data) {
          res.status(404).json({ message: "Thought not found" });
          return;
        }
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  },

  //delete a reaction
  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId }}},
      { new: true, runValidators: true }
    )
    .then(data => {
      if(!data) {
        res.status(404).json({ message: "Thought not found" });
        return;
      }
      res.json({ message: "Deleted reaction" });
    })
    .catch(err => res.status(500).json(err));
  },
};