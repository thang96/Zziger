import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  paymentInfo: 'paymentInfo',
};
export const paymenInfoSlice = createSlice({
  name: 'paymentInfo',
  initialState,
  reducers: {
    updatePaymenInfo: (state, actions) => {
      state.paymentInfo = actions.payload;
    },
  },
});

export const {updateToken} = paymenInfoSlice.actions;

export default paymenInfoSlice.reducer;
