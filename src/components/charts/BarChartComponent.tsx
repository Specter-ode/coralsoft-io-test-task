import { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import ChartContainer from './ChartWrapper';
import { ChartDataType } from '../../types/settings-types';

interface IProps {
	title: string;
	data: ChartDataType;
	fill: string;
	dataKey: string;
}

const BarChartComponent: FC<IProps> = ({ title, data, fill, dataKey }) => {
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

	return (
		<ChartContainer title={title}>
			<ResponsiveContainer>
				<BarChart data={data} margin={{ right: 10, left: -40, bottom: 10, top: 10 }}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' hide />
					<YAxis domain={[1, 5]} interval={0} />
					<Tooltip contentStyle={tooltipContentStyles} />
					<Bar dataKey={dataKey} fill={fill} />
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};

export default BarChartComponent;
