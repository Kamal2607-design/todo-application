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

            if (response.ok) {
                alert('To-Do created successfully');
                router.push('/list-todos'); // Redirect to the dashboard after successful creation
            } else {
                const result = await response.json();
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name', { required: true })} placeholder="Task Name" />
            {errors.name && <span>Name is required</span>}

            <textarea {...register('description', { required: true })} placeholder="Description" />
            {errors.description && <span>Description is required</span>}

            <input type="datetime-local" {...register('time', { required: true })} />
            {errors.time && <span>Time is required</span>}

            <select {...register('status', { required: true })}>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            {errors.status && <span>Status is required</span>}

            <button type="submit">Create To-Do</button>
        </form>
        <Link href="/list-todos">View All To-Dos</Link>
  </div>
    );
};

export default CreateTodo;
