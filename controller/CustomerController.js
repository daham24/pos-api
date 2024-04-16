const CustomerSchema = require('../model/CustomerSchema');
const {response} = require("express");

const create = (req,res)=>{
    const customer = new CustomerSchema({
        name:req.body.name,
        address:req.body.address,
        salary:req.body.salary
    })
    customer.save().then(response=>{
      res.status(201).json({'message':'Customer Saved!'})
    }).catch(error=>{
       return res.status(500).json(error);
    })
}
const findById = (req,res)=>{
    const customerId = req.params.id;
    CustomerSchema.findOne({'_id': customerId}).then(selectedObj=>{
        if(selectedObj!=null){
           return res.status(200).json(selectedObj);
        }else {
            return res.status(404).json({'message':'Customer Not Found!'});
        }
    }).catch(error=>{
        console.log('Error finding customer:', error);
        return res.status(500).json({'message':'Internal Server Error'})
    })
}
const update = async (req, res) => {
    const updateData = await CustomerSchema.findOneAndUpdate({'data': req.body.id},
        {
            $set: {
                name: req.body.name,
                address: req.body.address,
                salary: req.body.salary
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
    const deleteData = await CustomerSchema.findByIdAndDelete({'_id': req.params.id});

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
        console.log(skip)
        CustomerSchema.find(query)
            .limit(pageSize)
            .skip(skip).then(response=>{
                return res.status(200).json(response);
            })


    }catch (error){
        console.log(error)
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

