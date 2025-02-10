import {useQuery} from '@tanstack/react-query';
import api from '../utils/interceptor';

// Function to fetch data using api interceptor that i have developed

type getDataProps = (
  endpoint: string,
  tag: unknown[],

) => ReturnType<typeof useQuery>;

const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);

    // Extract data or any other relevant information from the response
    const data = response?.data;

    return data;
  } catch (error: any) {

    if (error?.response?.data?.message) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

const useGetData: getDataProps = (
  endpoint: string,
  tag: any[],

) =>
  useQuery({
    queryKey: tag,
    queryFn: () => fetchData(endpoint),
    retry:3,

  });

export default useGetData;
