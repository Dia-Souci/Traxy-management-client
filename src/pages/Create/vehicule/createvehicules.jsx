import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './createvehicule.css'
import NavLogo from '../../../images/NavbarLogo.png'
import { useLogout } from '../../../Hooks/useLogout'
import { useAuthContext } from '../../../Hooks/useAuthContext'


function Createvehicules() {
    const [name,setName]=new useState('')
    const [trackerModel,setTrackerModel]=new useState('')
    const [imei,setImei]=new useState('')
    const [sim_number,setSim_number]=new useState('1234567')
    const [matricule,setMatricule]=new useState('')
    const [num_chassis,setNum_chassis]=new useState('')
    const [activation_timer,setActivation_timer]=new useState(0)
    const [activation_date,setActivation_date]=new useState('')
    const [plan,setPlan]=new useState(0)
    const [customer , setCustomer] = useState(null)
    const [error,setError]=new useState(null)
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const navigate =useNavigate()
    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        const vehicule = {
            name,
            trackerModel,
            imei,
            sim_number,
            matricule,
            num_chassis,
            activation_timer,
            activation_date,
            plan
        }
        console.log(vehicule)
        if(customer !== null) {
            const response = await fetch('https://traxy-management-api.vercel.app/api/customervehicules/addvehicule/'+customer,{
                method: "POST",
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(vehicule)
            })
            const json = await response.json()
            if(!response.ok){
                console.log(json)
                setError(json.message)
                console.log(error)
            }
            if(response.ok){
                /*setType()*/
                setName('')
                setTrackerModel('')
                setImei('')
                setSim_number('')
                setMatricule('')
                setNum_chassis('')
                setActivation_timer(0)
                setActivation_date('')
                setPlan(0)
                setCustomer(null)
                setError(null)
                
                navigate('/vehicule-dashboard')
            }
        }else{
            setError('please insert User ID ')
        }
        
    }

    
  return (
    <div className='create-vehicule-container'>
        <nav className='Navbar-traxy-container'>
            <div className="nav-logo-container">
                <img src={NavLogo} alt="Logo vertical traxy"/>
            </div>
            <ul className='links-list'>
                <Link to='/vehicule-dashboard' style={{ textDecoration: 'none' }}>
                    <li className={`links-item selected ${admin ? '' : 'hidden'}`}>Vehicules</li>
                </Link>
                <Link to='/customer-dashboard' style={{ textDecoration: 'none' }}>
                    <li className={`links-item `}>Customers</li>
                </Link>
                <Link to='/UserDash' style={{ textDecoration: 'none' }}>
                    <li className={`links-item ${admin ? '' : 'hidden'}`}>Users</li>
                </Link>
                <Link to='/'  onClick={logout} style={{ textDecoration: 'none' }}>
                    <li className={`links-item`}><i className="fa-solid fa-right-from-bracket"></i></li>
                </Link>
            </ul>
        </nav>
        <h1 className='customerDash-main-title' > Add New Vehicule </h1>
        <div className="customerForm-container">
            <form className="form-card" onSubmit={handleSubmit}>
                <div className="inputs-line">
                    <div className="labelContainer">
                        CUSTOMER ID :
                    </div>
                    <div className="inputContainer">
                        <input type="number" onChange={(e)=>{setCustomer(e.target.value)}} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Name :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setName(e.target.value)}} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Tracker Model :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setTrackerModel(e.target.value)}} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Imei :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setImei(e.target.value)}} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Sim Number :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setSim_number(e.target.value)}} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Matricule :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setMatricule(e.target.value)}} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Num Chasis :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setNum_chassis(e.target.value)}} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Abonnement timer :
                    </div>
                    <div className="inputContainer">
                        <input type="number" onChange={(e)=>{setActivation_timer(e.target.value)}} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Activation :
                    </div>
                    <div className="inputContainer">
                        <input type="date" onChange={(e)=>{setActivation_date(e.target.value)}} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Plan :
                    </div>
                    <div className="inputContainer">
                        <input type="number" onChange={(e)=>{setPlan(e.target.value)}} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="button-holder">
                    <button type='submit' className='button-submit' > Submit New vehicule </button>
                </div>
            </form>

            
            { error &&  <div className='errorMessage'>{error}</div> }
        </div>
    </div>
    )
}

export default Createvehicules