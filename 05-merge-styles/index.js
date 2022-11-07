const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const stylesPath = path.join(__dirname, "styles");
const projectDistPath = path.join(__dirname, "project-dist/bundle.css");
const output = fs.createWriteStream(projectDistPath);

fsPromises.readdir(stylesPath).then(files => {
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(stylesPath, files[i]);
    const fileName = path.basename(filePath);
    if (path.extname(filePath) === ".css") {
      const input = fs.createReadStream(path.join(stylesPath, fileName));
      input.on("data", (data) => {
        output.write(data.toString() + "\n");
      });
    }
  }
});
