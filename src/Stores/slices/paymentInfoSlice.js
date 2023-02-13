import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  paymentInfo: null,
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

export const {updatePaymenInfo} = paymenInfoSlice.actions;

export default paymenInfoSlice.reducer;
