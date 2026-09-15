const saveToSessionStorage = (key, data) => {
    try {
        const serializedData = JSON.stringify(data);
        sessionStorage.setItem(`${key}`, serializedData);

    } catch (error) {
        console.error('Error saving data to sessionStorage:', error);
        // Handle errors if necessary
    }
};

export {saveToSessionStorage};