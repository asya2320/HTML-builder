const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const copyFile = fsPromises.copyFile;

(function copyDir() {
  fs.mkdir(
    path.join(__dirname, "files-copy"),
    {
      recursive: true,
    },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  fsPromises.readdir(path.join(__dirname, "files-copy")).then((filesCopy) => {
    if (filesCopy.length != 0) {
      for (let j = 0; j < filesCopy.length; j++) {
        fs.unlink(
          path.join(__dirname, "files-copy", filesCopy[j]),
          function (err) {
            if (err) return console.log(err);
          }
        );
      }
    }
  });

  fsPromises.readdir(path.join(__dirname, "files")).then((files) => {
    for (let i = 0; i < files.length; i++) {
      let filePath = path.join(__dirname, "files", files[i]);
      copyFile(filePath, path.join(__dirname, "files-copy", files[i]));
    }
  });
})();

