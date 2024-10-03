import { clsx } from 'clsx';
import styles from './Tab.module.scss';

export function Tab({ name, onClick, isActive = false }) {
  return (
    <button className={clsx(styles.tab, isActive && styles.tabActive)} onClick={onClick}>
      {name}
    </button>
  );
}
