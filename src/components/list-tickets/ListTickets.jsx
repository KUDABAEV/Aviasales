import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { Ticket } from '../ticket/Ticket';
import styles from './ListTickets.module.scss';
import { loadTickets, selectTickets } from '../../store/aviasales-slice';

export function ListTickets() {
  const dispatch = useDispatch();

  const tickets = useSelector(selectTickets);

  const debounceLoadTickets = useCallback(
    debounce(() => dispatch(loadTickets()), 1000),
    []
  );
  console.log(tickets);

  useEffect(() => {
    debounceLoadTickets();
  }, []);
  return (
    <ul className={styles.listTickets}>
      {tickets.map((ticket) => {
        return <Ticket key={ticket.id} {...ticket} />;
      })}
    </ul>
  );
}
