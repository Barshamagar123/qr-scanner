import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

export const encryptData = (data) => {
  const secret = process.env.SECRET_KEY;
  return CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
};
