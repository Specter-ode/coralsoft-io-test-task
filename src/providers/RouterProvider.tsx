import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { getIsAuth } from '../store/auth/authSelectors';
import { useAppSelector } from '../store/store';
import UIProvider from './UIProvider';
import HomePage from '../app/home';
import SignInPage from '../app/signIn';

const RouterProvider: React.FC = () => {
	const isAuthenticated = useAppSelector(getIsAuth);
	return (
		<BrowserRouter>
			<UIProvider>
				<Routes>
					<Route path='/' element={isAuthenticated ? <HomePage /> : <Navigate to='/sign-in' />} />
					<Route path='/sign-in' element={isAuthenticated ? <Navigate to='/' /> : <SignInPage />} />
				</Routes>
			</UIProvider>
		</BrowserRouter>
	);
};

export default RouterProvider;
