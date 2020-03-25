const { readPasswords, writePasswords, writeDB } = require("./passwords");
const { decrypt, encrypt, hashPassword } = require("./crypto");
const { askForCustom } = require("./input");

exports.get = function get(key) {
  console.log("Called GET", key);
  // Read and log db.json
  try {
    const passwords = readPasswords();
    // Log password
    const encryptedPassword = passwords[key];
    const password = decrypt(encryptedPassword);
    console.log(key, password);
  } catch (error) {
    console.error(error);
  }
};

exports.set = function set(key, value) {
  console.log("Called SET", key, value);
  const encryptedValue = encrypt(value);
  try {
    const passwords = readPasswords();
    // Update value by key
    passwords[key] = encryptedValue;
    // Write db.json
    writePasswords(passwords);
  } catch (error) {
    console.error(error);
  }
};

exports.unset = function unset(key) {
  console.log("Called UNSET", key);
  try {
    const passwords = readPasswords();
    delete passwords[key];
    writePasswords(passwords);
  } catch (error) {
    console.error(error);
  }
};

exports.reset = function reset(masterPassword) {
  const db = {
    MASTER_PASS: hashPassword(masterPassword),
    passwords: {}
  };

  writeDB(db);
  console.log("Reseted database with new master password");
};

exports.changeMasterPass = async function changeMasterPass() {
  const confirmation = await askForCustom(
    `Are you sure you want to change your Master Password? (y/n)`
  );
  if (confirmation !== "y") {
    return;
  }
  const newMasterPass = await askForCustom(`Enter your new Master Password: `);
  const passwords = readPasswords();
  const passwordKeys = Object.keys(passwords);

  const passwordsDecrypted = {};
  passwordKeys.forEach(passwordKey => {
    const value = passwords[passwordKey];
    passwordsDecrypted[passwordKey] = decrypt(value);
  });

  const db = {
    MASTER_PASS: hashPassword(newMasterPass),
    passwords: passwords
  };
  writeDB(db);

  const passwordsEncrypted = {};
  passwordKeys.forEach(passwordKey => {
    const value = passwordsDecrypted[passwordKey];
    passwordsEncrypted[passwordKey] = encrypt(value);
  });

  writePasswords(passwordsEncrypted);
};
