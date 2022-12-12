const router = require('express').Router();
const {
  getAllUsers,
  getUserByID,
  createNewUser,
  updateUserByID,
  deleteUserByID,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// set routes for /api/users to get data or create new user. 
router.route('/').get(getAllUsers).post(createNewUser);

// set routes for /api/users/:userId to get data / update  and delete
router.route('/:userId').get(getUserByID).put(updateUserByID).delete(deleteUserByID);

// set routes for /api/users/:userId/friends/:friendId 
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;

// *** JSON EXAAMPLE TO TEST POST ROUTE FOR user IN INSOMNIA ***
// {
//     "username": "lernantino",
//     "email": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }

// *** JSON EXAAMPLE TO TEST POST ROUTE FOR THOUGHT IN INSOMNIA ***
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }


// *** JSON EXAAMPLE TO TEST POST ROUTE FOR REACTION IN INSOMNIA ***
// {
//     "reactionBody": "Here's a cool reaction...",
//     "username": "lernantino"
// }