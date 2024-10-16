const categorySchema = require("../model/categorySchema");
const deleteImageHandler = require("../../../Middleware/DeleteImage/deleteImgaeHandler.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;
const updateCategory = async (req, res) => {
    upload(req, res, async () => {
        try {
            const id = req.body.categoryId;
            if (!id) throw new Error("categoryId is required");
            const category = await categorySchema.findById({ _id: id });
            const obj = {};
            if (req.body.name) obj.name = req.body.name;
            if (req.body.description) obj.description = req.body.description;
            if (req.file.path) {
                deleteImageHandler(category?.image);
                obj.image = BASE_URL + req.file.path;
            }
            const data = await categorySchema.findByIdAndUpdate({ _id: id }, obj, { new: true });
            return res.status(200).json({ status: true, message: "updated Sucessfully", data });
        } catch (err) { return res.status(500).json({ status: false, message: err.message, location: "src/Modules/category/controller/updateCategory" }) }
    });

}

module.exports = updateCategory;