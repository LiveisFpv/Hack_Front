export type TFilterRequest = {
  field: string;
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

export type GetItemResponse<TResponse> = {
  data: TResponse;
};

export type GetListRequest = {
  filter?: TFilterRequest[];
  pagination?: TPagination;
  sort?: TSortingRequest[];
};

export type GetItemRequest = {
  id: string | number;
};
