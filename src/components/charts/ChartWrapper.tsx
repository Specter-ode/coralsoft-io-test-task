import { FC, ReactNode } from 'react';

interface IProps {
	title: string;
	children: ReactNode;
}

const ChartWrapper: FC<IProps> = ({ title, children }) => {
	return (
		<div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm'>
			<h2 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center'>
				{title}
			</h2>
			<div className='h-[300px]'>{children}</div>
		</div>
	);
};

export default ChartWrapper;
