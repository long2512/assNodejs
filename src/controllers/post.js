import Post from '../models/post'


export const create = async (req, res) => { // create post
    
    try {
        const post = await new Post(req.body).save();
        res.json(post);    
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Thêm bài viết phẩm không thành công"
        })
    }
}

export const list = async (req, res) => { // get all
    
    const limitNumber = 20
    const limit = req.query.limit ? +req.query.limit : limitNumber;
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const order = req.query.order ? req.query.order : 'desc';

    try {
        const posts = await Post.find().limit(limit).exec();
        res.json(posts);    
    } catch (error) {
        res.status(400).json({
            message: "Khong lay duoc bai viet"
        })
    }
  }
export const get = async (req, res) => { // get a post
    try {
        const posts = await Post.findOne({_id: req.params.id }).exec();
        res.json(posts);    
    } catch (error) {
        res.status(400).json({
            message: "Ko lay duoc bai viet"
        })
    }
}

export const remove = async (req, res) => { // delete post
    try {
        const post = await Post.findOneAndDelete({_id: req.params.id }).exec();
        res.json(post);    
    } catch (error) {
        res.status(400).json({
            message: "Xoa sản phẩm không thành công"
        })
    }
}
export const update = async (req, res) => { // update post
    const condition = {_id: req.params.id };
    const update = req.body;
    const optional = { new : true}
    try {
        const post = await Post.findOneAndUpdate(condition,update,optional).exec();
        res.json(post);    
    } catch (error) {
        res.status(400).json({
            message: "Sua sản phẩm không thành công"
        })
    }
}