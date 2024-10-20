import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';


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
  <div className="form-container">
    <h1>Welcome</h1>
    <h2 className='register'>Register</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input
          {...register('name', { required: true })}
          className="input-field"
          placeholder="Name"
        />
        {errors.name && <span className="error-message">Name is required</span>}
      </div>

      <div>
        <label>Mobile</label>
        <input
          {...register('mobile', { required: true })}
          className="input-field"
          placeholder="Mobile"
        />
        {errors.mobile && <span className="error-message">Mobile is required</span>}
      </div>

      <div>
        <label>Gender</label>
        <select {...register('gender', { required: true })} className="select-field">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <span className="error-message">Gender is required</span>}
      </div>

      <div>
        <label>Country</label>
        <select {...register('country', { required: true })} className="select-field">
          <option value="India">India</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="Japan">Japan</option>
        </select>
        {errors.country && <span className="error-message">Country is required</span>}
      </div>

      <div>
        <label>Hobbies</label>
        <input
          {...register('hobbies')}
          className="input-field"
          placeholder="Hobbies (comma separated)"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          {...register('email', { required: true })}
          className="input-field"
          placeholder="Email"
        />
        {errors.email && <span className="error-message">Email is required</span>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: true })}
          className="input-field"
          placeholder="Password"
        />
        {errors.password && <span className="error-message">Password is required</span>}
      </div>

      <button type="submit">Register</button>
    </form>

    <div className="text-center">
      <p>
        Already have an account? <Link href="/login" className="text-link">Login</Link>
      </p>
    </div>
  </div>
</div>


    
  );
};

export default Register;
