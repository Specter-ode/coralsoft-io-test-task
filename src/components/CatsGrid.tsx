import { FC } from 'react';
import { ICatModel } from '../types/cats-types';

interface CatsGridProps {
	cats: ICatModel[];
}

const CatsGrid: FC<CatsGridProps> = ({ cats }) => {
	return (
		<div className='mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
			{cats.map(cat => (
				<div
					key={cat.id}
					className='group flex flex-col h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm rounded-xl'
				>
					<div className='p-4 md:p-6'>
						<h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>
							{cat.name}
						</h3>
						<span className='block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-400'>
							Origin: {cat.origin || 'Unknown'}
						</span>
						<p className='mt-3 text-gray-500 dark:text-gray-400 line-clamp-3'>
							{cat.description || 'No description available'}
						</p>
						<div className='mt-4 space-y-2'>
							<div className='flex justify-between text-gray-700 dark:text-gray-300'>
								<span>Adaptability:</span>
								<span>{cat.adaptability}/5</span>
							</div>
							<div className='flex justify-between text-gray-700 dark:text-gray-300'>
								<span>Affection Level:</span>
								<span>{cat.affection_level}/5</span>
							</div>
							<div className='flex justify-between text-gray-700 dark:text-gray-300'>
								<span>Life Span:</span>
								<span>{cat.life_span} years</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default CatsGrid;
