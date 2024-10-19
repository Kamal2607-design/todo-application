import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ITodoInput {
  name: string;
  description: string;
  time: string;
  status: 'in progress' | 'completed';
}

const CreateTodo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ITodoInput>();
  const router = useRouter();

  const onSubmit = async (data: ITodoInput) => {
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        alert('To-Do created successfully');
        router.push('/list-todos');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center mb-6">Create To-Do</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('name', { required: 'Task Name is required' })}
              className="input-field"
              placeholder="Task Name"
            />
            {errors.name && <span className="error-message">Task Name is required</span>}
          </div>

          <div>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="input-field"
              placeholder="Description"
            />
            {errors.description && <span className="error-message">Description is required</span>}
          </div>

          <div>
            <input
              type="datetime-local"
              {...register('time', { required: 'Time is required' })}
              className="input-field"
            />
            {errors.time && <span className="error-message">Time is required</span>}
          </div>

          <div>
            <select {...register('status', { required: 'Status is required' })} className="input-field">
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && <span className="error-message">Status is required</span>}
          </div>

          <button type="submit" className="submit-button">Create To-Do</button>
        </form>

        <Link href="/list-todos" className='block mt-4 text-center text-blue-500 hover:underline'>
          View All To-Dos
        </Link>
      </div>
    </div>
  );
};

export default CreateTodo;
