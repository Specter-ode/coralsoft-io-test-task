import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		console.warn('useTheme must be used within a ThemeProvider. Falling back to default values.');
		return {
			theme: 'light', // Default theme
			toggleTheme: () => console.warn('toggleTheme is called but ThemeProvider is missing.'),
		};
	}
	return context;
};
