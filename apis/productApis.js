//import db schema
const Product = require('../model/Product')

const products_all = async (req, res) => {
    try {
        const products = await Product.find()
        console.log("Data sent")
        res.json(products)
    } catch(error) {
        console.log("Error:-", error)
        res.json({ 'error': 'Error in data fetching' })
    }
}

const insert_product = async (req, res) => {
    const product = new Product({
        p_id: req.body.p_id,
        p_name: req.body.p_name,
        p_cost: req.body.p_cost
    })
    try {
        const savedProduct = await product.save()
        console.log('Product inserted')
        res.send(savedProduct)
    }
    catch (error) {
        res.status(400).send(error)
    }
}

const update_product = async (req, res) => {
    const p_id = req.body.p_id;  // Assuming p_id is sent in the request body
    const updateData = {
        p_name: req.body.p_name,
        p_cost: req.body.p_cost
    };

    try {
        const updateProduct = await Product.updateOne(
            { p_id: p_id },  // Filter
            { $set: updateData }  // Update operations
        );
        
        if (updateProduct.modifiedCount !== 0) {
            console.log("Product Updated", updateProduct);
            res.send({ 'update': 'success' });
        } else {
            console.log("Product not updated");
            res.send({ 'update': 'failed' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};
const delete_product = async (req, res) => {
    let p_id = req.body.p_id
    try {
        const deletedProduct = await Product.deleteOne({p_id})
        if(deletedProduct.deletedCount != 0) {
            console.log("Product Deleted")
            res.send({'delete':'success'})
        } else {
            console.log("Product not deleted")
            res.send({'delete':'failed'})
        }
    } catch(error) {
        res.status(400).send(error)
    }
}

module.exports = {
    products_all,
    insert_product,
    update_product,
    delete_product
}