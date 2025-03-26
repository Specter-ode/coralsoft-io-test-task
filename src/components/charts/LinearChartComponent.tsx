import { FC } from 'react';
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	LineChart,
	Line,
	ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import ChartContainer from './ChartWrapper';
import { ChartDataType } from '../../types/settings-types';

interface IProps {
	title: string;
	data: ChartDataType;
	stroke: string;
}
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
const LinearChartComponent: FC<IProps> = ({ title, data }) => {
	const { theme } = useTheme();
	const tooltipContentStyles = theme === 'dark' ? TOOLTIP_STYLES.dark : TOOLTIP_STYLES.light;

	return (
		<ChartContainer title={title}>
			<ResponsiveContainer>
				<LineChart data={data} margin={{ right: 10, left: -20, bottom: 10, top: 10 }}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' hide />
					<YAxis type='number' domain={['dataMin - 2', 'dataMax + 2']} interval={0} />
					<Tooltip contentStyle={tooltipContentStyles} />
					<Line type='monotone' dataKey='value' stroke='#8884d8' />
				</LineChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};

export default LinearChartComponent;
