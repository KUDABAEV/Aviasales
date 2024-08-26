import styles from './FlightInfo.module.scss';

export function FlightInfo({ road, time }) {
  return (
    <div className={styles.flightInfo}>
      <span className={styles.road}>{road}</span>
      <span className={styles.time}>{time}</span>
    </div>
  );
}
