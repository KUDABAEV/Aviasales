import styles from './AppLayout.module.scss';

export function AppLayout({ controlsTransplants, tabsTickets, listTickets, buttonMore, message, progress }) {
  return (
    <div className={styles.appLayout}>
      <div className={styles.logo}>
        {progress}
        {message}
      </div>
      <div className={styles.content}>
        <div className={styles.controls}>{controlsTransplants}</div>
        <div className={styles.tabs}>
          <div>{tabsTickets}</div>
          <div>{listTickets}</div>
          <div>{buttonMore}</div>
        </div>
      </div>
    </div>
  );
}
