function getDeliveryCharge(weight) {
    //
    const firstKgCharge = 70; // Delivery charge for the first 1kg
    const extraChargePerKg = 17; // Additional charge per kg after the first 1kg

    if (weight <= 0) {
        return 0;
    } else if (weight <= 1) {
        //   return `Delivery charge: ${firstKgCharge} TK`;
        return firstKgCharge;
    } else {
        // const extraWeight = weight - 1;
        const extraWeight = Math.ceil(weight - 1);
        const extraCharge = extraWeight * extraChargePerKg;
        const totalCharge = firstKgCharge + extraCharge;
        return totalCharge;
    }
}

export {getDeliveryCharge};
