import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import api from '../utils/interceptor';
import React from 'react'
// Define the types for the pagination and response structure
interface Paginate {
  next_page_url: string | null;
}

interface ApiResponse<T> {
  data: T;
  paginate?: Paginate;
}

// Define the result structure returned by the fetchDataFn
interface FetchResult<T> {
  data: T;
  nextPage: number | null;
}

// Function to fetch paginated data
const fetchDataFn = async (pageParams: number, endpoint: string,query?:{}): Promise<FetchResult<any>> => {
  try {
    const response = await api.get<ApiResponse<any>>(endpoint, {
      params: { page: pageParams,...query },
    });

    if (response.status === 200) {
      const nextPageUrl = response.data.paginate?.next_page_url;
      let nextPage: number | null = null;

      if (nextPageUrl) {
        const url = new URL(nextPageUrl);
        const newSearchParams = url.searchParams.get('page');
        nextPage = newSearchParams ? parseInt(newSearchParams, 10) : null;
      }

      return { data: response.data.data, nextPage };
    }

    throw new Error('Unexpected response status');
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message || 'An unknown error occurred');
    }
  }
};

// Hook to handle infinite data fetching
type GetDataProps<T> = (endpoint: string, tag: unknown[]) => UseInfiniteQueryResult<FetchResult<T>, Error>;

const useGetInfinityData = (endpoint: string, tag: unknown[],query?:{}): UseInfiniteQueryResult<FetchResult<any>, Error> =>
  useInfiniteQuery({
    queryKey: tag,
    queryFn: ({ pageParam = 1 }) => fetchDataFn(pageParam, endpoint,query),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1, 
  });

export default useGetInfinityData;



