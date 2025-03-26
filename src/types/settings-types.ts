export type SortCriterion = 'name' | 'adaptability' | 'affection_level';
export type SortDirection = 'asc' | 'desc';
export type SortOption = { value: SortCriterion; label: string };
export type ChartDataType = { name: string; value: number }[];
export interface IChartsData {
	adaptabilityData: ChartDataType;
	affectionData: ChartDataType;
	originData: ChartDataType;
	indoorData: ChartDataType;
	lapData: ChartDataType;
	lifeSpanData: ChartDataType;
	origins: string[];
}
