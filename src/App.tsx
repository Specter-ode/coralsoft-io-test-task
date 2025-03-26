import React from 'react';
import StoreProvider from './providers/StoreProvider';
import RouterProvider from './providers/RouterProvider';

const App: React.FC = () => {
	return (
		<StoreProvider>
			<RouterProvider />
		</StoreProvider>
	);
};

export default App;
