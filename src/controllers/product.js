import Product from '../models/product'
import  productSchema  from "../models/product";


export const create = async (req, res) => { // create product
    
    try {
        const product = await new Product(req.body).save();
        res.json(product);    
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Thêm sản phẩm không thành công"
        })
    }
}

export const SearchPro = async (req, res) => {
    
    try {
        const result = await productSchema
            .find({
                name: {
                    $regex: new RegExp(req.query.q)
                }
            })
        res.json(result);
    } catch (error) {
        console.log("lỗi", error);

    }

}

export const list = async (req, res) => { // get all
    
    const limitNumber = 20
    const limit = req.query.limit ? +req.query.limit : limitNumber;
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const order = req.query.order ? req.query.order : 'desc';

    try {
        const products = await Product.find().limit(limit).exec();
        res.json(products);    
    } catch (error) {
        res.status(400).json({
            message: "Khong lay duoc sản phẩm"
        })
    }
  }
export const get = async (req, res) => { // get a product
    try {
        const products = await Product.findOne({_id: req.params.id }).exec();
        res.json(products);    
    } catch (error) {
        res.status(400).json({
            message: "Ko lay duoc sản phẩm "
        })
    }
}

export const remove = async (req, res) => { // delete product
    try {
        const products = await Product.findOneAndDelete({_id: req.params.id }).exec();
        res.json(products);    
    } catch (error) {
        res.status(400).json({
            message: "Xoa sản phẩm không thành công"
        })
    }
}
export const update = async (req, res) => { // update product
    const condition = {_id: req.params.id };
    const update = req.body;
    const optional = { new : true}
    try {
        const products = await Product.findOneAndUpdate(condition,update,optional).exec();
        res.json(products);    
    } catch (error) {
        res.status(400).json({
            message: "Sua sản phẩm không thành công"
        })
    }
}