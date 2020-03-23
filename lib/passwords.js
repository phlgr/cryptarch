const fs = require("fs");

exports.readPasswords = function readPasswords() {
  const passwordsJSON = fs.readFileSync("./db.json", "utf8");
  const passwords = JSON.parse(passwordsJSON);
  return passwords;
};

exports.writePasswords = function writePasswords(passwords) {
  fs.writeFileSync("./db.json", JSON.stringify(passwords, null, 2));
};
