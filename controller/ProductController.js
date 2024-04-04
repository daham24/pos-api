const ProductSchema = require('../model/ProductSchema');

const create = (req,res)=>{
    const product = new ProductSchema({
        name:req.body.name,
        description:req.body.description,
        image:req.body.image,
        unitPrice:req.body.unitPrice,
        qtyOnHand:req.body.qtyOnHand
    })
    product.save().then(response=>{
        res.status(201).json({'message':'Product Saved!'})
    }).catch(error=>{
        return res.status(500).json(error);
    })
}
const findById = (req,res)=>{
    (ProductSchema.findOne({"_id": req.params._id})).then(selectedObj=>{
        if(selectedObj!=null){
            res.status(200).json({'data':selectedObj});
        }else {
            return res.status(404).json({'message':'Product Not Found!'})
        }
    })
}
const update = async (req,res)=>{
    const updateData = await ProductSchema.findOneAndUpdate({'data': req.body.id},
        {
            $set: {
                name:req.body.name,
                description:req.body.description,
                image:req.body.image,
                unitPrice:req.body.unitPrice,
                qtyOnHand:req.body.qtyOnHand
            }
        },
        {new: true});
    if (updateData){
        return res.status(200).json({'message':'Updated!'});
    }else{
        return res.status(500).json({'message':'Internal Server Error'});
    }
}
const deleteById = async (req,res)=>{
    const deleteData = await ProductSchema.findOneAndDelete({'data': req.body.id});

    if (deleteData){
        return res.status(204).json({'message':'Deleted!'});
    }else{
        return res.status(500).json({'message':'Internal Server Error'});
    }
}
const findAll = (req,res)=>{
    try{
        const {searchText, page=1, size=10} = req.query;
        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if(searchText){
            query.$text={$search:searchText}
        }

        const skip = (pageNumber-1) * pageSize;

        const data =  ProductSchema.find(query)
            .limit(pageSize)
            .skip(skip);
        return res.status(200).json(data);
    }catch (error){
        return res.status(500).json({'message':'Internal Server Error'});
    }
}

module.exports = {
    create,
    findById,
    update,
    deleteById,
    findAll
}

