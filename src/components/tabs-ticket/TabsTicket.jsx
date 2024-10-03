import { useDispatch, useSelector } from 'react-redux';
import { SORT_OPTIONS_ARRAY } from '../../constants/constants';
import { Tab } from '../tab/Tab';
import styles from './TabsTicket.module.scss';
import { selectSortValue, setSortValue } from '../../store/aviasales-slice';

export function TabsTicket() {
  const dispatch = useDispatch();
  const sortValue = useSelector(selectSortValue);

  const handlerChangeSort = (value) => {
    dispatch(setSortValue(value));
  };

  return (
    <div className={styles.tabsTicket}>
      {SORT_OPTIONS_ARRAY.map((option) => {
        return (
          <Tab
            onClick={() => handlerChangeSort(option.value)}
            key={option.value}
            name={option.label}
            isActive={sortValue === option.value}
          />
        );
      })}
    </div>
  );
}
