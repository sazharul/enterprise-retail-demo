function applyDiscount(originalPrice, discountPercentage) {
    // Ensure the discount percentage is between 0 and 100
    if (discountPercentage < 0 || discountPercentage > 100) {
        console.error("Invalid discount percentage. Please enter a value between 0 and 100.");
        return null; // or throw an error, depending on your use case
    }

    // Calculate the discount amount
    const discountAmount = (originalPrice * discountPercentage) / 100;

    // Calculate the discounted price
    const discountedPrice = originalPrice - discountAmount;

    // Return the discounted price
    return discountedPrice;
}

export {applyDiscount};

