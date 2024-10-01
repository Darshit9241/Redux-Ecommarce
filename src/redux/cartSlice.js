import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
    totalPrice: 0,  
  },
  reducers: {
    addItem: (state, action) => {
      const { id, price, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id);
      
      if (existingItemIndex >= 0) {
         const existingItem = state.items[existingItemIndex];
        state.totalPrice += (quantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = quantity;
      } else {
         state.items.push(action.payload);
        state.totalPrice += price * quantity;
      }
    },
    removeItem: (state, action) => {
      const { index } = action.payload;
      const item = state.items[index];
      if (item) {
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(index, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      const item = state.items[index];
      if (item && quantity > 0) {
        state.totalPrice += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
      }
    },
    incrementQuantity: (state, action) => {
      const { index } = action.payload;
      const item = state.items[index];
      if (item) {
        item.quantity += 1;
        state.totalPrice += item.price;
      }
    },
    decrementQuantity: (state, action) => {
      const { index } = action.payload;
      const item = state.items[index];
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalPrice -= item.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, incrementQuantity, decrementQuantity,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
