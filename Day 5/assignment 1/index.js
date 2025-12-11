const chalk = require("chalk");
const { greet } = require("./greet");
const fs = require("fs");
const figlet = require("figlet");
const { info } = require("console");

const myName = "Moataz";

fs.writeFile("fileName.txt", myName, "utf8", (err) => {
  if (err) {
    console.error("Error writing name to file:", err);
    return;
  }

  console.log(chalk.yellow("Name written to file."));

  fs.readFile("fileName.txt", "utf8", (err, name) => {
    if (err) {
      console.error("Error reading name:", err);
      return;
    }

    const greeting = greet(name.trim());

    figlet(greeting, (err, data) => {
      if (err) {
        console.error("Error using figlet:", err);
        return;
      }

      const result = chalk.green(data);
      console.log(result);

      fs.writeFile("bigGreeting.txt", data, (err) => {
        if (err) {
          console.error("Error writing greeting:", err);
          return;
        }

        console.log(chalk.blue("Greeting saved to bgiGreet.txt!"));
        global.AppInfo = {
          appName: "Greeting Generator",
          version: "1.0",
        };
        console.log("Global Info : ", AppInfo);
      });
    });
  });
});
