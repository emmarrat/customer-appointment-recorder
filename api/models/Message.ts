import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  username: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  createdAt: {
    required: true,
    type: Date,
  },
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;
