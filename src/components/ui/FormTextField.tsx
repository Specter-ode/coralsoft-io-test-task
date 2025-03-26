import React, { FC } from 'react';

interface FormTextFieldProps {
	label: string;
	id: string;
	name: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
}

const FormTextField: FC<FormTextFieldProps> = ({
	label,
	id,
	name,
	type,
	value,
	onChange,
	error,
}) => {
	return (
		<div className='relative'>
			<label htmlFor={id} className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
				{label}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				className={`mt-1 py-3 px-4 block w-full border-2 rounded-lg text-sm	dark:bg-gray-700 dark:text-white  focus:outline-hidden
					${
						error
							? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500'
							: 'border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500'
					}`}
			/>
			{error && (
				<p className='absolute top-full left-0 text-sm text-red-600 dark:text-red-400'>{error}</p>
			)}
		</div>
	);
};

export default FormTextField;
