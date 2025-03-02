export type TFilterRequest = Record<string, unknown>;

export type TPagination = {
  current: number;
  limit: number;
  total: number;
};

export type TSortingRequest = {
  by: string;
  direction: string;
};

export type GetListResponse<TResponse> = {
  data: TResponse[];
  pagination: TPagination;
};

export type GetItemResponse<TResponse> = {
  data: TResponse;
};

export type GetListRequest = {
  filter?: TFilterRequest;
  pagination?: TPagination;
  sort?: TSortingRequest;
};

export type GetItemRequest = {
  id: string | number;
};
