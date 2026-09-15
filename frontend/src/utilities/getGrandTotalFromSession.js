const getGrandTotalFromSession = () => {
    // Retrieve data from session storage using the key
    const storedTotal = sessionStorage.getItem('totalWithDiscount');

    // Check if data exists
    if (storedTotal) {
        try {
            // Parse the stored data back to its original format
            const parsedTotal = JSON.parse(storedTotal);
            return parsedTotal;
        } catch (error) {
            console.error('Error parsing total from session storage:', error);
            return null;
        }
    } else {
        return null;
    }
};

export {getGrandTotalFromSession};
