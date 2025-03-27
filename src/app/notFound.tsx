import { FC } from 'react';
import { getIsAuth } from '../store/auth/authSelectors';
import { Link } from 'react-router';
import { useAppSelector } from '../store/store';
import { Header } from '../components/Header';

const NotFound: FC = () => {
	const isAuthenticated = useAppSelector(getIsAuth);

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col'>
			<Header title='Coralsoft Test Task' />
			<main className='flex-grow flex flex-col items-center justify-center'>
				<h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6'>
					404 - Page Not Found
				</h1>
				<p className='text-xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6'>
					Sorry, the page you are looking for does not exist.
				</p>
				<Link
					to={isAuthenticated ? '/' : '/sign-in'}
					className='w-fit py-3 px-4 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer'
				>
					Go back to {isAuthenticated ? 'Home' : 'Sign in'}
				</Link>
			</main>
		</div>
	);
};

export default NotFound;
