import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import dotnenv from 'dotenv'
import Todo from './models/TaskSchema.js'

dotnenv.config()

const PORT = process.env.PORT || 5000;


const app = express();

app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { name } = req.body;
    const newTask = new Todo({ name });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params
    const task = await Todo.findByIdAndDelete(id)
    return res.status(201)
  } catch (error) {
   return res.status(500)
  }
})


app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}/`));
