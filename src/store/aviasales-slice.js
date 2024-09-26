/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { BTN_SHOW_MORE_COUNT } from '../constants/constants';
import { client } from '../api/client';
import { transformTicket } from '../utils/aviasales-utils';

const initialState = {
  tickets: [],
  showCountTickets: BTN_SHOW_MORE_COUNT,
  searchId: null,
  isLoading: true,
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
  },

  selectors: {
    selectTickets: createSelector(
      [(state) => state.tickets, (state) => state.showCountTickets],

      (tickets, showTickets) => tickets.slice(0, showTickets)
    ),
    selectTicketsMeta: createSelector(
      (state) => state.isLoading,
      (isLoading) => ({
        isLoading,
      })
    ),
  },
});

export const { addTickets, setSearchId, showMoreTickets, setIsLoading } = aviasalesSlice.actions;

export const { selectTickets, selectTicketsMeta } = aviasalesSlice.selectors;

export const aviasalesReducer = aviasalesSlice.reducer;
