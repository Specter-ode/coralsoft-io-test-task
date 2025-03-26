import { FC, useMemo } from 'react';
import SelectField from './ui/SelectField';

import MultiSelectField from './ui/MultiSelectField';
import { SortCriterion, SortOption } from '../types/settings-types';

interface IProps {
	sortBy: SortCriterion;
	handleSortChange: (value: SortCriterion) => void;

	filterOrigin: string[];
	handleFilterByOrigin: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	handleClearFilterByOrigin: () => void;
	origins: string[];
	showCharts: boolean;
	setShowCharts: (value: boolean) => void;
}

const SettingsPanel: FC<IProps> = ({
	sortBy,
	handleSortChange,
	filterOrigin,
	handleFilterByOrigin,
	origins,
	showCharts,
	setShowCharts,
	handleClearFilterByOrigin,
}) => {
	const sortOptions: SortOption[] = [
		{ value: 'name', label: 'Name' },
		{ value: 'adaptability', label: 'Adaptability' },
		{ value: 'affection_level', label: 'Affection Level' },
	];
	const filterOriginOptions = useMemo(
		() => [
			{ value: '', label: 'All' },
			...origins.map(origin => ({ value: origin, label: origin })),
		],
		[origins]
	);

	return (
		<div className='mb-8 flex flex-wrap gap-4 items-end'>
			<SelectField
				label='Sort By'
				id='sort-by'
				value={sortBy}
				onChange={handleSortChange}
				options={sortOptions}
			/>
			<MultiSelectField
				label='Filter by Origin'
				id='filter-origin'
				value={filterOrigin}
				onChange={handleFilterByOrigin}
				onClear={handleClearFilterByOrigin}
				options={filterOriginOptions}
			/>
			<button
				onClick={() => setShowCharts(!showCharts)}
				className='ml-auto h-[46px] py-3 px-4 text-md font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600'
			>
				{showCharts ? 'Hide Statistics' : 'Show Statistics'}
			</button>
		</div>
	);
};

export default SettingsPanel;
