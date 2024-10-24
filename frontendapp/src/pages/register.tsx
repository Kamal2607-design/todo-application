import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import styles from './register.module.css';


interface IFormInput {
  name: string;
  mobile: string;
  gender: string;
  country: string;
  hobbies: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const router = useRouter();

  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        alert('User created successfully!');
        router.push('/login');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container-center">
    <div className={styles.formContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className='register'>Register</h2>

        <div>
          <label className='text-primary'>Name</label>
          <input
            {...register('name', { 
              required: 'Name is required', 
              pattern: { value: /^[A-Za-z\s]+$/, message: 'Name must be at least 3 characters long' } 
            })}
            className={styles.inputField}
            placeholder="Name"
          />
          {errors.name && <span className={styles.errormessage}>{errors.name.message}</span>}
        </div>

        <div>
          <label>Mobile</label>
          <input
            {...register('mobile', { 
              required: 'Mobile number is required', 
              pattern: { value: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits' } 
            })}
            className={styles.inputField}
            placeholder="Mobile"
          />
          {errors.mobile && <span className={styles.errormessage}>{errors.mobile.message}</span>}
        </div>

        <div>
          <label>Gender</label>
          <select {...register('gender', { required: 'Gender is required' })} className="select-field">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className={styles.errormessage}>{errors.gender.message}</span>}
        </div>

        <div>
          <label>Country</label>
          <select {...register('country', { required: 'Country is required' })} className="select-field">
            <option value="India">India</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Japan">Japan</option>
          </select>
          {errors.country && <span className={styles.errormessage}>{errors.country.message}</span>}
        </div>

        <div>
          <label>Hobbies</label>
          <input
            {...register('hobbies',
              { 
                validate: value => value.includes(',') || 'Hobbies must be comma-separated' 
              }
            )}
            className={styles.inputField}
            placeholder="Hobbies (comma separated)"
          />
          {errors.hobbies && <span className={styles.errormessage}>{errors.hobbies.message}</span>}
        </div>

        <div>
          <label>Email</label>
          <input
            {...register('email', { 
              required: 'Email is required', 
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } 
            })}
            className={styles.inputField}
            placeholder="Email"
          />
          {errors.email && <span className={styles.errormessage}>{errors.email.message}</span>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password', { 
              required: 'Password is required', 
              minLength: { value: 6, message: 'Password must be at least 6 characters long' } 
            })}
            className={styles.inputField}
            placeholder="Password"
          />
          {errors.password && <span className={styles.errormessage}>{errors.password.message}</span>}
        </div>

        <button className={styles.submitButton} type="submit">Register</button>

        <div>
          <p>
            Already have an account? <Link href="/login" className="text-link">Login</Link>
          </p>
        </div>
      </form>
    </div>
  </div>

    
  );
};

export default Register;
