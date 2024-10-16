const subCategorySchema = require("../model/subcategorySchema.js");

const listSubCategory = async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 1000;
    const { categoryId, search } = req.body;
    const max = await subCategorySchema.countDocuments();

    if (!categoryId) throw new Error("categoryId is missing");
    const data = await subCategorySchema
      .find({ category: categoryId })
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data)
      return res.status(200).json({ status: true, message: "No data found" });

    // const searchedData = data.regex("name", `/${search}$/`);

    const maxPage = Math.ceil(max / limit);
    return res.status(200).json({
      status: true,
      message: "successfully listing",
      data: data,
      maxPage: maxPage,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/subCategory/controller/listSubCategory",
    });
  }
};

module.exports = listSubCategory;
