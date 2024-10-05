import { nanoid } from '@reduxjs/toolkit';
import { FILTER_OPTIONS_OBJ, SORT_OPTIONS_OBJ } from '../constants/constants';

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

export function getTimeByMinutes(minutesCount) {
  const hours = Math.floor(minutesCount / 60);
  const minutes = minutesCount - hours * 60;
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');

  return `${hoursStr}ч ${minutesStr}м`;
}

export function getFastValueTicket(ticket) {
  return ticket.segments[0].duration + ticket.segments[1].duration;
}

export function getOptimalValueTicket(ticket) {
  return ticket.price / ticket.segments[0].duration + ticket.segments[1].duration;
}

export function getUpdateFilterOptions(options, changeOption) {
  const updateOptions = { ...options };
  updateOptions[changeOption] = !updateOptions[changeOption]; // true

  let isAllTrue = true;

  if (changeOption === FILTER_OPTIONS_OBJ.all.value) {
    for (const key in updateOptions) {
      updateOptions[key] = updateOptions[changeOption];
    }
  }

  for (const key in updateOptions) {
    if (key === FILTER_OPTIONS_OBJ.all.value) continue;

    if (!updateOptions[key]) {
      isAllTrue = false;
    }
  }

  if (isAllTrue) {
    updateOptions[FILTER_OPTIONS_OBJ.all.value] = true;
  } else {
    updateOptions[FILTER_OPTIONS_OBJ.all.value] = false;
  }

  return updateOptions;
}

export function getSortedTicket(tickets, sortValue) {
  let result = tickets;

  if (sortValue === SORT_OPTIONS_OBJ.cheapest.value) {
    result = result.sort((a, b) => a.price - b.price);
  }

  if (sortValue === SORT_OPTIONS_OBJ.fast.value) {
    result = result.sort((a, b) => getFastValueTicket(a) - getFastValueTicket(b));
  }

  if (sortValue === SORT_OPTIONS_OBJ.optimal.value) {
    result = result.sort((a, b) => getOptimalValueTicket(a) - getOptimalValueTicket(b));
  }

  return result;
}

export function getFilteredTickets(tickets, currentOptions) {
  const result = [];

  tickets.forEach((ticket) => {
    const steps = Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length);

    if (
      (currentOptions[0] && steps === 0) ||
      (currentOptions[1] && steps === 1) ||
      (currentOptions[2] && steps === 2) ||
      (currentOptions[3] && steps === 3)
    ) {
      result.push(ticket);
    }
  });

  return result;
}

export function getSelectedTickets(tickets, showTickets, sortValue, filterOptions) {
  let copyTickets = structuredClone(tickets);

  if (!filterOptions[FILTER_OPTIONS_OBJ.all.value]) {
    copyTickets = getFilteredTickets(tickets, filterOptions);
  }

  if (sortValue !== SORT_OPTIONS_OBJ.noSort) {
    copyTickets = getSortedTicket(copyTickets, sortValue);
  }

  return copyTickets.slice(0, showTickets);
}
