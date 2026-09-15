function cartTotalPrice(array) {
    let totalPrice = 0;
    for (let i = 0; i < array?.length; i++) {
        const currentItem = array?.[i];
        if (currentItem?.combo_product === null) {
            totalPrice += parseFloat(currentItem?.price) * parseInt(currentItem?.quantity);
        } else {
            totalPrice += parseFloat(currentItem?.combo_product?.discounted_price) * parseInt(currentItem?.quantity);
        }
    }

    return totalPrice;
}

function cartTotalDiscountPrice(array) {
    let totalPrice = 0;

    for (let i = 0; i < array?.length; i++) {
        const currentItem = array?.[i];
        if (currentItem?.combo_product === null) {
            totalPrice +=
                (parseFloat(currentItem?.price) - parseFloat(currentItem?.discounted_price)) * parseInt(currentItem?.quantity);
        }
    }
    return totalPrice;
}

export {cartTotalPrice, cartTotalDiscountPrice};
