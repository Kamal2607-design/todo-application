import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from './update-todo.module.css';

interface Todo {
  id: number;
  name: string;
  description: string;
  status: string;
}

const UpdateTodo = () => {
  const router = useRouter(); 
  const { id } = router.query; // Getting the id from the URL
  const [todo, setTodo] = useState<Todo | null>(null); 
  const [status, setStatus] = useState<string>('');

  // Fetch the specific todo by ID
  useEffect(() => {
    if (id) {
      const fetchTodo = async () => {
        const response = await fetch(`http://localhost:3001/todos/${id}`);
        const data = await response.json();
        setTodo(data);
        setStatus(data.status); // Set the initial status
      };
      fetchTodo();
    }
  }, [id]);

  // Function to handle the update
  const updateStatus = async () => {
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      alert('Status updated successfully');
      router.push('/list-todos'); // Redirect to the list page after update
    } else {
      alert('Failed to update status');
    }
  };

  // Check if the todo data is available
  if (!todo) return <p>Loading...</p>;

  return (
    <div className={styles.containerCenter}>
      <div className={styles.formContainer}>
        <h1>Update To-Do</h1>
        <p>Task: {todo.name || 'N/A'}</p>
        <p>Description: {todo.description || 'N/A'}</p>
        <p>Current Status: {todo.status || 'N/A'}</p>
        <select
          className={styles.selectField}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className={styles.updateButton} onClick={updateStatus}>
          Update Status
        </button>
      </div>
    </div>
  );
};

export default UpdateTodo;
