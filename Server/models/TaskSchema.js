import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Corrected model definition
const Todo = mongoose.model('Todo', TodoSchema); // Only pass the schema here

export default Todo;
