import clsx from 'clsx';

import style from './Info.module.scss';

export function Info({ message, type = 'success' }) {
  return (
    <p
      className={clsx(
        style.info,
        {
          success: style.success,
          warning: style.warning,
        }[type]
      )}
    >
      {message}
    </p>
  );
}
