import CryptoJS from "crypto-js";

export const generateHash = (data) =>
  CryptoJS.SHA256(JSON.stringify(data)).toString();
