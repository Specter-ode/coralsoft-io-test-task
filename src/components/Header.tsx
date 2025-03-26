import React from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';
import { getIsAuth } from '../store/auth/authSelectors';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
	title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Coralsoft Test Task' }) => {
	const isAuthenticated = useSelector(getIsAuth);
	const { logout } = useActions();
	const { theme, toggleTheme } = useTheme();
	const handleLogout = (): void => {
		logout();
	};
	return (
		<header className='w-full bg-gray-500 dark:bg-gray-800 text-white flex justify-between items-center p-4'>
			<h1 className='text-2xl font-bold'>{title}</h1>
			<div className='flex items-center gap-4'>
				{isAuthenticated && (
					<button
						onClick={handleLogout}
						className='py-2 px-4 hover:bg-gray-700 rounded transition-colors'
					>
						Logout
					</button>
				)}
				<button
					onClick={toggleTheme}
					className='py-2 px-4 hover:bg-gray-700 rounded transition-colors min-w-32'
				>
					{theme === 'light' ? 'Dark Mode' : 'Light Mode'}
				</button>
			</div>
		</header>
	);
};
