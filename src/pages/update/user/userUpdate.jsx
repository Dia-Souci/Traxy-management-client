import React ,{useState} from 'react'

import NavLogo from '../../../images/NavbarLogo.png'
import { Link } from 'react-router-dom'
import { useLogout } from '../../../Hooks/useLogout'

let admin = true

function UserUpdate() {
  const [username,setUserName]=new useState('')
    const [nss,setNSS]=new useState('')
    const [password,setPassword]=new useState('888888S3')
    const [boutique,setBoutique]=new useState('')
    const [error,setError]=new useState(null)
    const {logout} = useLogout()
    const handleSubmit= async ()=>{
        const user = {
            username,
            nss,
            password,
            boutique
        }
        console.log(user)
        const response = await fetch('https://traxy-management-api.vercel.app/api/users/updateUser/1',{
            method: "PUT",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.message._message)
            console.log(error)
        }
        if(response.ok){
            /*setType()*/
            setUserName('')
            setNSS('')
            setPassword('')
            setBoutique('')
            setError(null)
        }
    }
  return (
    <div>
        <nav className='Navbar-traxy-container'>
            <div className="nav-logo-container">
                <img src={NavLogo} alt="Logo vertical traxy"/>
            </div>
            <ul className='links-list'>
                <Link to='/vehicule-dashboard' style={{ textDecoration: 'none' }}>
                    <li className={`links-item`}>Vehicules</li>
                </Link>
                <Link to='/customer-dashboard' style={{ textDecoration: 'none' }}>
                    <li className={`links-item `}>Customers</li>
                </Link>
                <Link to='/UserDash' style={{ textDecoration: 'none' }}>
                    <li className={`links-item ${admin ? '' : 'hidden'} selected`}>Users</li>
                </Link>
                <Link to='/' onClick={logout} style={{ textDecoration: 'none' }}>
                    <li className={`links-item `}><i className="fa-solid fa-right-from-bracket"></i></li>
                </Link>
            </ul>
        </nav>
        <h1 className='customerDash-main-title' > Add New User </h1>
        <div className="customerForm-container">
            <form className="form-card" onSubmit={handleSubmit}>
                
                <div className="inputs-line">
                    <div className="labelContainer">
                        userName :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setUserName(e.target.value)}} className='add-form-input' autoComplete='false' required = 'true'/>
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        NSS :
                    </div>
                    <div className="inputContainer">
                        <input type="number" onChange={(e)=>{setNSS(e.target.value)}} className='add-form-input' autoComplete='false' required = 'true'/>
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Password :
                    </div>
                    <div className="inputContainer">
                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Boutique :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setBoutique(e.target.value)}} className='add-form-input' autoComplete='false' required = 'true'/>
                    </div>
                </div>
                
                <div className="button-holder">
                    <button type='submit' className='button-submit' > Submit New User </button>
                </div>
            </form>

            
            { error &&  <div className='errorMessage'>{error}</div> }
        </div>
    </div>
  )
}

export default UserUpdate