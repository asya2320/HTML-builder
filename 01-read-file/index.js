const fs = require("fs");
const path = require("path");
const stream =fs.createReadStream(path.resolve(__dirname, "text.txt"));

stream.on("readable", ()=>{
    const data = stream.read();
    if(data){
        console.log(data.toString());
    }   
})

