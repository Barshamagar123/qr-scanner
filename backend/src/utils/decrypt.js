import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

export const decryptData = (cipher) => {
  const secret = process.env.SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(cipher, secret);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
