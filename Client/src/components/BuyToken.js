import React from "react";
import{useState} from "react"
import axios from "axios"


 const Signup=(props) =>{

   const [amount,setAmount]=useState('')
   const[token,setToken]=useState('')
   const[meterNumber,setMeterNumber]=useState('')
 

    const handleSubmit=e=>{
      e.preventDefault();
    axios.post("http://localhost:8500/User/signup",{
      amount:amount,
      token:Math.floor((Math.random() * 100000000) + 1),
      meterNumber:meterNumber
    })
    .then(response=>{
      console.log("Generated Token:"+response.data)

    })
    .catch(err=>{
      console.log(err)
    })
  }
  
  return(

      <div className="container">
      <div className="form-div">
      <h2 className="text-danger" style={{textAlign:"center",marginBottom:20}}>Buy Electricity</h2>


      <form  style={{marginTop:-6}}>

       <input type="number" placeholder="Enter your Amount"
         className="form-control form-group"
         value={amount}
         onChange={e=>setAmount(e.target.value)}/>

         
         {
             //<input type="number" placeholder="Enter meter number"
        //  className="form-control form-group"
        //  value={meterNumber}
        //  onChange={e=>setMeterNumber(e.target.value)}/>

  }
          <input type="number" placeholder="Enter meter number"
         className="form-control form-group"
         value={meterNumber}
         onChange={e=>setMeterNumber(e.target.value)}/>



        <input type="submit" value="Generate Token" className="btn btn-danger btn-block"
          onClick={handleSubmit}
         />
      </form>
      </div>
      </div>
    )
  
}
export default Signup