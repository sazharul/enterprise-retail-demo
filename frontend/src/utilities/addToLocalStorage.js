const addToLocalStorage = (token) => {
    // const encryptedToken = CryptoJS.AES.encrypt(token, 'secret_passphrase').toString();
    localStorage.setItem('authToken', token);
};

export {addToLocalStorage};
