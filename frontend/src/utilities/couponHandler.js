import {decrypt, encrypt} from "./EncryptAndDecrypt";

const addCouponDiscountAmountToStorage = (token) => {
    try {
        // Encrypt the token using AES and the secret key
        const encryptedData = encrypt(token);
        sessionStorage.setItem("couponAmount", encryptedData);
    } catch (error) {
        console.error("Error encrypting data:", error);
        // Handle error, perhaps by showing a message to the user
    }
};

const getCouponDiscountAmountFromStorage = () => {
    // Retrieve the encrypted token from local storage
    const encryptedData = sessionStorage.getItem("couponAmount");

    if (encryptedData) {
        const decryptedData = decrypt(encryptedData);
        // Decrypt the token using AES and the secret key
        // const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
        // const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

        return decryptedData;
    }

    return null;
};

const addCouponCodeToStorage = (code) => {
    const encryptedData = encrypt(code);
    sessionStorage.setItem("couponCode", encryptedData);
};

const getCouponCodeFromStorage = () => {
    const encryptedData = sessionStorage.getItem("couponCode");
    if (encryptedData) {
        const decryptedData = decrypt(encryptedData);
        return decryptedData;
    }
    return null;
};

const removeCouponDataFromStorage = () => {
    sessionStorage.removeItem("couponAmount");
    sessionStorage.removeItem("couponCode");
};

export {
    addCouponDiscountAmountToStorage,
    getCouponDiscountAmountFromStorage,
    addCouponCodeToStorage,
    getCouponCodeFromStorage,
    removeCouponDataFromStorage,
};
