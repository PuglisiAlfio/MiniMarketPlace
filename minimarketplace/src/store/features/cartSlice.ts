import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  product_id: number;
  qnt: number;
}

interface CartState {
  items: CartItem[];
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { product_id, qnt } = action.payload;
      const index = state.items.findIndex(item => item.product_id === product_id);
      if (index !== -1) {
        state.items[index].qnt += qnt;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const { product_id } = action.payload;
      const index = state.items.findIndex(item => item.product_id === product_id);
      if (index !== -1) {
        if (state.items[index].qnt === 1) {
          state.items.splice(index, 1);
        } else {
          state.items[index].qnt -= 1;
        }
      }
    },
    updateCart: (state, action: PayloadAction<CartItem>) => {
      const { product_id, ...productInfo } = action.payload;
      const index = state.items.findIndex(item => item.product_id === product_id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...productInfo };
      }
    }
  }
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;