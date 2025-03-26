import { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import ChartContainer from './ChartWrapper';
import { ChartDataType } from '../../types/settings-types';

interface IProps {
	title: string;
	data: ChartDataType;
	dataKey: string;
	colorVariant: 1 | 2 | 3;
}

const BAR_COLORS = {
	1: { light: '#0088FE', dark: '#60A5FA' }, // blue
	2: { light: '#00C49F', dark: '#4DE0B2' }, // green
	3: { light: '#FF8042', dark: '#FF9F6D' }, // orange
};
const GRID_COLORS = {
	light: '#ccc',
	dark: '#555',
};

const TOOLTIP_STYLES = {
	light: {
		backgroundColor: '#FFFFFF',
		color: '#4B5563',
	},
	dark: {
		backgroundColor: '#1F2937',
		color: '#E5E7EB',
	},
};
const BarChartComponent: FC<IProps> = ({ title, data, dataKey, colorVariant }) => {
	const { theme } = useTheme();
	const barFill = theme === 'dark' ? BAR_COLORS[colorVariant].dark : BAR_COLORS[colorVariant].light;
	const gridColor = theme === 'dark' ? GRID_COLORS.dark : GRID_COLORS.light;
	const tooltipContentStyles = theme === 'dark' ? TOOLTIP_STYLES.dark : TOOLTIP_STYLES.light;
	return (
		<ChartContainer title={title}>
			<ResponsiveContainer>
				<BarChart data={data} margin={{ right: 10, left: -40, bottom: 10, top: 10 }}>
					<CartesianGrid strokeDasharray='3 3' stroke={gridColor} />
					<XAxis dataKey='name' hide />
					<YAxis domain={[1, 5]} interval={0} />
					<Tooltip contentStyle={tooltipContentStyles} />
					<Bar dataKey={dataKey} fill={barFill} />
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};

export default BarChartComponent;
