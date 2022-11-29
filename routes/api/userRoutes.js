const router = require('express').Router();
//import routes from user controller
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController.js');
//routes for users
router
.route('/')
.get(getUsers)
.post(createUser);

router
.route('/:userId')
.get(getUser)
.put(updateUser)
.delete(deleteUser);


router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

//export router 
module.exports = router;