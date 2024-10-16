import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'; // Import useRouter
import Link from 'next/link'; // Import Link for navigation
import { useState } from 'react';

interface ILoginForm {
  mobile: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const router = useRouter(); // Initialize the useRouter hook

  const onSubmit = async (data: ILoginForm) => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        setLoginMessage('Login successful');
        router.push('/create-todo'); // Redirect to dashboard after successful login
      } else {
        setLoginMessage('Login failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginMessage('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Mobile</label>
      <input {...register('mobile', { required: 'Mobile number is required' })} />
      {errors.mobile && <p>{errors.mobile.message}</p>}

      <label>Password</label>
      <input type="password" {...register('password', { required: 'Password is required' })} />
      {errors.password && <p>{errors.password.message}</p>}

      {loginMessage && <p>{loginMessage}</p>}

      <button type="submit">Login</button>

      {/* Add a link to the register page */}
      <p>Don't have an account? <Link href="/register">Register here</Link></p>
    </form>
  );
};

export default Login;
