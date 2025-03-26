import { FC } from 'react';
import { Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import ChartContainer from './ChartWrapper';
import { ChartDataType } from '../../types/settings-types';

interface IProps {
	title: string;
	data: ChartDataType;
}

const COLORS: string[] = [
	'#0088FE',
	'#00C49F',
	'#FFBB28',
	'#FF8042',
	'#8884d8',
	'#82ca9d',
	'#FF5733',
	'#C70039',
	'#900C3F',
	'#581845',
	'#FFC300',
	'#DAF7A6',
	'#33FF57',
	'#33FFF9',
	'#337BFF',
	'#B833FF',
];

const PieChartComponent: FC<IProps> = ({ title, data }) => {
	const { theme } = useTheme();
	const tooltipContentStyles =
		theme === 'dark'
			? {
					backgroundColor: '#1F2937',
					color: '#E5E7EB',
			  }
			: {
					backgroundColor: '#FFFFFF',
					color: '#374151',
			  };

	const wrapperStyles = {
		color: theme === 'dark' ? '#E5E7EB' : '#374151',
	};

	return (
		<ChartContainer title={title}>
			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={data}
						dataKey='value'
						nameKey='name'
						cx='50%'
						cy='50%'
						outerRadius={data?.length <= 5 ? 95 : 115}
						label
					>
						{data.map((_, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Tooltip contentStyle={tooltipContentStyles} />
					{data?.length <= 5 && <Legend wrapperStyle={wrapperStyles} />}
				</PieChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};

export default PieChartComponent;
