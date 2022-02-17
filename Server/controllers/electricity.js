const Electricity=require("../models/electricity")

exports.buyElectricity=async(req,res)=>{

    try{
     const token= Math.floor((Math.random() * 100000000) + 1);
if(req.body.amount<100){
    res.status(404).json("Amount less than 100 not allowed")
}

        const electricity=new Electricity({
            amount:req.body.amount,
            token:token,
            meterNumber:req.body.meterNumber,
          
         })
         let tokens= await electricity.save()
         res.status(200).json({Token:tokens})

    }catch(err){
     res.status(404).json({Message:err})
    }

 
}

exports.getTokens=async(req,res)=>{
    Electricity.find()
    .then(token=>{
      res.status(200).json({Token:token})
    })
    .catch(err=>{
      res.status(404).json({Message:err})
    })
}

exports.getTokenById=async(req,res)=>{
    Electricity.findById({_id:req.params._id})
    .then(token=>{
      res.status(200).json({Token:token})
    })
    .catch(err=>{
      res.status(404).json({Message:err})
    })
}

exports.deleteToken=async(req,res)=>{
    Electricity.findByIdAndDelete({_id:req.params._id})
    .then(token=>{
      res.status(201).json({Token:token})
    })
    .catch(err=>{
      res.status(404).json({Message:err})
      console.log(err)
    })
}