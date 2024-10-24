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
  const[currentPage,setCurrentPage] = useState<number>(1);
  const [totalPages,setTotalPages] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://localhost:3001/todos?page=${currentPage}&limit=5`);
        const data = await response.json();
        console.log(data);  
        setTodos(data.data);
        setTotalPages(data.lastPage);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    fetchTodos();
  }, [currentPage]);

    const goToNextPage = () => {
      if (currentPage < totalPages) {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage); 
        
      }
    };

    const goToPreviousPage = () => {
      if (currentPage > 1) {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage); 
      }
    };


  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        
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

 
  if (!todos || todos.length === 0) {
    return <p>Loading To-Dos...</p>;
  }

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
      {todos.map((todo) => (
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

    {/* Pagination Controls */}
    <div className={styles.paginationContainer}>
      <button
        className={styles.paginationButton}
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
        </button>
      <span className={styles.pageIndicator}>
        {currentPage} of {totalPages > 1 ? totalPages : 1}
      </span>
      <button
        className={styles.paginationButton}
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  </div>
</div>

  );
};

export default ListToDos;
