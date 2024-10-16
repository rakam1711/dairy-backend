const categorySchema = require("../model/categorySchema");

const categoryByServiceId = async (req, res) => {
    try {
        let limit = req.body.limit || 10;
        let page = req.body.page || 1;
        const service = req.body.serviceId
        const max = await categorySchema.countDocuments({ service: service });
        const data = await categorySchema
            .find({ service: service })
            .skip((page - 1) * limit)
            .limit(limit);
        if (!data)
            return res.status(200).json({ status: true, message: "No data found" });
        const maxPage = Math.ceil(max / limit);
        return res.status(200).json({
            status: true,
            message: "successfully listing",
            data,
            maxPage: maxPage,
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message,
            location: "src/Modules/category/controller/categoryByServiceId",
        });
    }
};

module.exports = categoryByServiceId;
