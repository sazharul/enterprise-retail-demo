import CryptoJS from "crypto-js";
import {decrypt, encrypt} from "./EncryptAndDecrypt";


const addTokenToLocalStorage = (token) => {
    // Encrypt the token using AES and the secret key
    // const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
    const encryptedData = encrypt(token);
    localStorage.setItem("authToken", encryptedData);
};

const getTokenFromLocalStorage = () => {
    // Retrieve the encrypted token from local storage
    const encryptedToken = localStorage.getItem("authToken");

    if (encryptedToken) {
        const decryptedData = decrypt(encryptedToken);
        // Decrypt the token using AES and the secret key
        // const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
        // const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

        return decryptedData;
    }

    return null;
};

export {addTokenToLocalStorage, getTokenFromLocalStorage};
