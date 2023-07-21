import './style.css'
import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Login(){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const formSubmitHandler=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/user/login',{email,password})
        .then(res=>{
            if(res.data==='Success!'){
                navigate('/home')
            }
        })
        .catch(err=>console.log(err))
    }
return(
    <div>
    <div className="signup_container">
        
        <form onSubmit={formSubmitHandler} className='signup_form'>
        <h2>Login</h2>
        
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder='enter your email' onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder='**********' onChange={e=>setPassword(e.target.value)}/>
            </div>
            <button className='signup_btn'>Login</button>
            <br />
        <p>Not Registered?</p>
     <Link to='/register'><button className='login'>Signup</button></Link>
        </form>
       
    </div>
    </div>
)
}
export default Login