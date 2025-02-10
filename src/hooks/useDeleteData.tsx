import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../utils/interceptor';

const fetchDatafn = async (
  endpoint: string,
  payload?: object,
  method='post',
) => {
  try {
    let response;
    if (method === 'post') {
      response = await api.post(endpoint, payload);
    } else if (method === 'delete') {
      response = await api.delete(`$endpoint`);
    }

    return response?.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const  useDeleteData = (endpoint: string, tag: unknown[], method?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload?: object) => fetchDatafn(endpoint, payload, method),
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: tag});
    },
  });
};

export default useDeleteData;
