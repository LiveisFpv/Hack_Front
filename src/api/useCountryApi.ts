import useBaseApi from './base/useBaseApi';

export default () => {
  const { get } = useBaseApi();

  const getCountries = async () => {
    return await get('/api/v1/country');
  };

  return { getCountries };
};
