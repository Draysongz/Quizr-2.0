import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
const navigate=useNavigate()
  const route= ()=>{
    navigate('/main')
  }
  return (
    <div className='login'>
    <div className="left">
        <div className="box">
        <h1 className="heading">
            Digital <br />
            platform <br />
            for distance <br />
            <span className='learn'>learning.</span>
        </h1>
        <h4 className="caption">
            You will never know everything <br />
            But you will know more
        </h4>
        </div>
        
    </div>

    <div className="right">
    <form  className="loginForm">
        <h2>Hey there, </h2>
        <p className='des'>Enter the details below</p>
        <input type="email" placeholder='Email address' name='email' className='email' />
        <input type="password" placeholder='password' name='Password' className='pass'/>
        <button className='loginBtn' onClick={route}>Login</button>
      </form>
    </div>
    </div>
  )
}

export default Login
