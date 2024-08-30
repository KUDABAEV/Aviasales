import { FlightInfo } from '../flight-info/FlightInfo';
import styles from './Ticket.module.scss';

export function Ticket() {
  return (
    <div className={styles.ticket}>
      <div className={styles.ticketHeader}>
        <p className={styles.ticketPrice}>{13400} р</p>
        <img className={styles.ticketImage} src="/src/assets/S7.svg" alt="S7" />
      </div>
      <div className={styles.ticketItems}>
        <FlightInfo road="MOW – HKT" time="10:45 – 08:00" />
        <FlightInfo road="В пути" time="21ч 15м" />
        <FlightInfo road="2 пересадки" time="HKG, JNB" />
        <FlightInfo road="MOW – HKT" time="11:20 – 00:50" />
        <FlightInfo road="В пути" time="13ч 30м" />
        <FlightInfo road="1 пересадка" time="HKG" />
      </div>
    </div>
  );
}
