import { Checkbox } from '../checkbox/Checkbox';

export function ControlTransplants() {
  return (
    <div>
      Управление пересадкой
      <Checkbox text="check 1" checked={true} />
      <Checkbox text="check 2" checked={true} />
      <Checkbox text="check 3" checked={true} />
    </div>
  );
}
