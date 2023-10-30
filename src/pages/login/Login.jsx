import React, { useState } from 'react'
import './Login.css'
import purpleLogo from '../../images/LogoPerple.png'
import blackLogo from '../../images/LogoBlack.png'
import Coordonnes from '../../images/coordo.png'

import { useLogin } from "../../Hooks/useLogin"

const Login = () => {
    const [usernameLogin , setUsernameLogin] = useState('')
    const [password , setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit= async  (e)=>{
        e.preventDefault()
        console.log(usernameLogin,password)
        await login(usernameLogin,password)
    }

  return (
    <div className='login-page-container'>
        <form className="login-container" onSubmit={handleSubmit}>
            <div className="login-logo-container">
                <img 
                    src={purpleLogo}
                    alt="Logo traxy tracking from X to Y" 
                />
            </div>
            

            <div className="inputs-container">
                <div className="input-container">
                    <div className="label-container">
                        <p>Username</p>
                    </div>
                    <div className="input-section">
                        <input type="text" className='input-field-login' onChange={(e)=>{setUsernameLogin(e.target.value)}} autoComplete='false' />
                    </div>
                </div>
                <div className="input-container">
                    <div className="label-container">
                        <p>Password</p>
                    </div>
                    <div className="input-section">
                        <input type="PASSWORD" className='input-field-login' onChange={(e)=>{setPassword(e.target.value)}} autoComplete='false' />
                    </div>
                </div>
                <button disabled={isLoading} className='login-page-login-btn'>Login</button>

                {error && <div className="error">{error}</div>}
            </div>
            
            <div className="black-infoSection">
                <div className="black-img-container">
                    <img 
                        src={blackLogo}
                        alt="Logo traxy tracking from X to Y" 
                    />
                </div>
                    
                <div className="black-img-container">
                    <img 
                        src={Coordonnes} 
                        alt="coordonnées" 
                    />
                </div>
                
            </div>
            
        </form>
    </div>
  )
}

export default Login