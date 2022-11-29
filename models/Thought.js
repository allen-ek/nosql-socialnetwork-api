const { Schema, model,Types } = require('mongoose');
const moment = require('moment');
// Schema to create reaction 
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
      trim: true
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => moment(date).format('MMM DD, YYYY')
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
)
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
      },
      createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        get: (date) => moment(date).format('MMM DD, YYYY')
      },
      username: {
        type: String,
        required: true,
        ref: 'user',
      },
      
      reactions: [reactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

  
  thoughtSchema.virtual("reactionCount")
  .get(function() {
    return this.reactions.length;
  });
  
  const Thought = model('Thought', thoughtSchema);
  
  module.exports = Thought;