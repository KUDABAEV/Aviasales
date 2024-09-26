/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../api/client';
import { transformTicket } from '../utils/aviasales-utils';

const initialState = {
  tickets: [],
  searchId: null,
  isDone: false,
};

export const loadTickets = createAsyncThunk('aviasales/loadTickets', async (_, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;

  let { searchId } = getState().aviasales;
  const { isDone } = getState().aviasales;

  if (isDone) {
    return;
  }

  if (!searchId) {
    const answerSearchId = await client.get('https://aviasales-test-api.kata.academy/search');
    searchId = answerSearchId.data.searchId;
    dispatch(setSearchId(answerSearchId.data.searchId));
  }

  const answerTickets = await client.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);

  if (!answerTickets.err) {
    dispatch(addTickets(transformTicket(answerTickets.data.tickets)));
  } else {
    dispatch(loadTickets());
    return;
  }

  if (answerTickets.data.stop) {
    dispatch(changeIsDone(true));
  } else {
    dispatch(loadTickets());
  }
});

const aviasalesSlice = createSlice({
  name: 'aviasales',
  initialState,
  reducers: {
    addTickets: (state, action) => {
      state.tickets = state.tickets.concat(action.payload);
    },
    setSearchId: (state, action) => {
      state.searchId = action.payload;
    },
    changeIsDone: (state, action) => {
      state.isDone = action.payload;
    },
  },

  selectors: {
    selectTickets: (state) => state.tickets,
  },
});

export const { addTickets, setSearchId } = aviasalesSlice.actions;

export const { selectTickets } = aviasalesSlice.selectors;

export const aviasalesReducer = aviasalesSlice.reducer;
