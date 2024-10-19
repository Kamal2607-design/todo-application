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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input {...register('name', { required: true })} className="form-control" placeholder="Name" />
          {errors.name && <span className="text-danger">Name is required</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input {...register('mobile', { required: true })} className="form-control" placeholder="Mobile" />
          {errors.mobile && <span className="text-danger">Mobile is required</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select {...register('gender', { required: true })} className="form-select">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="text-danger">Gender is required</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Country</label>
          <select {...register('country', { required: true })} className="form-select">
            <option value="India">India</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Japan">Japan</option>
          </select>
          {errors.country && <span className="text-danger">Country is required</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Hobbies</label>
          <input {...register('hobbies')} className="form-control" placeholder="Hobbies (comma separated)" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input {...register('email', { required: true })} className="form-control" placeholder="Email" />
          {errors.email && <span className="text-danger">Email is required</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" {...register('password', { required: true })} className="form-control" placeholder="Password" />
          {errors.password && <span className="text-danger">Password is required</span>}
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
      <div className="text-center mt-3">
        <p>Already have an account? <Link href="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
