import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { Ticket } from '../ticket/Ticket';
import styles from './ListTickets.module.scss';
import { loadTickets, selectTickets, selectTicketCount } from '../../store/aviasales-slice';
import { Info } from '../info/Info';

export function ListTickets() {
  const dispatch = useDispatch();

  const tickets = useSelector(selectTickets);
  const countTickets = useSelector(selectTicketCount);
  const isNoData = countTickets > 0 && tickets.length === 0;

  //  eslint-disable-next-line
  const debounceLoadTickets = useCallback(
    debounce(() => dispatch(loadTickets()), 1000),
    []
  );

  useEffect(() => {
    debounceLoadTickets();
    // eslint-disable-next-line
  }, []);
  return (
    <ul className={styles.listTickets}>
      {isNoData && <Info message="Рейсов, подходящих под заданные фильтры, не найдено" type="warning" />}
      {tickets.map((ticket) => {
        return <Ticket key={ticket.id} {...ticket} />;
      })}
    </ul>
  );
}
