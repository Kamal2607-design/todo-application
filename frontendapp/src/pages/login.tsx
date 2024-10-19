import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from 'react';

interface ILoginForm {
  mobile: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const router = useRouter();

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
        setLoginMessage('Login successful!');
        router.push('/create-todo'); // Redirect to dashboard
      } else {
        setLoginMessage(`Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input {...register('mobile', { required: 'Mobile number is required' })} className="form-control" placeholder="Mobile" />
          {errors.mobile && <span className="text-danger">{errors.mobile.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" {...register('password', { required: 'Password is required' })} className="form-control" placeholder="Password" />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
        </div>
        {loginMessage && <p className="text-danger">{loginMessage}</p>}
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      <div className="text-center mt-3">
        <p>Don&apos;t have an account? <Link href="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
