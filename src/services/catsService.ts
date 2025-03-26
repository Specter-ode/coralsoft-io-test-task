import {
	createApi,
	fetchBaseQuery,
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	QueryReturnValue,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { ICatModel } from '../types/cats-types';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://api.thecatapi.com/v1/',
});

const baseQueryWithRetry: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	object,
	FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
	const MAX_RETRIES = 5;
	let retryCount = 0;

	let result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>;
	while (retryCount < MAX_RETRIES) {
		result = await baseQuery(args, api, extraOptions);
		retryCount++;

		if (result.data) {
			return result;
		}

		if (retryCount < MAX_RETRIES) {
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}

	return result!;
};

export const catsApi = createApi({
	reducerPath: 'catsApi',
	baseQuery: baseQueryWithRetry,
	endpoints: builder => ({
		getBreeds: builder.query<ICatModel[], void>({
			query: () => 'breeds',
		}),
	}),
});

export const { useGetBreedsQuery } = catsApi;
