import styles from './AppLayout.module.scss';

export function AppLayout({ controlsTransplants, tabsTickets, listTickets, buttonMore }) {
  return (
    <div>
      <div className={styles.logo}>Logo</div>
      <div>
        <div>{controlsTransplants}</div>
        <div>
          <div>{tabsTickets}</div>
          <div>{listTickets}</div>
          <div>{buttonMore}</div>
        </div>
      </div>
    </div>
  );
}
