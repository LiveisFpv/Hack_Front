import type { TListItem } from '@/types';

export const getFitnessTargetList = (): TListItem[] => [
  {
    id: 'wieght_up',
    title: 'Набор веса',
  },
  {
    id: 'wieght_norm',
    title: 'Поддержание веса',
  },
  {
    id: 'wieght_down',
    title: 'Снижение веса',
  },
];
