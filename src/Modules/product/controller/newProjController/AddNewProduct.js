const upload = require("../../../../Middleware/multer/multipleImageUpload.js");
const newProduct = require("../../model/newSchemOfProduct.js");
const BASE_URL = process.env.BASE_URL;
const addNewProduct = async (req, res) => {
    const image = []
    upload(req, res, async () => {
        if (req.files) req.files.map(x => {
            image.push(BASE_URL + x.path);
        })
        // const bodyData = [
        //     "productName", "productDescription", "is_varient", "orderAcceptance", "originalPrice", "discountedPrice", "inclusiveGst", "minPrice", "maxPrice", "skuID", "orderMinQty", "orderMaxQty", "relatedProductID", "labelID"
        //     , "preOrder", "subscriptionOrder", "subscriptionTypeID", "launchDate", "paymentReceivingDateTime", "preOrderQty", "preOrderStartDate", "expectedShippingDate", "weight", "length", "width", "height", "deliveryTimelineID"
        //     , "deliveryInstructions", "qty", "collectionId", "productTags", "launchDescription", "visibleStatus"
        // ]
        try {
            const body = req.body;
            // for (let key in body) {
            //     if (!bodyData.includes(key)) {
            //         throw new Error(`${key} key is not in schema`)
            //     }

            // }
            const mustData = {
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                is_varient: req.body.is_varient,
            }
            for (let key in mustData) {
                if (mustData[key] == undefined || mustData[key] == "") {
                    throw new Error(`${mustData[key]} key is require`)
                }
            }
            if (image.length > 0) { body.image = image; }
            const product = new newProduct(body);
            await product.save();

            return res.status(201).json({ status: true, message: "Created Successfully" });


        } catch (err) {
            return res.status(400).json({ status: false, error: err.message })
        }
    })

}

module.exports = addNewProduct;