// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import app from './firebase'; // Import Firebase app
import { getDatabase, ref, onValue, push, update, remove } from 'firebase/database'; // Import Firebase database methods

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState('');

  const firebaseDatabase = getDatabase(app); // Get Firebase Realtime Database reference

  // Fetch tasks from Firebase
  useEffect(() => {
    const tasksRef = ref(firebaseDatabase, 'tasks');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const taskList = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].name,
          completed: data[key].completed,
        }));
        setTasks(taskList);
      } else {
        setTasks([]);
      }
    });
  }, [firebaseDatabase]);

  function addTask() {
    if (inputTask.trim() !== '') {
      push(ref(firebaseDatabase, 'tasks'), { name: inputTask, completed: false });
      setInputTask('');
    } else {
      alert('Task should not be empty');
    }
  }

  function checkbox(id) {
    const task = tasks.find((task) => task.id === id);
    update(ref(firebaseDatabase, `tasks/${id}`), { completed: !task.completed });
  }

  function deleteTask(id) {
    remove(ref(firebaseDatabase, `tasks/${id}`));
  }

  function updateTask(index) {
    const updatedTaskName = prompt('Enter the updated task:', tasks[index].name);

    if (updatedTaskName !== null) {
      update(ref(firebaseDatabase, `tasks/${tasks[index].id}`), { name: updatedTaskName });
    }
  }

  return (
    <>
      <div className="heading">
        <h1>TODO-LIST</h1>
      </div>

      <div className='container'>
        <div className='input'>
          <input
            className='task-input'
            value={inputTask}
            placeholder='Add New Task'
            type='text'
            onChange={(event) => setInputTask(event.target.value)}
          />
          <button id="add-btn" onClick={() => addTask()}><strong>Add</strong></button>
        </div>
      </div>

      <div className='task-list'>
        {tasks.map((task, index) => (
          <div className='task' key={task.id}>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => checkbox(task.id)}
            />
            <span className={task.completed ? 'completed' : 'incomplete'}>{task.name}</span>
            <button  className= {task.completed ? 'edit-btn-hide': 'edit-btn'} onClick={() => updateTask(index)}>Edit</button>
            <button  className= {task.completed ? 'delete-btn-hide': 'delete-btn'} onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
