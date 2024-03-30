// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.name === newItem.name && item.description === newItem.description
      );

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += 1;
      } else {
        state.cart.push({ ...newItem, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((item) => item.name !== action.payload),
      };
    },
    removeAllItems: (state, action) => {
      return {
        ...state,
        cart: [],
      };
    },
  },
});

export const { addToCart, removeFromCart, removeAllItems } = cartSlice.actions;
export default cartSlice.reducer;
