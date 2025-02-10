import {
  MutateOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import api from '../utils/interceptor';

const fetchDatafn = async (
  endpoint: string,
  payload?: object,
  method = 'post',
) => {
  try {
    let response;
    if (method === 'post') {
      response = await api.post(endpoint, payload);
    } else if (method === 'delete') {
      response = await api.delete(`${endpoint}/${payload?.id}`);
    }
    else if (method === 'put') {
      response = await api.put(`${endpoint}`,payload);
    }

    return response?.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const usePostData = (
  endpoint: string,
  tag: unknown[],
  method?: 'post'|"put"|"delete",
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void,
) => {

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload?: object) => fetchDatafn(endpoint, payload, method),
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: tag});
      if (onSuccess) onSuccess(data);
    },
    onError: error => {
      if (onError) onError(error);
    },
  });
};

export default usePostData;
