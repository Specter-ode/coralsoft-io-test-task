import React, { FC, useEffect, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { getAuthState } from '../store/auth/authSelectors';
import { Header } from '../components/Header';
import FormTextField from '../components/ui/FormTextField';
import { validateEmail } from '../utils/validateEmail';
import { useAppSelector } from '../store/store';
import { useNavigate } from 'react-router';

interface IState {
	email: string;
	password: string;
}

interface IValidationErrors {
	email?: string;
	password?: string;
}

const SignInPage: FC = () => {
	const navigate = useNavigate();
	const { loginStart, loginSuccess, loginFailure } = useActions();
	const { loading, error, isAuthenticated } = useAppSelector(getAuthState);
	const [state, setState] = useState<IState>({ email: '', password: '' });
	const [validationErrors, setValidationErrors] = useState<IValidationErrors>({});
	const { email, password } = state;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { value, name } = e.target;
		setState(prevState => ({
			...prevState,
			[name]: value,
		}));
		setValidationErrors(prevErrors => ({
			...prevErrors,
			[name]: '',
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		const newErrors: { email?: string; password?: string } = {};

		if (!email) {
			newErrors.email = 'Email is required';
		} else if (!validateEmail(email)) {
			newErrors.email = 'Please enter a valid email address';
		}
		if (!password) {
			newErrors.password = 'Password is required';
		}
		setValidationErrors(newErrors);
		if (Object.keys(newErrors).length > 0) {
			return;
		}
		handleSignIn();
	};

	const handleSignIn = async () => {
		loginStart();
		await new Promise(r => setTimeout(r, 1000));
		if (email === 'test@test.test' && password === 'password') {
			loginSuccess({
				email: email,
				name: email.split('@')[0],
				id: Math.random(),
				role: 'user',
			});
		} else {
			loginFailure('User not found');
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col'>
			<Header title='Coralsoft Test Task' />
			<main className='flex-grow flex items-center justify-center'>
				<div className='relative w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-xl p-8'>
					<h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6'>
						Sign In
					</h1>
					<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
						<FormTextField
							label='Email address'
							id='email'
							name='email'
							type='email'
							value={email}
							onChange={handleChange}
							error={validationErrors.email}
						/>
						<FormTextField
							label='Password'
							id='password'
							name='password'
							type='password'
							value={password}
							onChange={handleChange}
							error={validationErrors.password}
						/>
						<button
							type='submit'
							disabled={loading}
							className='w-full py-3 px-4 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer'
						>
							{loading ? 'Loading...' : 'Sign in'}
						</button>
					</form>
					{error && (
						<p className='absolute bottom-2 left-8 text-sm text-red-600 dark:text-red-400'>
							{error}
						</p>
					)}
				</div>
			</main>
		</div>
	);
};

export default SignInPage;
