import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../api/client';
import { transformTicket } from '../utils/aviasales-utils';

const initialState = {
  tickets: [],
};

export const loadTickets = createAsyncThunk('aviasales/loadTickets', async () => {
  const answerSearchId = await client.get('https://aviasales-test-api.kata.academy/search');

  // eslint-disable-next-line
  const searchId = answerSearchId.data.searchId;

  const answerTickets = await client.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);

  return transformTicket(answerTickets.data.tickets);
});

const aviasalesSlice = createSlice({
  name: 'aviasales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTickets.fulfilled, (state, action) => {
      // eslint-disable-next-line
      state.tickets = action.payload;
    });
  },
  selectors: {
    selectTickets: (state) => state.tickets,
  },
});

export const { selectTickets } = aviasalesSlice.selectors;

export const aviasalesReducer = aviasalesSlice.reducer;
