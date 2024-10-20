import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './login.module.css';

interface ILoginForm {
  mobile: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<ILoginForm> = async (data: ILoginForm) => {
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
        router.push('/create-todo');  // Redirect to dashboard
      } else {
        setLoginMessage(`Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.containerCenter}>
      <div className={styles.formContainer}>
        <h2 className={styles.loginHeader}>Login</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Mobile</label>
            <input
              {...register('mobile', { required: 'Mobile number is required' })}
              className={styles.inputField}
              placeholder="Mobile"
            />
            {errors.mobile && <span className={styles.errorMessage}>{errors.mobile.message}</span>}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={styles.inputField}
              placeholder="Password"
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
          </div>
          {loginMessage && <p className={styles.errorMessage}>{loginMessage}</p>}
          <button className={styles.submitButton} type="submit">Login</button>
        </form>
        <p>Don’t have an account? <Link href="/register" className={styles.textLink}>Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
