import styles from './Button.module.scss';

export function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
}
