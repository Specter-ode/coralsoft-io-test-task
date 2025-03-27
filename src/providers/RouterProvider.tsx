import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import UIProvider from './UIProvider';
import HomePage from '../app/home';
import SignInPage from '../app/signIn';
import NotFoundPage from '../app/notFound';

const RouterProvider: React.FC = () => {
	return (
		<BrowserRouter>
			<UIProvider>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/sign-in' element={<SignInPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</UIProvider>
		</BrowserRouter>
	);
};

export default RouterProvider;
