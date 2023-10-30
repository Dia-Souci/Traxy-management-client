import React, {  useState } from 'react'
import './createcustomer.css'
import NavLogo from '../../../images/NavbarLogo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../../Hooks/useLogout'
import { useAuthContext } from '../../../Hooks/useAuthContext'


function Createcustomer() {
    const {user} = useAuthContext()
    const [name,setName]=new useState('')
    const [phone,setPhone]=new useState('')
    const [email,setEmail]=new useState('')
    const [password,setPassword]=new useState('1234567')
    const [balance,setBalance]=new useState(0)
    const [error,setError]=new useState(null)
    const {logout} = useLogout()
    const navigate = useNavigate()
    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        if(!user){
            return
        }
        const customer = {
            name,
            phone,
            email,
            password,
            balance
        }
        console.log(customer)
        const response = await fetch('https://traxy-management-api.vercel.app/api/customers/createCustomer/'+user.ID,{
            method: "POST",
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(customer)
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.message._message)
            console.log(error)
        }
        if(response.ok){
            /*setType()*/
            setName('')
            setPhone('')
            setEmail('')
            setPassword('')
            setBalance(0)
            setError(null)
            navigate('/customer-dashboard')
        }
    }



    
  return (
    <div className='create-customer-container'>
        <nav className='Navbar-traxy-container'>
            <div className="nav-logo-container">
                <img src={NavLogo} alt="Logo vertical traxy"/>
            </div>
            <ul className='links-list'>
                <Link to='/vehicule-dashboard' style={{ textDecoration: 'none' }}>
                    <li className={`links-item ${admin ? '' : 'hidden'}`}>Vehicules</li>
                </Link>
                <Link to='/customer-dashboard' style={{ textDecoration: 'none' }}>
                    <li className={`links-item selected`}>Customers</li>
                </Link>
                <Link to='/UserDash' style={{ textDecoration: 'none' }}>
                    <li className={`links-item ${admin ? '' : 'hidden'}`}>Users</li>
                </Link>
                <Link to='/' onClick={logout} style={{ textDecoration: 'none' }}>
                    <li className={`links-item`}><i className="fa-solid fa-right-from-bracket"></i></li>
                </Link>
            </ul>
        </nav>
        <h1 className='customerDash-main-title' > Add New Customer </h1>
        <div className="customerForm-container">
            <form className="form-card" onSubmit={handleSubmit}>
                <div className="optionsInput">
                    <div className="labelContainer">
                        Client Type :
                    </div>
                    <div className="optionWrapper">
                        <div className="option-container">
                            <p>Entreprise</p>
                            <input type="checkbox"  name="Entreprise" id="Entreprise-chkbx" />
                        </div>
                        <div className="option-container">
                            <p>Particulier</p>
                            <input type="checkbox" name="Particulier" id="Particulier-chkbx" />
                        </div>
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Name :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setName(e.target.value)}} className='add-form-input' autoComplete='false' required = {true}/>
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Phone Number :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setPhone(e.target.value)}} className='add-form-input' autoComplete='false'  required = {true}/>
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Email :
                    </div>
                    <div className="inputContainer">
                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className='add-form-input' autoComplete='false' required = {true}/>
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
                        Balance :
                    </div>
                    <div className="inputContainer">
                        <input type="number" onChange={(e)=>{setBalance(e.target.value)}} className='add-form-input' autoComplete='false' required = {true}/>
                    </div>
                </div>
                <div className="button-holder">
                    <button type='submit' className='button-submit' > Submit New Customer </button>
                </div>
            </form>

            
            { error &&  <div className='errorMessage'>{error}</div> }
        </div>
    </div>
  )
}

export default Createcustomer