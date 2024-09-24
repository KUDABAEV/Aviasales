import { nanoid } from '@reduxjs/toolkit';

export function formatTime(date) {
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function transformDuration(data, duration) {
  const startDate = new Date(data);

  const startDateMs = startDate.getTime();
  const durationMs = duration * 60000;
  const endDateMs = startDateMs + durationMs;

  const endDate = new Date(endDateMs);

  return `${formatTime(startDate)} - ${formatTime(endDate)}`;
}

export function transformTicket(list) {
  return list.map((ticket) => {
    return {
      ...ticket,
      id: nanoid(),
    };
  });
}
