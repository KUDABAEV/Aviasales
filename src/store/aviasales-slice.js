/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { BTN_SHOW_MORE_COUNT, SORT_OPTIONS_OBJ } from '../constants/constants';
import { client } from '../api/client';
import { getFastValueTicket, getOptimalValueTicket, transformTicket } from '../utils/aviasales-utils';

const initialState = {
  tickets: [],
  showCountTickets: BTN_SHOW_MORE_COUNT,
  searchId: null,
  isLoading: true,
  sortValue: SORT_OPTIONS_OBJ.noSort.value,
};

export const loadTickets = createAsyncThunk('aviasales/loadTickets', async (_, thunkAPI) => {
  const { getState, dispatch } = thunkAPI; //
  const { isLoading } = getState().aviasales; ///

  if (!isLoading) return;

  dispatch(setIsLoading(true));

  try {
    let { searchId } = getState().aviasales;

    if (!searchId) {
      const answerSearchId = await client.get('https://aviasales-test-api.kata.academy/search');
      searchId = answerSearchId.data.searchId;
      dispatch(setSearchId(searchId));
    }

    const answerTickets = await client.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);

    if (!answerTickets.response.ok) {
      throw new Error('Error loadTickets');
    }

    dispatch(addTickets(transformTicket(answerTickets.data.tickets)));

    if (answerTickets.data.stop) {
      dispatch(setIsLoading(false));
    }
  } finally {
    dispatch(loadTickets());
  }
});

const aviasalesSlice = createSlice({
  name: 'aviasales',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showMoreTickets: (state) => {
      state.showCountTickets += BTN_SHOW_MORE_COUNT;
    },
    addTickets: (state, action) => {
      state.tickets = state.tickets.concat(action.payload);
    },
    setSearchId: (state, action) => {
      state.searchId = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
  },

  selectors: {
    selectTickets: createSelector(
      [(state) => state.tickets, (state) => state.showCountTickets, (state) => state.sortValue],

      (tickets, showTickets, sortValue) => {
        let copyTickets = structuredClone(tickets);

        if (sortValue === SORT_OPTIONS_OBJ.cheapest.value) {
          copyTickets = copyTickets.sort((a, b) => a.price - b.price);
        }

        if (sortValue === SORT_OPTIONS_OBJ.fast.value) {
          copyTickets = copyTickets.sort((a, b) => getFastValueTicket(a) - getFastValueTicket(b));
        }

        if (sortValue === SORT_OPTIONS_OBJ.optimal.value) {
          copyTickets = copyTickets.sort((a, b) => getOptimalValueTicket(a) - getOptimalValueTicket(b));
        }

        return copyTickets.slice(0, showTickets);
      }
    ),
    selectSortValue: (state) => state.sortValue,
    selectTicketsMeta: createSelector(
      (state) => state.isLoading,
      (isLoading) => ({
        isLoading,
      })
    ),
  },
});

export const { addTickets, setSearchId, showMoreTickets, setIsLoading, setSortValue } = aviasalesSlice.actions;

export const { selectTickets, selectTicketsMeta, selectSortValue } = aviasalesSlice.selectors;

export const aviasalesReducer = aviasalesSlice.reducer;
