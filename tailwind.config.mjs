export default {
	content: ['./src/**/*.{ts,js,tsx,jsx}', './node_modules/preline/preline.js'],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [require('preline/plugin')],
};
