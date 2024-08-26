import { Checkbox } from '../checkbox/Checkbox';
import styles from './ControlTransplants.module.scss';

export function ControlTransplants() {
  return (
    <div className={styles.controlTransplants}>
      <h3 className={styles.title}>Количество пересадок</h3>
      <Checkbox text="Все" />
      <Checkbox text="Без пересадок" checked={true} />
      <Checkbox text="1 пересадка" checked={true} />
      <Checkbox text="2 пересадки" checked={true} />
      <Checkbox text="3 пересадки" checked={true} />
    </div>
  );
}
