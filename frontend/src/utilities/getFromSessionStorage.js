const getFromSessionStorage = (key) => {
    try {
        const serializedData = sessionStorage.getItem(key);
        if (serializedData === null) {
            // Key does not exist in sessionStorage
            return null;
        }
        const data = JSON.parse(serializedData);
        return data;
    } catch (error) {
        console.error('Error retrieving data from sessionStorage:', error);
        return null; // Handle errors by returning null or appropriate value
    }
};

export {getFromSessionStorage};
  