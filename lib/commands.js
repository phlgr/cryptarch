const fs = require("fs");
const { readPasswords, writePasswords } = require("./passwords");

exports.get = function get(key) {
  console.log("Called GET", key);
  // Read and log db.json
  try {
    const passwords = readPasswords();

    console.log(key, passwords[key]);
  } catch (error) {
    console.log(error);
  }
};

exports.set = function set(key, value) {
  console.log("Called SET", key, value);
  try {
    const passwords = readPasswords();
    passwords[key] = value;
    writePasswords(passwords);
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
