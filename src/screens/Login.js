import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})
  let navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(JSON.stringify({email:credentials.email,password:credentials.password,}))
    const response = await fetch("https://mern-backend-815j.onrender.com/api/loginuser",{
      method:'POST',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify({ email:credentials.email,password:credentials.password,  })
    })
    const json = await response.json()
    console.log(json);
    if(!json.success){
      alert("Enter Valid Credentials")
    } 
    if(json.success){
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.group(localStorage.getItem("authToken"))
      navigate("/");
    }       
  }
  const onChange= (event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
  } 

  return (
    <>
    <div className='container'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/creatuser" className='m-3 btn btn-danger'>I'M a New User</Link>
</form></div>
    </>   
  )
}
