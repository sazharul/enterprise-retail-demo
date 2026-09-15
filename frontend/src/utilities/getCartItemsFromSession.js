const getCartItemsFromSession = () => {
    const storedCartItems = sessionStorage.getItem('cartItems');

    if (storedCartItems) {
        return JSON.parse(storedCartItems);
    } else {
        return [];
    }
};

export {getCartItemsFromSession};