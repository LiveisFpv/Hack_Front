import type { GetListRequest, GetListResponse, TCountry } from '@/types';
import useBaseApi from './base/useBaseApi';

export default () => {
  const { post } = useBaseApi();

  const getCountries = async (
    params?: GetListRequest,
  ): Promise<GetListResponse<TCountry>> => {
    return await post('/api/v1/country/all', params);
  };

  return { getCountries };
};
