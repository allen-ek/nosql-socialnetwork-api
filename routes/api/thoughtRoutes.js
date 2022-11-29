const router = require('express').Router();
//import routes from thought controller
const {
  createThought,
  getThoughts,
  getThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

//routes for thoughts
router
.route('/')
.get(getThoughts);

router
.route('/:userId')
.post(createThought);

router
.route('/:thoughtId')
.get(getThought)
.put(updateThought);

router
.route('/:thoughtId/users/:userId')
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

//export router
module.exports = router;