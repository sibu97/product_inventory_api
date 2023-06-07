

const Product = require('../models/product_db');


// controller for showing all products if there there are zero product in database it will show  'No product found'
module.exports.index = async function(req,res){

    try{
        console.log("Showing product");
        const products = await Product.find({})

      

        if(products.length<1){
            res.status(200).json({
                message: 'No product found'
            })
            return
        }

        if(products){
            res.status(200).json({
                data: products
            })
        }
        

        
    }catch(err){
            res.status(404).json({
                message: "There was an error in finding products"
            })
    }

}


//  Controller for deleting a product with help of product id

module.exports.deleteProduct = async function(req,res){
    try{
        let products = await Product.findById(req.params.id);

        if(!products){
            return res.status(200).json({
                message: "no product found"
            })
        }

        products.remove();

        return res.status(200).json({
            message:"product deleted"
        })


    }catch(err){

        res.status(404).json({
            message: "There was an error in finding products"
        })
    }


}


//  Controller for adding a new product in database 

module.exports.addProduct = async function(req,res){
    try{

   
        console.log("adding product");
        let product = await Product.create(req.body);
        // let result = await product.save();
        res.status(201).json({    // response code 201 for created 
            data:{
                product
            }
        })

    }catch(err){

        console.log(req.body);
        console.log(err);
        res.status(400).json({
            data:{
                msg: "there was an error in crating new product"
            }
        })
    }
}


// Controller for updating product quantity with help of product id you can increase or dercrease quantity


module.exports.updateProduct = async function(req,res){
    try{
        const {
            id: productID
        }=req.params
        const {
            number
        }=req.query

        if(!number){
            res.status(400).json({
                data:{
                    message: "Error in updating quantity"
                }
            })
            return
        }

        const product = await Product.findOne({
            _id: productID
        })

        let newQuantity = product.quantity + (+number)

        if(newQuantity>0){
            const updateProduct = await Product.findByIdAndUpdate({
            _id: productID
            },{
                quantity: newQuantity
            },{
                new: true,
                runValidators: true
            })

            res.status(200).json({
                data:{
                    updateProduct,
                    message: "successfully updated"
                }
            })
        }else{
            res.status(400).json({
                data:{
                    message:"Product quantity can not be zero ot less"
                }
            })
            return
        }

    }catch(err){
        console.log(err,"error in updating");
        res.status(400).json({
            data:{
                message: "Error while updating quantity"
            }
        })
    }
}