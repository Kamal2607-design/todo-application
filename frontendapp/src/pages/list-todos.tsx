import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Todo {
  id: number;
  name: string;
  description: string;
  time: string;
  status: string;
}

const ListTodos = () => {
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

  const filteredTodos = todos.filter(
    (todo) => statusFilter === 'all' || todo.status === statusFilter
  );

  return (
    <div>
      <h1>List of To-Dos</h1>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <p>{todo.time}</p>
            <p>{todo.status}</p>
            <button onClick={() => router.push(`/update-todo/${todo.id}`)}>
              Update Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTodos;
