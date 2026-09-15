const getTotalAmount = () => {
    // Retrieve cart items from sessionStorage
    const cartItems = sessionStorage.getItem("cartItems");

    if (cartItems) {
        const items = JSON.parse(cartItems);

        // Calculate total amount
        const totalAmount = items.reduce((totalAmount, currentItem) => {
            return totalAmount + currentItem.totalAmount; // Assuming each item has a 'price' property
        }, 0);

        return totalAmount;
    }

    return 0; // Return 0 if there are no items in the cart
};

export {getTotalAmount};
  