import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import styles from './create-todo.module.css';

interface ICreateTodoForm {
  name: string;
  description: string;
  time: string;
  status: string;
}

const CreateTodo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ICreateTodoForm>();

  const onSubmit: SubmitHandler<ICreateTodoForm> = async (data: ICreateTodoForm) => {
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('To-do created successfully!');
      } else {
        alert('Error creating to-do');
      }
    } catch (error) {
      console.error('Error creating to-do:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.containerCenter}>
      <div className={styles.formContainer}>
        <h2 className={styles.header}>Create To-Do</h2>
        <form className={styles.todoForm} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register('name', { required: 'Task name is required' })}
              className={styles.inputField}
              placeholder="Task Name"
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
          </div>
          <div>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className={styles.inputField}
              placeholder="Description"
            />
            {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}
          </div>
          <div>
            <input
              type="datetime-local"
              {...register('time', { required: 'Time is required' })}
              className={styles.inputField}
            />
            {errors.time && <span className={styles.errorMessage}>{errors.time.message}</span>}
          </div>
          <div>
            <select {...register('status', { required: 'Status is required' })} className={styles.inputField}>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && <span className={styles.errorMessage}>{errors.status.message}</span>}
          </div>
          <button className={styles.submitButton} type="submit">Create To-Do</button>
        </form>
        <Link href="/list-todos" className={styles.textLink}>View All To-Dos</Link>
      </div>
    </div>
  );
};

export default CreateTodo;
