import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  frontCard: null,
  shareCard: null,
  backOfCard: null,
  backgroundFront: [],
  backgroundBack: [],
  valuesFront: [],
  valuesBack: [],
};
export const cardValuesSlice = createSlice({
  name: 'cardValuesSlice',
  initialState,
  reducers: {
    addFrontCard: (state, actions) => {
      state.frontCard = actions.payload;
    },
    addBackgroundFront: (state, actions) => {
      state.backgroundFront = actions.payload;
    },
    addBackgroundBack: (state, actions) => {
      state.backgroundBack = actions.payload;
    },
    addValuesFront: (state, actions) => {
      state.valuesFront = actions.payload;
    },
    addValuesBack: (state, actions) => {
      state.valuesBack = actions.payload;
    },
    updateBackgroundFront: (state, actions) => {
      const newResource = [...current(state.backgroundFront)];
      newResource[actions.payload.index] = actions.payload.item;
      state.backgroundFront = newResource;
    },
    updateBackgroundBack: (state, actions) => {
      const newResource = [...current(state.backgroundBack)];
      newResource[actions.payload.index] = actions.payload.item;
      state.backgroundBack = newResource;
    },
    updateValuesFront: (state, actions) => {
      const newResource = [...current(state.valuesFront)];
      newResource[actions.payload.index] = actions.payload.itemChange;
      state.valuesFront = newResource;
    },
    updateValuesBack: (state, actions) => {
      const newResource = [...current(state.valuesBack)];
      newResource[actions.payload.index] = actions.payload.item;
      state.valuesBack = newResource;
    },
    removeBackgroundFront: (state, actions) => {
      const newResource = [...current(state.backgroundFront)];
      const indexSelected = newResource.findIndex(
        item => item.id === actions?.payload,
      );
      newResource.splice(indexSelected, 1);
      state.backgroundFront = newResource;
    },
    removeBackgroundBack: (state, actions) => {
      const newResource = [...current(state.backgroundBack)];
      const indexSelected = newResource.findIndex(
        item => item.id === actions?.payload,
      );
      newResource.splice(indexSelected, 1);
      state.backgroundBack = newResource;
    },
    removeValuesFront: (state, actions) => {
      const newResource = [...current(state.valuesFront)];
      const indexSelected = newResource.findIndex(
        item => item.id === actions?.payload,
      );
      newResource.splice(indexSelected, 1);
      state.valuesFront = newResource;
    },
    removeValuesBack: (state, actions) => {
      const newResource = [...current(state.valuesBack)];
      const indexSelected = newResource.findIndex(
        item => item.id === actions?.payload,
      );
      newResource.splice(indexSelected, 1);
      state.valuesBack = newResource;
    },
  },
});

export const {
  addFrontCard,
  addBackgroundFront,
  addBackgroundBack,
  addValuesFront,
  addValuesBack,
  updateBackgroundFront,
  updateBackgroundBack,
  updateValuesFront,
  updateValuesBack,
  removeBackgroundFront,
  removeBackgroundBack,
  removeValuesFront,
  removeValuesBack,
} = cardValuesSlice.actions;

export default cardValuesSlice.reducer;
