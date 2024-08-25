export function Checkbox({ text, checked, onChange = () => {} }) {
  return (
    <div>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <p>{text}</p>
    </div>
  );
}
