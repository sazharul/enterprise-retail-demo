function checkCart(cartListData, selectedProduct) {
    for (let element of cartListData) {
        if (element.product !== null && element?.product_id == selectedProduct?.product_id && (element.product.variation_type == "shade" ? element.shade_id == selectedProduct.shade_id : element.size_id == selectedProduct.size_id)) {
            return element;
        }
    }
    return null;
}

function checkComboCart(cartListData, selectedProduct) {
    for (let element of cartListData) {
        // 
        if (element?.combo_product !== null && element?.combo_product.id == selectedProduct?.combo_product_id && element?.combo_info?.length == selectedProduct?.combo_info?.length) {
            let checkData = [];
            for (let i = 0; i < element?.combo_info?.length; i++) {
                if (element.combo_info[i].shade !== null && element.combo_info[i].shade?.id == selectedProduct?.combo_info?.[i]?.shade_id) {
                    checkData.push(true);
                } else if (element.combo_info[i].size !== null && element.combo_info[i].size?.id == selectedProduct?.combo_info?.[i]?.size_id) {
                    checkData.push(true);
                } else {
                    checkData.push(false);
                }
            }
            // 
            if (!checkData.includes(false)) {
                return element;
            }
        }
    }
    return null;
}

function checkWishList(wishListData, selectedProduct) {
    if (wishListData?.length > 0) {
        for (let element of wishListData) {
            if (
                element.product !== null &&
                element?.product_id == selectedProduct?.product_id
                //  &&  (element.product.variation_type == "shade" ? element.shade_id == selectedProduct.shade_id : element.size_id == selectedProduct.size_id)
            ) {
                return element;
            }
        }
    }
    return null;
}


export {checkCart, checkComboCart, checkWishList};
