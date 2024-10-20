import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './list-todos.module.css';

interface Todo {
  id: number;
  name: string;
  description: string;
  time: string;
  status: string;
}

const ListToDos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:3001/todos');
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  // Delete todo function
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted to-do from state
        setTodos(todos.filter((todo) => todo.id !== id));
        alert('To-do deleted successfully');
      } else {
        alert('Error deleting to-do');
      }
    } catch (error) {
      console.error('Error deleting to-do:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const filteredTodos = todos.filter(
    (todo) => statusFilter === 'all' || todo.status === statusFilter
  );

  return (
    <div className={styles.containerCenter}>
      <div className={styles.listContainer}>
        <h1>List of To-Dos</h1>
        <select
          className={styles.selectField}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <ul className={styles.todoList}>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              <h3 className={styles.todoTitle}>{todo.name}</h3>
              <p className={styles.todoDescription}>{todo.description}</p>
              <p>{todo.time}</p>
              <p>{todo.status}</p>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.updateButton}
                  onClick={() => router.push(`/update-todo/${todo.id}`)}
                >
                  Update Status
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListToDos;
