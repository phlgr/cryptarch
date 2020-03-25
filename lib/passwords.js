const fs = require("fs");

function readDB() {
  const dbJSON = fs.readFileSync("./db.json", "utf8");
  const db = JSON.parse(dbJSON);
  return db;
}

function writeDB(db) {
  fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
}

function readPasswords() {
  const db = readDB();
  return db.passwords;
}

function writePasswords(passwords) {
  fs.writeFileSync("./db.json", JSON.stringify(passwords, null, 2));
}

function readMasterPass() {
  const db = readDB();
  return db.MASTER_PASS;
}

exports.readPasswords = readPasswords;
exports.writePasswords = writePasswords;
exports.readDB = readDB;
exports.writeDB = writeDB;
exports.readMasterPass = readMasterPass;
