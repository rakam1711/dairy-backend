const fs = require("fs");

const deleteImageHandler = (image) => {
    if (!image) return;
    if (fs.existsSync(`image/${image.split("image/")[1]}`)) {
        fs.unlink(`image/${image.split("image/")[1]}`, (err) => {
            if (err) return console.log("Error in deleting image!");
            console.log("Image deleted successfully.");
        });
    }
}

module.exports = deleteImageHandler;