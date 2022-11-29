const { Thought } = require('../models');
const User = require('../models/User');

module.exports = {
  //get all users
  getUsers(req, res) {
    User
    .find({})
      .then(usersData => res.json(usersData))
      .catch(err => res.status(500).json(err));
  },
  
  //get user by id
  getUser(req, res) {
    User
    .findOne({ _id: req.params.userId })
    .populate("thoughts")
    .populate("friends")
    .select("-__v")
      .then(userData => {
        if(!userData) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },
  
  // create a new user with username and valid email
  createUser(req, res) {
    User
    .create(req.body)
      .then((userData) => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  
  //update user by id
  
  updateUser({ params, body }, res)  {
    User
    .findOneAndUpdate(
        { _id: params.userId }, 
        body, 
        { runValidators: true })
    .then((dbUserData) => {
      if(!dbUserData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json (dbUserData);
    })
    .catch(err => res.status(500).json(err));  
  },

  //delete user by id
  deleteUser({ params }, res) {
    User
    .findOneAndDelete({ _id: params.userId })
    .then(userData => {
      if(!userData) {
        res.status(404).json ({ message: "User not found" });
        return;
      }
      User.updateMany({ _id: { $in: userData.friends }},
        { $pull: { friends: params.id } }
    )
    .then(() => {
      Thought.deleteMany({ username: userData.username }) 
    .then(() => {
      res.json({ message: "Deleted user,thier friends and thier thoughts" });
    })
    .catch(err => res.status(500).json(err));
    }) 
    .catch(err => res.status(500).json(err));    
    })
    .catch(err => res.status(500).json(err));
  },

  
  //add friend by Id
  addFriend(req, res) {

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId }},
      { new: true, runValidators: true }
    ) 
    .then(userData => {
      if(!userData) {
        res.status(404).json({ message: "User not found" })
        return;
      }
      res.json(userData);
    })
    .catch(err => res.status(500).json(err));
  },

  //delete friend by id
  deleteFriend({ params}, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId }},
      { new: true, runValidators: true }
      )
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(dbUserData);
    })
      .catch(err => res.status(500).json(err))
    },
};