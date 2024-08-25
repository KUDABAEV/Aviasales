import { AppLayout } from '../app-layout/AppLayout';
import { Button } from '../button/Button';
import { ControlTransplants } from '../control-transplants/ControlTransplants';
import { ListTickets } from '../list-tickets/ListTickets';
import { TabsTicket } from '../tabs-ticket/TabsTicket';

export function App() {
  return (
    <AppLayout
      controlsTransplants={<ControlTransplants />}
      tabsTickets={<TabsTicket />}
      listTickets={<ListTickets />}
      buttonMore={<Button />}
    />
  );
}
