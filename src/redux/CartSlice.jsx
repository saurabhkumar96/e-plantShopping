import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Add Item
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice += action.payload.price;
      }

      state.totalAmount += action.payload.price;
    },

    // ✅ Remove Item completely
    removeItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (!item) return;

      state.totalQuantity -= item.quantity;
      state.totalAmount -= item.totalPrice;

      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    // ✅ Update Quantity (increase / decrease)
    updateQuantity: (state, action) => {
      const { id, type } = action.payload; // type = "inc" | "dec"
      const item = state.items.find((i) => i.id === id);

      if (!item) return;

      if (type === "inc") {
        item.quantity += 1;
        item.totalPrice += item.price;
        state.totalQuantity += 1;
        state.totalAmount += item.price;
      }

      if (type === "dec") {
        if (item.quantity === 1) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.quantity -= 1;
          item.totalPrice -= item.price;
        }

        state.totalQuantity -= 1;
        state.totalAmount -= item.price;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;