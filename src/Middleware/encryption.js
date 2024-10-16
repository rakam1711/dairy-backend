const crypto = require("crypto");

const secretKey = process.env.SECRETKEY;
const iv = process.env.IV;
const encrypt = async (token) => {
  try {
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(secretKey, "hex"),
      Buffer.from(iv, "hex")
    );
    let encrypted = cipher.update(token, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { encrypt };
