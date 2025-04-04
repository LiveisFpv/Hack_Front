import type { TConfigFilter, TFilterRequest } from '@/types';
import { cloneDeep } from 'lodash';
import { ref } from 'vue';

export const useFultersApp = (() => {
  const isOpen = ref(false);
  const configFilters = ref<TConfigFilter>({});
  const currentFilters = ref<Partial<Record<string, TFilterRequest>>>({});
  const editFilters = ref<Partial<Record<string, TFilterRequest>>>({});
  const applyCb = ref<(filters: TFilterRequest[]) => void>(() => void 0);

  const filtersToObj = <Filter extends string>(
    filtersArr: TFilterRequest<Filter>[],
  ): Partial<Record<Filter, TFilterRequest<Filter>>> => {
    return filtersArr.reduce(
      (obj, filters) => ({ ...obj, [filters.field]: filters }),
      {},
    );
  };

  const filtersToArr = <Filter extends string>(
    filtersObj: Partial<Record<Filter, TFilterRequest<Filter>>>,
  ): TFilterRequest<Filter>[] => {
    return (Object.values(filtersObj) as TFilterRequest<Filter>[]).filter(
      ({ value }: TFilterRequest<Filter>) => value !== null,
    );
  };

  const openFilters = <Filter extends string = string>(
    newFilters: TFilterRequest<Filter>[],
    newConfigFilter: TConfigFilter<Filter>,
    newApplyCb: (filters: TFilterRequest[]) => void,
  ) => {
    currentFilters.value = filtersToObj(newFilters);
    configFilters.value = newConfigFilter;
    clear();
    applyCb.value = newApplyCb;
    isOpen.value = true;
  };
  const close = () => (isOpen.value = false);
  const apply = () => {
    const filtersArr = filtersToArr(editFilters.value);
    applyCb.value(filtersArr);
    close();
  };

  const clear = () => {
    editFilters.value = cloneDeep(currentFilters.value);
  };

  return {
    isOpen,
    currentFilters,
    editFilters,
    configFilters,

    openFilters,
    close,
    apply,
    clear,
  };
})();
