const removeCartItemFromSession = (idToRemove) => {
    const storedCartItems = sessionStorage.getItem("cartItems");

    if (storedCartItems) {
        let updatedCartItems = JSON.parse(storedCartItems);

        // Find the index of the item to remove based on its ID
        const indexToRemove = updatedCartItems.findIndex(
            (item) => item.id === idToRemove
        );

        if (indexToRemove !== -1) {
            // Remove the item from the cart array
            updatedCartItems.splice(indexToRemove, 1);

            // Update session storage with the modified cart items
            sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        } else {
        }
    } else {
    }
};

export {removeCartItemFromSession};
