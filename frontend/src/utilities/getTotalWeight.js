const getTotalWeight = () => {
    // Retrieve cart items from sessionStorage
    const cartItems = sessionStorage.getItem("cartItems");

    if (cartItems) {
        const items = JSON.parse(cartItems);

        // Calculate total amount
        const totalWeight = items.reduce((updated_weight, currentItem) => {
            return updated_weight + currentItem.updated_weight; // Assuming each item has a 'price' property
        }, 0);

        return totalWeight;
    }

    return 0; // Return 0 if there are no items in the cart
};

export {getTotalWeight};
  