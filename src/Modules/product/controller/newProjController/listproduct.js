const newProduct = require("../../model/newSchemOfProduct");

const listProduct = async(_, res)=>{
try{
const result = await newProduct.find();
    return res.status(200).json({status:true, message:"Listing product", result})
}catch(err){
    return res.status(400).json({status:false, message:err.message});
}
}

module.exports = listProduct;