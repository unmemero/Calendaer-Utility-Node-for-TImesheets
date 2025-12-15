

import CryptoJS from "crypto-js";

const SECRET_KEY = "your-strong-secret-key"; // Replace with a secure key in production

export function encrypt(data) {
    try {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
        return ciphertext;
    } catch {
        return null;
    }
}

export function decrypt(ciphertext) {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    } catch {
        return null;
    }
}