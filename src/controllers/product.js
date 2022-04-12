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
        console.log('1',req.query)
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

export const PaginationProduct = async (req, res) => {
    const perPage = 6; // số lượng sản phẩm xuất hiện trên 1 page
    const page = req.params.page || 1;
    console.log(page);

    const Product = productSchema;
    // console.log(Product);
    try {
        await Product
            .find() // find tất cả các data
            .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec((err, products) => {
                Product.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    res.send(products) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
                });
            });
    } catch (error) {
        console.log("lỗi", error);
    }
}

export const list = async (req, res) => { // get all
    
    const limitNumber = 20
    const limit = req.query.limit ? +req.query.limit : limitNumber;
    // const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    // const order = req.query.order ? req.query.order : 'desc';

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
            message: "Ko lay duoc sản phẩm"
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