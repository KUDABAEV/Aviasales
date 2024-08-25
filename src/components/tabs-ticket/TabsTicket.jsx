function Tab({ name, onClick }) {
  return <button onClick={onClick}>{name}</button>;
}

export function TabsTicket() {
  return (
    <div>
      <Tab name={'Tab 1'} />
      <Tab name={'Tab 2'} />
      <Tab name={'Tab 3'} />
    </div>
  );
}
