import React , {  useState } from 'react'
import NavLogo from '../../../images/NavbarLogo.png'
import { Link } from 'react-router-dom'
import { useLogout } from '../../../Hooks/useLogout'
import { useAuthContext } from '../../../Hooks/useAuthContext'
let admin = true


function CustomerUpdate() {
    const item = JSON.parse(localStorage.getItem('customer'))
    const customerID = localStorage.getItem('customerID')
    const [password,setPassword]=new useState(item.password)
    const [balance,setBalance]=new useState(item.balance)
    const [error,setError]=new useState(null)
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const handleSubmit= async (e)=>{
        e.preventDefault()
        if(!user){
            return
        }
        const customer = {
            password,
            balance
        }
        console.log(customer)
        const response = await fetch('https://traxy-management-api.vercel.app/api/customers/single/'+customerID,{
            method: "PUT",
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
            setPassword('')
            setBalance(0)
            setError(null)
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
                    <li className={`links-item`}>Vehicules</li>
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
                
                <div className="inputs-line">
                    <div className="labelContainer">
                        Password :
                    </div>
                    <div className="inputContainer">
                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Balance :
                    </div>
                    <div className="inputContainer">
                        <input type="number" onChange={(e)=>{setBalance(e.target.value)}} value={balance} className='add-form-input' autoComplete='false' required = 'true'/>
                    </div>
                </div>
                <div className="button-holder">
                    <button type='submit' className='button-submit' > Update customer </button>
                </div>
            </form>

            
            { error &&  <div className='errorMessage'>{error}</div> }
        </div>
    </div>
  )
}

export default CustomerUpdate