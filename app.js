const [command, key, value] = process.argv.slice(2);

const { get, set, unset, reset, changeMasterPass } = require("./lib/commands");
const { askForMasterPassword, askForPassword } = require("./lib/input");
const { readMasterPass } = require("./lib/passwords");

async function run() {
  const checkMasterPass = await askForMasterPassword(`Enter Master Password: `);
  if (checkMasterPass !== readMasterPass()) {
    console.log("Password incorrect. Try again!");
    return;
  }
  if (command === "get") {
    get(key);
  } else if (command === "set") {
    const password = await askForPassword(`Enter password of ${key}: `);
    set(key, password);
  } else if (command === "unset") {
    unset(key, value);
  } else if (command == "CHANGE") {
    changeMasterPass();
  } else {
    console.error("Unknown command");
  }
}

run();
