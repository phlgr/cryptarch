const fs = require("fs");
const { readPasswords, writePasswords } = require("./lib/passwords");

const [command, key, value] = process.argv.slice(2);

function get() {
  console.log("Called GET", key);
  // Read and log db.json
  try {
    const passwords = readPasswords();

    console.log(key, passwords[key]);
  } catch (error) {
    console.log(error);
  }
}

function set() {
  console.log("Called SET", key, value);
  try {
    const passwords = readPasswords();
    passwords[key] = value;
    writePasswords(passwords);
  } catch (error) {
    console.error(error);
  }
}

function unset() {
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
}

if (command === "get") {
  get();
} else if (command === "set") {
  set();
} else if (command === "unset") {
  unset();
} else {
  console.error("Unknown command");
}
