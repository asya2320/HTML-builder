const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

fsPromises
  .readdir(path.join(__dirname, "secret-folder"), {
    withFileTypes: true,
  })
  .then((files) => {
    for (let i = 0; i < files.length; i++) {
      if (!files[i].isDirectory()) {
        let secretFolderFilePath = path.join(
          __dirname,
          "secret-folder",
          files[i].name
        );
        fsPromises.stat(secretFolderFilePath).then((size) => {
          console.log(
            path.basename(
              secretFolderFilePath,
              path.extname(secretFolderFilePath)
            ) +
              "-" +
              path.extname(secretFolderFilePath).slice(1) +
              "-" +
              Number(size.size / 1024).toFixed(3) +
              "kb"
          );
        });
      }
    }
  });
