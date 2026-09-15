import CryptoJS from "crypto-js";

const secretKey = "my-unique-secret-key-007";

const encrypt = (data) => {
    // Encrypt the data using AES and the secret key
    // const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    // return encryptedData;

    try {
        // Encrypt the data using AES and the secret key
        const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
        return encryptedData;
    } catch (error) {
        console.error("Encryption error:", error);
        throw error; // Re-throw the error for handling in the calling function
    }
};

// const decrypt = (encryptedData) => {
//     try {
//         if(encryptedData){
//             const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//             const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
//             return decryptedData;
//         }
//     } catch (error) {
//         console.error('Decryption error:', error);
//         return null; // or handle the error accordingly
//     }
// };

const decrypt = (encryptedData) => {
    try {
        if (encryptedData) {
            //
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
            const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
            //
            return decryptedData;
        }
    } catch (error) {
        console.error("Decryption error:", error);
        return null; // or handle the error accordingly
    }
};

export {encrypt, decrypt};
