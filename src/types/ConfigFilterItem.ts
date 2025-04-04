import type { TListItem } from './common';

interface TBaseConfigFilterItem {
  title: string;
  type: 'Date' | 'number' | 'string' | 'list';
  list?: TListItem[];
}

interface TConfigFilterItemList extends TBaseConfigFilterItem {
  type: 'list';
  list: TListItem[];
}

interface TConfigFilterItemWithoutList extends TBaseConfigFilterItem {
  type: 'Date' | 'number' | 'string';
  list?: never;
}

export type TConfigFilterItem = TConfigFilterItemList | TConfigFilterItemWithoutList;
