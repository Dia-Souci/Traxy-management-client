import React from 'react'
import './Landing.css'
import {Link} from 'react-router-dom'

import blackLogo from '../../images/LogoBlack.png'
import Coordonnes from '../../images/coordo.png'
import { useLogout } from '../../Hooks/useLogout'
import { useAuthContext } from '../../Hooks/useAuthContext'

const Landing = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
  return (
    <div className='Landing-Main-container'>
        <div className="landing-wrap">
            <h1 className='Landing-title'>Admin</h1>
            <div className="landing-buttons-container">
                <Link to='/customer-dashboard' className={`landing-nav-button`} style={{ textDecoration: 'none' }}>
                    Customer
                </Link>
                <Link to='/vehicule-dashboard' className={`landing-nav-button ${!admin ? 'hidden' :''}`} style={{ textDecoration: 'none' }}>
                    Vehicule
                </Link>
                <Link to='/UserDash' className={`landing-nav-button ${!admin ? 'hidden' :''}`} style={{ textDecoration: 'none' }}>
                    Users
                </Link>
                <Link to='/'  onClick={logout} className='landing-nav-button' style={{ textDecoration: 'none' }}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </Link>
                
            </div>
            <div className="black-infoSection2">
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
        </div>
        
    </div>
  )
}

export default Landing