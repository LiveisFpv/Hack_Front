import type { TConfigFilterItem } from './ConfigFilterItem';

export type TFilterRequest<Fields = string> = {
  field: Fields;
  value: string;
};

export type TPagination = {
  current: number;
  limit: number;
  total: number;
};

export type TSortDirection = 'asc' | 'desc';

export type TSortingRequest<TByKeys extends string = string> = {
  by: TByKeys;
  direction: TSortDirection;
};

export type GetListResponse<TResponse> = {
  data: TResponse[];
  pagination: TPagination;
};

export type TResponse<TResponseType> = {
  data: TResponseType;
};

export type GetItemResponse<TResponseType> = TResponse<TResponseType>;

export type GetListRequest = {
  filter?: TFilterRequest[];
  pagination?: TPagination;
  sort?: TSortingRequest[];
};

export type GetItemRequest = {
  id: string | number;
};

export type TListItem = {
  id: string | number;
  title: string;
};

export type TConfigFilter<Fields extends string = string> = Partial<
  Record<Fields, TConfigFilterItem>
>;
