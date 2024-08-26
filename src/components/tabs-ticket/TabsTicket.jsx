import { Tab } from '../tab/Tab';
import styles from './TabsTicket.module.scss';

export function TabsTicket() {
  return (
    <div className={styles.tabsTicket}>
      <Tab name={'Самый дешевый'} />
      <Tab name={'Самый быстрый'} />
      <Tab name={'Оптимальный'} />
    </div>
  );
}
