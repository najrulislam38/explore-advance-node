const { log } = require("node:console");
const EventEmitter = require("node:events");

class SchoolBell extends EventEmitter {}

const schoolBell = new SchoolBell();
schoolBell.on("ring", () => {
  console.log("Yahoo, school suti");
});

schoolBell.on("ring", () => {
  console.log("oh no. Another one class have yet.");
});

schoolBell.on("broken", () => {
  console.log("oh no. Is this class not finish.");
});

schoolBell.emit("ring");
schoolBell.emit("broken");
