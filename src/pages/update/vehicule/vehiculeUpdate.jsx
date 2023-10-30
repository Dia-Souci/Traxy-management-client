import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate } from 'react-router-dom'
import NavLogo from '../../../images/NavbarLogo.png'
import { useLogout } from '../../../Hooks/useLogout'
import { useAuthContext } from '../../../Hooks/useAuthContext'



function VehiculeUpdate() {
    const customerID = localStorage.getItem('customerID')
    const vehiculeID = localStorage.getItem('vehiculeID')
    const item = JSON.parse(localStorage.getItem('vehicule'))
    const [name,setName]=new useState(item.name)
    const [trackerModel,setTrackerModel]=new useState(item.trackerModel)
    const [imei,setImei]=new useState(item.imei)
    const [sim_number,setSim_number]=new useState(item.sim_number)
    const [matricule,setMatricule]=new useState(item.matricule)
    const [num_chassis,setNum_chassis]=new useState(item.num_chassis)
    const [activation_timer,setActivation_timer]=new useState(item.activation_timer)
    const [plan,setPlan]=new useState(item.plan)
    const [error,setError]=new useState(null)
    const {logout} = useLogout()
    const {user} = useAuthContext()
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
        const vehicule = {
            name,
            trackerModel,
            imei,
            sim_number,
            matricule,
            num_chassis,
            activation_timer,
            plan
        }
        console.log(vehicule)
        const response = await fetch('https://traxy-management-api.vercel.app/api/customervehicules/updatevehicule/'+customerID+'/'+vehiculeID,{
            method: "PUT",
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(vehicule)
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.message._message)
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
            setPlan(0)
            setError(null)
            navigate('/CustomerVehicules')
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
                    <li className={`links-item ${admin ? '' : 'hidden'}`}>Vehicules</li>
                </Link>
                <Link to='/customer-dashboard' style={{ textDecoration: 'none' }}>
                    <li className={`links-item `}>Customers</li>
                </Link>
                <Link to='/UserDash' style={{ textDecoration: 'none' }}>
                    <li className={`links-item ${admin ? '' : 'hidden'}`}>Users</li>
                </Link>
                <Link to='/' onClick={logout} style={{ textDecoration: 'none' }}>
                    <li className={`links-item`}><i className="fa-solid fa-right-from-bracket"></i></li>
                </Link>
            </ul>
        </nav>
        <h1 className='customerDash-main-title' > Update Vehicule </h1>
        <div className="customerForm-container">
            <form className="form-card" onSubmit={handleSubmit}>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Name :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Tracker Model :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setTrackerModel(e.target.value)}} value={trackerModel} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Imei :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setImei(e.target.value)}} value={imei} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Sim Number :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setSim_number(e.target.value)}} value={sim_number} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Matricule :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setMatricule(e.target.value)}} value={matricule} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Num Chasis :
                    </div>
                    <div className="inputContainer">
                        <input type="text" onChange={(e)=>{setNum_chassis(e.target.value)}} value={num_chassis} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="inputs-line">
                    <div className="labelContainer">
                        Abonnement timer :
                    </div>
                    <div className="inputContainer">
                        <input type="number" onChange={(e)=>{setActivation_timer(e.target.value)}} value={activation_timer} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                
                <div className="inputs-line">
                    <div className="labelContainer">
                        Plan :
                    </div>
                    <div className="inputContainer">
                        <input type="number" onChange={(e)=>{setPlan(e.target.value)}} value={plan} className='add-form-input' autoComplete='false' />
                    </div>
                </div>
                <div className="button-holder">
                    <button type='submit' className='button-submit' > Submit the update </button>
                </div>
            </form>

            
            { error &&  <div className='errorMessage'>{error}</div> }
        </div>
    </div>
    )
}

export default VehiculeUpdate