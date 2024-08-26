import styles from './Tab.module.scss';

export function Tab({ name, onClick }) {
  return (
    <button className={styles.tab} onClick={onClick}>
      {name}
    </button>
  );
}
