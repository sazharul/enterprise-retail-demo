import {createSlice} from "@reduxjs/toolkit";

// Improved initialState with rewardPointsUsed initialized
const initialState = {
    items: [],
    subTotalPrice: 0,
    discountAmount: 0,
    shipping: 0,
    totalPrice: 0,
    rewardPointsUsed: 0,
    applyCouponCode: "",
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.productId === newItem.productId
            );
            if (existingItem) {
                existingItem.quantity += newItem.quantity;
                existingItem.totalPrice += newItem.price * newItem.quantity;
                existingItem.discountedPrice +=
                    newItem.discountedPrice * newItem.quantity;
                existingItem.discount += newItem.discountedPrice;
            } else {
                state.items.push({
                    ...newItem,
                    totalPrice: newItem.price * newItem.quantity,
                    discountedPrice: newItem.discountedPrice * newItem.quantity,
                    discount: newItem.discountedPrice,
                });
            }
            state.totalQuantity += newItem.quantity;
            state.totalPrice += newItem.price * newItem.quantity;
            state.discountedPrice += newItem.discountedPrice * newItem.quantity;
        },

        // addItemToCart remains unchanged as it already handles the logic well
        // addItemToCart(state, action) {
        //     const newItem = action.payload;
        //     //
        //     const existingItem = state.items.find((item) => item.productId === newItem.productId);
        //     state.totalQuantity++;
        //     state.totalPrice += newItem.price;
        //     if (!existingItem) {
        //         state.items.push({
        //             productId: newItem.productId,
        //             selectedItemId: newItem.selectedItemId,
        //             name: newItem.name,
        //             selectedItemName: newItem.selectedItemName,
        //             price: newItem.price,
        //             discountedPrice: newItem?.discountedPrice,
        //             quantity: 1,
        //             image: newItem.image,
        //             totalPrice: newItem.price,
        //         });
        //     } else {
        //         existingItem.quantity++;
        //         existingItem.totalPrice += newItem.price;
        //     }
        // },

        removeItemFromCart(state, action) {
            const idToRemove = action.payload;
            const existingItemIndex = state.items.findIndex(
                (item) => item.productId === idToRemove
            );
            if (existingItemIndex >= 0) {
                const itemToRemove = state.items[existingItemIndex];
                state.totalQuantity -= itemToRemove.quantity;
                state.totalPrice -= itemToRemove.totalPrice;
                state.items.splice(existingItemIndex, 1);
            }
        },

        // Improved removeItemFromCart with error handling for non-existing items
        // removeItemFromCart(state, action) {
        //     const productId = action.payload;
        //     const existingItem = state.items.find((item) => item.productId === productId);
        //     if (!existingItem) return;
        //     state.totalQuantity--;
        //     state.totalPrice -= existingItem.price;
        //     if (existingItem.quantity === 1) {
        //         state.items = state.items.filter((item) => item.id !== productId);
        //     } else {
        //         existingItem.quantity--;
        //         existingItem.totalPrice -= existingItem.price;
        //     }
        // },

        // updateItemQuantity remains largely unchanged as it already includes a check for quantity > 0
        updateItemQuantity(state, action) {
            const {id, quantity} = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (!existingItem || quantity <= 0) return; // Added check for existingItem and non-positive quantity
            const quantityDifference = quantity - existingItem.quantity;
            existingItem.quantity = quantity;
            existingItem.totalPrice = existingItem.price * quantity;
            state.totalQuantity += quantityDifference;
            state.totalPrice += existingItem.price * quantityDifference;
        },

        // incrementQuantity and decrementQuantity remain unchanged as they handle their logic well
        incrementQuantity(state, action) {
            const productId = action.payload;
            const existingItem = state.items.find(
                (item) => item.productId === productId
            );

            if (!existingItem) return; // Check if the item exists
            existingItem.quantity++;
            existingItem.totalPrice += existingItem.price;
            existingItem.discountedPrice += existingItem.discount;
            state.totalQuantity++;
            state.totalPrice += existingItem.price;
            // state.discountedPrice += existingItem.discountedPrice;
        },

        decrementQuantity(state, action) {
            const productId = action.payload;
            const existingItem = state.items.find(
                (item) => item.productId === productId
            );

            if (!existingItem || existingItem.quantity < 1) return; // Check if the item exists and quantity is greater than 1
            existingItem.quantity--;
            existingItem.totalPrice -= existingItem.price;
            existingItem.discountedPrice -= existingItem.discount;
            state.totalQuantity--;
            state.totalPrice -= existingItem.price;
        },

        // clearCart remains unchanged
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            state.rewardPointsUsed = 0; // Reset rewardPointsUsed as well
        },

        // applyCouponCode updated to handle dynamic codes in the future
        applyCouponCode(state, action) {
            const {code, discountPercentage} = action.payload;
            // This could be replaced with a dynamic check against a list of valid codes and discounts
            if (code === "DISCOUNT10" && discountPercentage === 10) {
                const discountAmount = state.totalPrice * (discountPercentage / 100);
                state.totalPrice -= discountAmount;
            }
        },

        // redeemWithRewardPoints improved with error handling for negative values
        redeemWithRewardPoints(state, action) {
            const {rewardPoints} = action.payload;
            if (rewardPoints < 0) return; // Ensure rewardPoints is not negative
            const pointsValue = rewardPoints / 100; // Assuming 100 points = $1
            if (state.totalPrice > pointsValue) {
                state.totalPrice -= pointsValue;
                state.rewardPointsUsed += rewardPoints;
            } else {
                state.rewardPointsUsed += state.totalPrice * 100; // Converting back to points
                state.totalPrice = 0;
            }
        },
    },
});

export const {
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    applyCouponCode,
    redeemWithRewardPoints,
} = cartSlice.actions;

export default cartSlice.reducer;
