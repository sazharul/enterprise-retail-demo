import {decrypt, encrypt} from "./EncryptAndDecrypt";

const addRewardPointsToStorage = (data) => {
    const encryptedData = encrypt(data);
    sessionStorage.setItem("rewardPoint", encryptedData);
};

const getRewardPointsFromStorage = () => {
    const encryptedData = sessionStorage.getItem("rewardPoint");
    if (encryptedData) {
        const decryptedData = decrypt(encryptedData);
        return decryptedData;
    }
    return null;
};

const removeRewardPointsFromStorage = () => {
    sessionStorage.removeItem("rewardPoint");
};

export {addRewardPointsToStorage, getRewardPointsFromStorage, removeRewardPointsFromStorage};
