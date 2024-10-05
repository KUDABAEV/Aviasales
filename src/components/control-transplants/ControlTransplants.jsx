import { useDispatch, useSelector } from 'react-redux';
import { FILTER_OPTIONS_ARRAY } from '../../constants/constants';
import { Checkbox } from '../checkbox/Checkbox';
import styles from './ControlTransplants.module.scss';
import { selectFilterOptions, updateFilter } from '../../store/aviasales-slice';

export function ControlTransplants() {
  const dispatch = useDispatch();
  const currentFilters = useSelector(selectFilterOptions);

  const handleChangeFilter = (value) => {
    dispatch(updateFilter(value));
  };

  return (
    <div className={styles.controlTransplants}>
      <h3 className={styles.title}>Количество пересадок</h3>
      {FILTER_OPTIONS_ARRAY.map((check) => {
        return (
          <Checkbox
            onChange={() => handleChangeFilter(check.value)}
            key={check.value}
            text={check.label}
            checked={currentFilters[check.value]}
          />
        );
      })}
    </div>
  );
}
