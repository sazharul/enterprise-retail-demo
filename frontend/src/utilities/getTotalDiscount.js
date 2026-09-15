const getTotalDiscount = () => {
    // Retrieve cart items from sessionStorage
    const cartItems = sessionStorage.getItem("cartItems");

    if (cartItems) {
        const items = JSON.parse(cartItems);

        // Calculate total amount
        const totalDiscount = items.reduce((discounted_amount, currentItem) => {
            return discounted_amount + currentItem.discounted_amount;
        }, 0);

        return totalDiscount;
    }

    return 0;
};

export {getTotalDiscount};
  