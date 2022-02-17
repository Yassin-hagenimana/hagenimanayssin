const express=require("express")
const router=express.Router()
const Token=require("../controllers/electricity")

router.post("/buyToken",Token.buyElectricity)
router.get("/getAllTokens",Token.getTokens)
router.get("/tokenById/:_id",Token.getTokenById)
router.delete("/deleteToken/:_id",Token.deleteToken)




module.exports=router