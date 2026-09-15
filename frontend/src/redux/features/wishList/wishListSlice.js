import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        // addItemToWishList(state, action) {
        //     const newItem = action.payload;
        //     const existingItem = state.items.find((item) => item.id === newItem.id);
        //     if (!existingItem) {
        //         state.items.push({
        //             id: newItem.id,
        //             name: newItem.name,
        //             price: newItem.price,
        //         });
        //     }
        // },
        addItemToWishList(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.productId === newItem.productId);
            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    totalPrice: newItem.price * newItem.quantity,
                    discountedPrice: newItem.discountedPrice * newItem.quantity,
                    discount: newItem.discountedPrice,
                });
            }
        },
        removeItemFromWishList(state, action) {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.productId !== productId);
        },
        // removeItemFromCart(state, action) {
        //     const idToRemove = action.payload;
        //     const existingItemIndex = state.items.findIndex((item) => item.productId === idToRemove);
        //     if (existingItemIndex >= 0) {
        //         const itemToRemove = state.items[existingItemIndex];
        //         state.totalQuantity -= itemToRemove.quantity;
        //         state.totalPrice -= itemToRemove.totalPrice;
        //         state.items.splice(existingItemIndex, 1);
        //     }
        // },

        clearWishList(state) {
            state.items = [];
        },
        moveItemToCart(state, action) {
            const id = action.payload;
            const itemToMove = state.items.find((item) => item.id === id);
            if (itemToMove) {
                state.items = state.items.filter((item) => item.id !== id);
                // Assuming there's a way to access cartSlice actions from here, pseudo code:
                // cartSlice.actions.addItemToCart(itemToMove);
                // Note: Actual implementation requires dispatching this action in the component or middleware
            }
        },
    },
});

export const {addItemToWishList, removeItemFromWishList, clearWishList} = wishListSlice.actions;

export default wishListSlice.reducer;
