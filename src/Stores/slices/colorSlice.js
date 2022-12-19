import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  colorStore: [
    {
      key: 'default',
      value: null,
    },
    {
      key: 'aliceblue',
      value: '#f0f8ff',
    },
    {
      key: 'antiquewhite',
      value: `#faebd7`,
    },
    {
      key: 'aqua',
      value: `#00ffff`,
    },
    {
      key: 'aquamarine',
      value: `#7fffd4`,
    },
    {
      key: 'azure',
      value: `#f0ffff`,
    },
    {
      key: 'beige',
      value: `#f5f5dc`,
    },
    {
      key: 'bisque',
      value: `#ffe4c4`,
    },
    {
      key: 'black',
      value: `#000000`,
    },
    {
      key: 'blanchedalmond',
      value: `#ffebcd`,
    },
    {
      key: 'blue',
      value: `#0000ff`,
    },
    {
      key: 'blueviolet',
      value: `#8a2be2`,
    },
    {
      key: 'brown',
      value: `#a52a2a`,
    },
    {
      key: 'burlywood',
      value: `#deb887`,
    },
    {
      key: 'cadetblue',
      value: `#5f9ea0`,
    },
    {
      key: 'chartreuse',
      value: `#7fff00`,
    },
    {
      key: 'chocolate',
      value: `#d2691e`,
    },
    {
      key: 'coral',
      value: `#ff7f50`,
    },
    {
      key: 'cornflowerblue',
      value: `#6495ed`,
    },
    {
      key: 'cornsilk',
      value: `#fff8dc`,
    },
    {
      key: 'crimson',
      value: `#dc143c`,
    },
    {
      key: 'cyan',
      value: `#00ffff`,
    },
    {
      key: 'darkblue',
      value: `#00008b`,
    },
    {
      key: 'darkcyan',
      value: `#008b8b`,
    },
    {
      key: 'darkgoldenrod',
      value: `#b8860b`,
    },
    {
      key: 'darkgray',
      value: `#a9a9a9`,
    },
    {
      key: 'darkgreen',
      value: `#006400`,
    },
    {
      key: 'darkgrey',
      value: `#a9a9a9`,
    },
    {
      key: 'darkkhaki',
      value: `#bdb76b`,
    },
    {
      key: 'darkmagenta',
      value: `#8b008b`,
    },
    {
      key: 'darkolivegreen',
      value: `#556b2f`,
    },
    {
      key: 'darkorange',
      value: `#ff8c00`,
    },
    {
      key: 'darkorchid',
      value: `#9932cc`,
    },
    {
      key: 'darkred',
      value: `#8b0000`,
    },
    {
      key: 'darksalmon',
      value: `#e9967a`,
    },
    {
      key: 'darkseagreen',
      value: `#8fbc8f`,
    },
    {
      key: 'darkslateblue',
      value: `#483d8b`,
    },
    {
      key: 'darkslategrey',
      value: `#2f4f4f`,
    },
    {
      key: 'darkturquoise',
      value: `#00ced1`,
    },
    {
      key: 'darkviolet',
      value: `#9400d3`,
    },
    {
      key: 'deeppink',
      value: `#ff1493`,
    },
    {
      key: 'deepskyblue',
      value: `#00bfff`,
    },
    {
      key: 'dimgray',
      value: `#696969`,
    },
    {
      key: 'dimgrey',
      value: `#696969`,
    },
    {
      key: 'dodgerblue',
      value: `#1e90ff`,
    },
    {
      key: 'firebrick',
      value: `#b22222`,
    },
    {
      key: 'floralwhite',
      value: `#fffaf0`,
    },
    {
      key: 'forestgreen',
      value: `#228b22`,
    },
    {
      key: 'fuchsia',
      value: `#ff00ff`,
    },
    {
      key: 'gainsboro',
      value: `#dcdcdc`,
    },
    {
      key: 'ghostwhite',
      value: `#f8f8ff`,
    },
    {
      key: 'gold',
      value: `#ffd700`,
    },
    {
      key: 'goldenrod',
      value: `#daa520`,
    },
    {
      key: 'gray',
      value: `#808080`,
    },
    {
      key: 'green',
      value: `#008000`,
    },
    {
      key: 'greenyellow',
      value: `#adff2f`,
    },
    {
      key: 'grey',
      value: `#808080`,
    },
    {
      key: 'honeydew',
      value: `#f0fff0`,
    },
    {
      key: 'hotpink',
      value: `#ff69b4`,
    },
    {
      key: 'indianred',
      value: `#cd5c5c`,
    },
    {
      key: 'indigo',
      value: `#4b0082`,
    },
    {
      key: 'ivory',
      value: `#fffff0`,
    },
    {
      key: 'khaki',
      value: `#f0e68c`,
    },
    {
      key: 'lavender',
      value: `#e6e6fa`,
    },
    {
      key: 'lavenderblush',
      value: `#fff0f5`,
    },
    {
      key: 'lawngreen',
      value: `#7cfc00`,
    },
    {
      key: 'lemonchiffon',
      value: `#fffacd`,
    },
    {
      key: 'lightblue',
      value: `#add8e6`,
    },
    {
      key: 'lightcoral',
      value: `#f08080`,
    },
  ],
};

export const colorStoreSlice = createSlice({
  name: 'colorStore',
  initialState,
  reducers: {
    addNewColor: (state, actions) => {
      state.colorStore.push(actions.payload);
      // state.colorStore = [...current(state.colorStore), actions.payload];
    },
  },
});

export const {addNewColor} = colorStoreSlice.actions;

export const colorStore = state => state.color.colorStore;

export default colorStoreSlice.reducer;
