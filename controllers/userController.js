const { User, Thought } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find()
      .select('-__v')
      .then((AllUserData) => {
        res.json(AllUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get single user by id
  getUserByID(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('userfriends')
      .populate('userthoughts')
      .then((UserData) => {
        if (!UserData) {
          return res.status(404).json({ message: 'No user found under this ID' });
        }
        res.json(UserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new user 
  createNewUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // update a user by ID
  updateUserByID(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body,},
      { new: true, runValidators: true,}
    )
      .then((newUserData) => {
        if (!newUserData) {
          return res.status(404).json({ message: 'No user found under this ID' });
        }
        res.json(newUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete user by ID
  deleteUserByID(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found under this ID' });
          return;
        }
        res.json(User);
      })
      .catch(err => res.status(500).json(err));
},

  // add friend to userfriend data
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, 
      { $addToSet: { userfriends: req.params.friendId } }, 
      { new: true })
        .then((UserData) => {
          if (!UserData) {
            return res.status(404).json({ message: 'No user found under this ID' });
          }
          res.json(UserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
  },
  // remove friend from userfriend list
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, 
      { $pull: { userfriends: req.params.friendId } }, 
      { new: true })
      .then((UserData) => {
        if (!UserData) {
          return res.status(404).json({ message: 'No user found under this ID' });
        }
        res.json(UserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
