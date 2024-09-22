import { FlightInfo } from '../flight-info/FlightInfo';
import styles from './Ticket.module.scss';

export function Ticket({ carrier, price }) {
  return (
    <div className={styles.ticket}>
      <div className={styles.ticketHeader}>
        <p className={styles.ticketPrice}>{price.toLocaleString('ru-RU')} р</p>
        <img className={styles.ticketImage} src={`//pics.avs.io/99/36/${carrier}.png`} alt="S7" />
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
