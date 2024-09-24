import { transformDuration } from '../../utils/aviasales-utils';
import styles from './Ticket.module.scss';

function FlightInfo({ title, value }) {
  return (
    <div className={styles.flightInfo}>
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

function Segment({ date, destination, origin, duration }) {
  return (
    <div className={styles.segment}>
      <FlightInfo title={`${origin} - ${destination}`} value={transformDuration(date, duration)} />
      <FlightInfo title="в пути" value="21ч 55м" />
      <FlightInfo title="2 пересадки" value="fvferdvaer" />
    </div>
  );
}

export function Ticket({ carrier, price, segments }) {
  return (
    <div className={styles.ticket}>
      <div className={styles.ticketHeader}>
        <p className={styles.ticketPrice}>{price.toLocaleString('ru-RU')} р</p>
        <img className={styles.ticketImage} src={`//pics.avs.io/99/36/${carrier}.png`} alt="S7" />
      </div>
      <div className={styles.ticketItems}>
        {segments.map((segment) => {
          return <Segment key={JSON.stringify(segment)} {...segment} />;
        })}
      </div>
    </div>
  );
}
