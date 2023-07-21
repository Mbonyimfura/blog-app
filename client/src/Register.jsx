import { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Register(){
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

    const formSubmitHandler=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/user/register',{username,email,password},)
        .then(res=>navigate('/login'))
        .catch(err=>console.log(err))
    }
return(
    <div>
    <div className="signup_container">
        
        <form onSubmit={formSubmitHandler} className='signup_form'>
        <h2>Sign Up</h2>
        
            <div>
                <label htmlFor="name">Username:</label>
                <input type="text" placeholder='enter your username'
                onChange={e=>setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder='enter your email'
                onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder='**********'
                onChange={e=>setPassword(e.target.value)}/>
            </div>
            <button className='signup_btn'>Sign up</button>
            <br />
        <p>Already have an account?</p>
     <Link to='/login'><button className='login'>Login</button></Link>
        </form>
       
    </div>
    </div>
)
}
export default Register