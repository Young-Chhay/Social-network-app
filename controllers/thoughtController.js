const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts in the Database 
  getAllThoughts(req, res) {
    Thought.find()
      .then((allThoughtData) => {
        res.json(allThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get single thought by _id
  getThoughtByID(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((ThoughtByID) => {
        if (!ThoughtByID) {
          return res.status(404).json({ message: 'No thought existed with this id!' });
        }
        res.json(ThoughtByID);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new thought for specific user ID. 
  createNewThought(req, res) {
    Thought.create(req.body)
      .then((newThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { userthoughts: newThoughtData._id } },
          { new: true }
        );
      })
      .then((newThoughtUserData) => {
        if (!newThoughtUserData) {
          return res.status(404).json({ message: 'New Thought created succesfully, but fail to find user with this id' });
        }

        res.json({ message: 'New Thought successfully created for this user.' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update thought by ID. 
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      { $set: req.body }, 
      { runValidators: true, new: true }
    )
      .then((AllThoughtsData) => {
        if (!AllThoughtsData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(AllThoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete thought by ID 
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((ThoughtsData) => {
        if (!ThoughtsData) {
            res.status(404).json({ message: 'No thought found for this id' });
            return;
        }
        res.json(ThoughtsData);
      })
      .catch(err => res.status(400).json(err));
},
  //       // remove thought id from user's `thoughts` field
  //       return User.findOneAndUpdate(
  //         { thoughts: req.params.thoughtId },
  //         { $pull: { thoughts: req.params.thoughtId } },
  //         { new: true }
  //       );
  //     })
  //     .then((dbUserData) => {
  //       if (!dbUserData) {
  //         return res.status(404).json({ message: 'Thought created but no user with this id!' });
  //       }
  //       res.json({ message: 'Thought successfully deleted!' });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },

  // add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true , runValidators: true, }
    )
      .then((ThoughtsData) => {
        if (!ThoughtsData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(ThoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // remove reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((ThoughtsData) => {
        if (!ThoughtsData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(ThoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
