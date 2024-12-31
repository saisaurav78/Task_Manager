import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/tasks');
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) {
      alert('Task name cannot be empty!');
      return;
    }
    try {
      const newTask = { name: taskName };
      await axios.post('http://localhost:5000/api/tasks', newTask);
      setTaskName('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Delete a task
const deleteTask = async (id) => {
  try {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    alert('Task deleted');
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};


  useEffect(() => {
    fetchTasks();
  }, [])

  return (
    <div>
      <form onSubmit={addTask}>
      <h1>Task Manager</h1>
        <input
          placeholder='Task Name'
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type='submit'>Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span>{task.name}</span>
            <button style={{backgroundColor:"red"}} onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
