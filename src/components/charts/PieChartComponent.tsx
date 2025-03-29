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

const TOOLTIP_STYLES = {
	light: {
		backgroundColor: '#FFFFFF',
		color: '#4B5563',
	},
	dark: {
		backgroundColor: '#1F2937',
		color: '#ffffff',
	},
};

const CHART_WRAPPER_COLORS = {
	light: '#374151',
	dark: '#E5E7EB',
};

const PieChartComponent: FC<IProps> = ({ title, data }) => {
	const { theme } = useTheme();
	const tooltipContentStyles = theme === 'dark' ? TOOLTIP_STYLES.dark : TOOLTIP_STYLES.light;

	const wrapperStyles = {
		color: theme === 'dark' ? CHART_WRAPPER_COLORS.dark : CHART_WRAPPER_COLORS.light,
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
					<Tooltip itemStyle={tooltipContentStyles} contentStyle={tooltipContentStyles} />
					{data?.length <= 5 && <Legend wrapperStyle={wrapperStyles} />}
				</PieChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};

export default PieChartComponent;
