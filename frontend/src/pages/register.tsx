import { useForm } from 'react-hook-form';

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

    const onSubmit = async (data: IFormInput) => {
        console.log('Form data:', data);
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result); // Handle the response (e.g., success message)

            if (response.ok) {
                alert('User created successfully');
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name", { required: true })} placeholder="Name" />
            {errors.name && <span>Name is required</span>}

            <input {...register("mobile", { required: true })} placeholder="Mobile" />
            {errors.mobile && <span>Mobile is required</span>}

            <select {...register("gender", { required: true })}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            {errors.gender && <span>Gender is required</span>}

            <select {...register("country", { required: true })}>
                <option value="India">India</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Japan">Japan</option>
            </select>
            {errors.country && <span>Country is required</span>}

            <input {...register("hobbies")} placeholder="Hobbies (comma separated)" />

            <input {...register("email", { required: true })} placeholder="Email" />
            {errors.email && <span>Email is required</span>}

            <input type="password" {...register("password", { required: true })} placeholder="Password" />
            {errors.password && <span>Password is required</span>}

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
