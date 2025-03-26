import { FC, useState, useMemo, useEffect } from 'react';
import { useGetBreedsQuery } from '../services/catsService';
import { Header } from '../components/Header';

import { ChartDataType, IChartsData, SortCriterion, SortDirection } from '../types/settings-types';
import SettingsPanel from '../components/SettingsPanel';
import CatsGrid from '../components/CatsGrid';
import BarChartComponent from '../components/charts/BarChartComponent';
import PieChartComponent from '../components/charts/PieChartComponent';
import LinearChartComponent from '../components/charts/LinearChartComponent';
import Loader from '../components/Loader';
import { ICatModel } from '../types/cats-types';

const HomePage: FC = () => {
	const { data, isLoading, error, isSuccess } = useGetBreedsQuery();
	const [showCharts, setShowCharts] = useState(true);
	const [filterOrigin, setFilterOrigin] = useState<string[]>([]);
	const [sortBy, setSortBy] = useState<SortCriterion>('name');
	const [sortOrder, setSortOrder] = useState<SortDirection>('asc');
	const handleFilterByOrigin = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
		setFilterOrigin(selectedOptions);
	};
	const handleClearFilterByOrigin = () => {
		setFilterOrigin([]);
	};

	const handleSortChange = (newSortBy: SortCriterion) => {
		if (newSortBy === sortBy) {
			// Если кликнули на ту же опцию, переключаем направление
			setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
		} else {
			// Если выбрана новая опция, устанавливаем её и сортировку по убыванию
			setSortBy(newSortBy);
			setSortOrder('desc');
		}
	};

	const sortedCats = useMemo<ICatModel[]>(() => {
		if (!data) return [];

		const sorted = [...data];
		sorted.sort((a, b) => {
			let aValue: string | number, bValue: string | number;

			switch (sortBy) {
				case 'name':
					aValue = a.name;
					bValue = b.name;
					break;
				case 'adaptability':
					aValue = a.adaptability;
					bValue = b.adaptability;
					break;
				case 'affection_level':
					aValue = a.affection_level;
					bValue = b.affection_level;
					break;
			}

			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
			} else if (typeof aValue === 'number' && typeof bValue === 'number') {
				return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
			}
			return 0;
		});

		return sorted;
	}, [data, sortBy, sortOrder]);

	const filteredCats = useMemo<ICatModel[]>(() => {
		return sortedCats.filter(cat => filterOrigin.length === 0 || filterOrigin.includes(cat.origin));
	}, [sortedCats, filterOrigin]);

	const {
		origins,
		adaptabilityData,
		affectionData,
		originData,
		indoorData,
		lapData,
		lifeSpanData,
	} = useMemo<IChartsData>(() => {
		const origins: string[] = [];
		const adaptabilityData: ChartDataType = [];
		const affectionData: ChartDataType = [];
		const lifeSpanData: ChartDataType = [];
		const originData: ChartDataType = [];
		const indoorData = [
			{ name: 'Indoor', value: 0 },
			{ name: 'Outdoor', value: 0 },
		];
		const lapData = [
			{ name: 'Lap Cat', value: 0 },
			{ name: 'Not Lap Cat', value: 0 },
		];

		if (sortedCats?.length > 0) {
			const originCount: Record<string, number> = {};

			sortedCats.forEach(cat => {
				adaptabilityData.push({ name: cat.name, value: cat.adaptability });
				affectionData.push({ name: cat.name, value: cat.affection_level });

				const [min, max] = cat.life_span.split('-').map(Number);
				const avgLifeSpan = (min + max) / 2 || 0;
				lifeSpanData.push({ name: cat.name, value: avgLifeSpan });

				if (!origins.includes(cat.origin)) {
					origins.push(cat.origin);
				}

				const origin = cat.origin || 'Unknown';
				originCount[origin] = (originCount[origin] || 0) + 1;

				if (cat.indoor === 1) {
					indoorData[0].value += 1;
				} else {
					indoorData[1].value += 1;
				}

				if (cat.lap === 1) {
					lapData[0].value += 1;
				} else {
					lapData[1].value += 1;
				}
			});

			originData.push(...Object.entries(originCount).map(([name, value]) => ({ name, value })));
		}

		return {
			adaptabilityData,
			affectionData,
			originData,
			indoorData,
			lapData,
			lifeSpanData,
			origins,
		};
	}, [sortedCats]);

	useEffect(() => {
		if (!isLoading && isSuccess) {
			window.HSStaticMethods.autoInit();
		}
	}, [isLoading, isSuccess]);

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col'>
			<Header title='Cat Breeds' />
			<main className='container mx-auto px-4 py-8 flex-1 relative'>
				{isLoading ? (
					<Loader />
				) : error ? (
					<p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500'>
						Error loading cats data
					</p>
				) : sortedCats?.length > 0 ? (
					<>
						<SettingsPanel
							sortBy={sortBy}
							handleSortChange={handleSortChange}
							filterOrigin={filterOrigin}
							handleFilterByOrigin={handleFilterByOrigin}
							handleClearFilterByOrigin={handleClearFilterByOrigin}
							origins={origins}
							showCharts={showCharts}
							setShowCharts={setShowCharts}
						/>
						{showCharts && (
							<>
								<h2 className='text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200 text-center'>
									Cat Breeds Statistics
								</h2>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
									<BarChartComponent
										data={adaptabilityData}
										title='Adaptability Distribution'
										fill='#0088FE'
										dataKey='value'
									/>
									<BarChartComponent
										data={affectionData}
										title='Affection Levels'
										fill='#00C49F'
										dataKey='value'
									/>
									<PieChartComponent data={originData} title='Top Origins' />
									<PieChartComponent data={indoorData} title='Indoor vs Outdoor Preference' />
									<PieChartComponent data={lapData} title='Lap Cat Distribution' />
									<LinearChartComponent
										data={lifeSpanData}
										title='Life Span Distribution'
										stroke='#8884d8'
									/>
								</div>
							</>
						)}

						<h2 className='text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200 text-center'>
							Cats Information
						</h2>
						<CatsGrid cats={filteredCats} />
					</>
				) : null}
			</main>
		</div>
	);
};

export default HomePage;
