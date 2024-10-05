import { useDispatch, useSelector } from 'react-redux';
import { BTN_SHOW_MORE_COUNT } from '../../constants/constants';
import { AppLayout } from '../app-layout/AppLayout';
import { Button } from '../button/Button';
import { ControlTransplants } from '../control-transplants/ControlTransplants';
import { ListTickets } from '../list-tickets/ListTickets';
import { TabsTicket } from '../tabs-ticket/TabsTicket';
import { selectTickets, selectTicketsMeta, showMoreTickets } from '../../store/aviasales-slice';
import { Info } from '../info/Info';
import { Spinner } from '../spinner/Spinner';

export function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectTicketsMeta);
  const countTickets = useSelector(selectTickets).length;

  const showMore = () => {
    dispatch(showMoreTickets());
  };

  return (
    <AppLayout
      progress={isLoading ? <Spinner /> : <img src="/src/assets/Logo.svg" alt="logo" />}
      message={
        <Info
          message={isLoading ? 'Билеты загружаются' : 'Билеты загрузились'}
          type={!isLoading ? 'success' : 'warning'}
        />
      }
      controlsTransplants={<ControlTransplants />}
      tabsTickets={<TabsTicket />}
      listTickets={<ListTickets />}
      buttonMore={
        countTickets > 0 && <Button text={`Показать еще ${BTN_SHOW_MORE_COUNT} билетов!`} onClick={showMore} />
      }
    />
  );
}
