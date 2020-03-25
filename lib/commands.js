const fs = require("fs");
const {
  readPasswords,
  readMasterPass,
  writeDB,
  readDB
} = require("./passwords");
const { decrypt, encrypt } = require("./crypto");
const { askForCustom } = require("./input");
const { get } = require("./commands");

exports.get = function get(key) {
  console.log("Called GET", key);
  // Read and log db.json
  try {
    const passwords = readPasswords();

    console.log(key, decrypt(passwords[key]));
  } catch (error) {
    console.log(error);
  }
};

exports.set = function set(key, value) {
  console.log("Called SET", key, value);
  try {
    const db = readDB();
    db.passwords[key] = encrypt(value);
    writeDB(db);
  } catch (error) {
    console.error(error);
  }
};

exports.unset = function unset(key, value) {
  console.log("Called SET", key, value);
  const dbJSON = fs.readFileSync("db.json", "utf8");
  const passwords = JSON.parse(dbJSON);
  delete passwords[key];
  console.log(passwords[key]);
  try {
    fs.writeFileSync("db.json", JSON.stringify(passwords, null, 2));
  } catch (error) {
    console.error(error);
  }
};

exports.changeMasterPass = async function changeMasterPass() {
  const confirmation = await askForCustom(
    `Are you sure you want to change your Master Password? (y/n)`
  );
  if (confirmation !== "y") {
    return;
  }
  const oldMasterPass = readMasterPass();
  const newMasterPass = await askForCustom(`Enter your new Master Password: `);
  const passwords = readPasswords();
  console.log(passwords.passwords.keys());
};
