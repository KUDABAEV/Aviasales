import styles from './Checkbox.module.scss';

export function Checkbox({ text, checked, onChange = () => {} }) {
  return (
    <label className={styles.checkbox}>
      <input className={styles.checkboxInput} type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.checkboxIcon}></span>
      {text}
    </label>
  );
}
