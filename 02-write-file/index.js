const fs = require("fs");
const path = require("path");
const stream = fs.createWriteStream(path.resolve(__dirname, "text.txt"));

const { stdin, stdout, exit } = require("process");

stdout.write("Text something...\n");

stdin.on("data", (data) => {
  if (data.toString().trim() == "exit") {
    stdout.write("Good luck!");
    exit();
  }
  stream.write(data);
});

//Сигнал прерывания (Ctrl+C) с терминала
process.on("SIGINT", () => {
  stdout.write("Good luck!");
  process.exit();
});
