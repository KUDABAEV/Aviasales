/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { BTN_SHOW_MORE_COUNT, FILTER_OPTIONS_DEFAULT, SORT_OPTIONS_OBJ } from '../constants/constants';
import { client } from '../api/client';
import { getSelectedTickets, getUpdateFilterOptions, transformTicket } from '../utils/aviasales-utils';

const initialState = {
  tickets: [],
  showCountTickets: BTN_SHOW_MORE_COUNT,
  searchId: null,
  isLoading: true,
  sortValue: SORT_OPTIONS_OBJ.noSort.value,
  filterOptions: FILTER_OPTIONS_DEFAULT,
};

export const loadTickets = createAsyncThunk('aviasales/loadTickets', async (_, thunkAPI) => {
  const { getState, dispatch } = thunkAPI;
  const { isLoading } = getState().aviasales;

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
    updateFilter: (state, action) => {
      state.filterOptions = getUpdateFilterOptions(state.filterOptions, action.payload);
    },
  },

  selectors: {
    selectTickets: createSelector(
      [
        (state) => state.tickets,
        (state) => state.showCountTickets,
        (state) => state.sortValue,
        (state) => state.filterOptions,
      ],
      getSelectedTickets
    ),
    selectSortValue: (state) => state.sortValue,
    selectTicketsMeta: createSelector(
      (state) => state.isLoading,
      (isLoading) => ({
        isLoading,
      })
    ),
    selectFilterOptions: (state) => state.filterOptions,
    selectTicketCount: (state) => state.tickets.length,
  },
});

export const { addTickets, setSearchId, showMoreTickets, setIsLoading, setSortValue, updateFilter } =
  aviasalesSlice.actions;

export const { selectTickets, selectTicketsMeta, selectSortValue, selectFilterOptions, selectTicketCount } =
  aviasalesSlice.selectors;

export const aviasalesReducer = aviasalesSlice.reducer;
