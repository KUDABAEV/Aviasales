import { getTimeByMinutes, transformDuration } from '../../utils/aviasales-utils';
import styles from './Ticket.module.scss';

function FlightInfo({ title, value }) {
  return (
    <div className={styles.flightInfo}>
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

function Segment({ date, destination, origin, duration, stops }) {
  let per = '';
  switch (stops.length) {
    case 1:
      per = '1 ПЕРЕСАДКА';
      break;
    case 2:
      per = '2 ПЕРЕСАДКИ';
      break;
    case 3:
      per = '3 ПЕРЕСАДКИ';
      break;
    default:
      per = 'ПРЯМОЙ РЕЙС';
      break;
  }

  return (
    <div className={styles.segment}>
      <FlightInfo title={`${origin} - ${destination}`} value={transformDuration(date, duration)} />
      <FlightInfo title="в пути" value={getTimeByMinutes(duration)} />
      <FlightInfo title={per} value={stops.join(', ')} />
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
