import React from 'react';
import StoreProvider from './providers/StoreProvider';
import RouterProvider from './providers/RouterProvider';
import { ThemeProvider } from './providers/ThemeProvider';

const App: React.FC = () => {
	return (
		<StoreProvider>
			<ThemeProvider>
				<RouterProvider />
			</ThemeProvider>
		</StoreProvider>
	);
};

export default App;
