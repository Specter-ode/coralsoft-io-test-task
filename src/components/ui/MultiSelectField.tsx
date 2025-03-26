import { FC } from 'react';

interface IProps {
	label: string;
	id: string;
	value: string[];
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onClear: () => void;
	options: { value: string; label: string }[];
}

const MultiSelectField: FC<IProps> = ({ label, id, value, onChange, onClear, options }) => {
	const handleClick = () => {
		onClear();
		import('preline/preline').then(({ HSSelect }) => {
			const selectInstance: any = HSSelect.getInstance(`#${id}`, true);
			if (selectInstance) {
				selectInstance.element.setValue([]);
			}
		});
	};
	return (
		<div className='w-full md:w-auto relative'>
			<label
				htmlFor={id}
				className='block text-sm font-medium mb-2  text-gray-700 dark:text-gray-300 h-'
			>
				{label}
			</label>
			{value?.length > 0 && (
				<button
					type='button'
					id='multiple-with-conditional-counter-trigger-clear'
					className='absolute right-0 top-0 cursor-pointer py-1 px-2 inline-flex items-center gap-x-1 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-800'
					onClick={handleClick}
				>
					<svg
						className='shrink-0 size-3.5'
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='M18 6 6 18'></path>
						<path d='m6 6 12 12'></path>
					</svg>
				</button>
			)}

			<div className='relative min-w-72'>
				<select
					id={id}
					multiple
					data-hs-select='{
            "placeholder": "Select multiple options...",
            "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-hidden dark:focus:ring-1 dark:focus:ring-neutral-600",
            "toggleSeparators": {
              "betweenItemsAndCounter": "&"
            },
            "toggleCountText": "+",
            "toggleCountTextPlacement": "prefix-no-space",
            "toggleCountTextMinItems": 3,
            "toggleCountTextMode": "nItemsAndCount",
            "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
            "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
          }'
					className='hidden'
					value={value}
					onChange={onChange}
				>
					{options.map(option => (
						<option key={option.value || 'empty'} value={option.value}>
							{option.value}
						</option>
					))}
				</select>
				<div className='absolute top-1/2 end-2.5 -translate-y-1/2 pointer-events-none'>
					<svg
						className='shrink-0 size-4 text-gray-600 dark:text-neutral-600'
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='m7 15 5 5 5-5' />
						<path d='m7 9 5-5 5 5' />
					</svg>
				</div>
			</div>
		</div>
	);
};

export default MultiSelectField;
