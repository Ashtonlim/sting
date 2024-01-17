import bcrypt from "bcrypt";

const plaintextPassword = "user_password";

// create a salt
const salt = await bcrypt.genSalt(10);

// e.g. of salt = $2b$10$QeVpQZ0LZB/1Prv79sGnH.
console.log(salt);

// Hash the password with the manually set salt
const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

// example of hash = $2b$10$QeVpQZ0LZB/1Prv79sGnH.tmimQ.M83xh4r/o0pIJqGZosqqMyKLO
console.log("Hashed password with custom salt:", hashedPassword);
