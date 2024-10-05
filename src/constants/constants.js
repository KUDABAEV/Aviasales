export const BTN_SHOW_MORE_COUNT = 5;

export const SORT_OPTIONS_OBJ = {
  noSort: {
    label: 'Нет сортировки',
    value: 'NO_SORT',
    isHide: true,
  },
  cheapest: {
    label: 'Самый дешевый',
    value: 'CHEAPEST',
  },
  fast: {
    label: 'Самый быстрый',
    value: 'FAST',
  },
  optimal: {
    label: 'Оптимальный',
    value: 'OPTIMAL',
  },
};

export const SORT_OPTIONS_ARRAY = Object.values(SORT_OPTIONS_OBJ).filter((option) => !option.isHide);

export const FILTER_OPTIONS_OBJ = {
  all: {
    label: 'Все',
    value: 'ALL',
    defaultState: true,
  },
  noTransfers: {
    label: 'Без пересадок',
    value: 0,
    defaultState: true,
  },
  oneTransfer: {
    label: '1 пересадка',
    value: 1,
    defaultState: true,
  },
  twoTransfer: {
    label: '2 пересадки',
    value: 2,
    defaultState: true,
  },
  threeTransfer: {
    label: '3 пересадки',
    value: 3,
    defaultState: true,
  },
};

export const FILTER_OPTIONS_ARRAY = Object.values(FILTER_OPTIONS_OBJ);

export const FILTER_OPTIONS_DEFAULT = Object.fromEntries(
  Object.entries(FILTER_OPTIONS_OBJ).map(([, option]) => [option.value, option.defaultState])
);
