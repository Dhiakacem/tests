const { createSlice } = require("@reduxjs/toolkit");

export const expenseConfig = createSlice({
  name: "dataSearch",
  initialState: {
    income: 100,
    dataSearch: [],
  },
  reducers: {
    setDataSearch: (state, action) => {
      state.dataSearch = action.payload;
    },
  },
});

export const { setDataSearch } = expenseConfig.actions;
