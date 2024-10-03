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
