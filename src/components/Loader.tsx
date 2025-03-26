import React from 'react';

const Loader: React.FC = () => {
	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin inline-block w-10 h-10 border-[4px] border-current border-t-transparent text-blue-600 rounded-full' />
	);
};

export default Loader;
