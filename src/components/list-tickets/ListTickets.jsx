import { Ticket } from '../ticket/Ticket';
import styles from './ListTickets.module.scss';

export function ListTickets() {
  return (
    <div className={styles.listTickets}>
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
    </div>
  );
}
