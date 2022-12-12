// CREATE ROUTER
const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtByID,
  createNewThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// set routes for api/thoughts to get data and create new thought
router.route('/').get(getAllThoughts).post(createNewThought);

//set routes for api/thoughts/:thoughtId to get data , update thoughts and delete thoughts
router.route('/:thoughtId').get(getThoughtByID).put(updateThought).delete(deleteThought);

//set routes for api/thoughts/:thoughtId/reactions to add reactions 
router.route('/:thoughtId/reactions').post(addReaction);

//set routes for api/thoughts/:thoughtId/reactions/:reactionId to remove reaction 
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

// *** JSON EXAAMPLE TO TEST POST ROUTE FOR THOUGHT IN INSOMNIA ***
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }

// *** JSON EXAAMPLE TO TEST POST ROUTE FOR REACTION IN INSOMNIA ***
// {
//     "reactions": "Here's a cool reaction...",
//     "username": "lernantino"
// }