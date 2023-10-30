import React , { useState ,useEffect } from 'react'
import NavLogo from '../../images/NavbarLogo.png'
import PlusSign from '../../images/plus.png'
import { Link , useNavigate } from 'react-router-dom'
import { useLogout } from '../../Hooks/useLogout'
import { useAuthContext } from '../../Hooks/useAuthContext'


function CustomerVehiculeDash() {
    const [vehiculeData , setvehiculeData] = new useState([])
    const customerID = localStorage.getItem('customerID')
    const {logout} = useLogout()
    const {user} =useAuthContext()
    const navigate = useNavigate()

    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
    useEffect(()=>{
        const fetchVehiculeData = async () =>{
            const response = await fetch(`https://traxy-management-api.vercel.app/api/customervehicules/getCustomersvehicules/${customerID}`,{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json.vehicules)

            if(response.ok){
                setvehiculeData(json.vehicules)
            }
        }
        if(user){
            fetchVehiculeData()
        }
        
    },[setvehiculeData,customerID ,user])
    const [search2,setsearch2] = new useState('')
    const handleDelete = async (id , customer) =>{
        if(!user){
            return
        }
        await fetch('https://traxy-management-api.vercel.app/api/customervehicules/deletevehicule/'+customer+'/'+id,{
            method: "DELETE",
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        
    }
  return (
    <div className='Dashboard-vehicule-main-container'>
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

        <div className="vehiculeDash-container">
            <div className="vehiculeDash-headSection">
                <h1 className='vehiculeDash-main-title'>Customer Vehicules Dashboard</h1>
                <div className="searchAndbtn-container">
                    <Link to='/CreatevehiculeForCustomer' style={{ textDecoration: 'none' }}>
                        <div className="btn-add-vehicule">
                            <p>Add New Vehicule</p>
                            <img 
                                src={PlusSign}
                                alt="" 
                            />
                        </div>
                    </Link>
                    <div className="SearchBar">
                        <input type="text" className='search-input' placeholder='Filter by Name' onChange={(e)=>{
                            setsearch2(e.target.value)
                        }} autoComplete='false'/>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="vehiculeTableofData">
                    <div className="tableheadline2">
                        <div className="headElem2">
                            ID
                        </div>
                        <div className="headElem2 threeGridPlaces">
                            Vehicle Name
                        </div>
                        <div className="headElem2 twoGridPlaces">
                            Tracker Model
                        </div>
                        <div className="headElem2 twoGridPlaces">
                            IMEI
                        </div>
                        <div className="headElem2 twoGridPlaces">
                            SIM Number
                        </div>
                        <div className="headElem2 fourGridPlaces">
                            Matricule
                        </div>
                        <div className="headElem2 twoGridPlaces">
                            Num Chassis
                        </div>
                        <div className="headElem2 twoGridPlaces">
                            Activation Date
                        </div>
                        <div className="headElem2 twoGridPlaces">
                            Abonnement
                        </div>
                        <div className="headElem2 twoGridPlaces">
                            Plan
                        </div>
                        <div className="Corner-head threeGridPlaces">

                        </div>
                    </div>
                    {
                        vehiculeData.filter((item)=> {
                            return search2.toLowerCase() === '' ? item : 
                            item.name.toLowerCase().includes(search2.toLowerCase())
                        }).map((item)=>(
                            <div className="tableElementLine2" key={item._id} id={item._id}>
                                <div className="tableElem2">
                                    {item._id}
                                </div>
                                <div className="tableElem2 threeGridPlaces">
                                    {item.name} 
                                </div>
                                <div className="tableElem2 twoGridPlaces">
                                    {item.trackerModel}
                                </div>
                                <div className="tableElem2 twoGridPlaces">
                                    {item.imei}
                                </div>
                                <div className="tableElem2 twoGridPlaces">
                                    {item.sim_number}
                                </div>
                                <div className="tableElem2 fourGridPlaces">
                                    {item.matricule}
                                </div>
                                <div className="tableElem2 twoGridPlaces">
                                    {item.num_chassis}
                                </div>
                                <div className="tableElem2 twoGridPlaces">
                                    {item.activation_date}
                                </div>
                                <div className="tableElem2 twoGridPlaces">
                                    {item.activation_timer}
                                </div>
                                <div className="tableElem2 twoGridPlaces">
                                    {item.plan}
                                </div>
                                <div className="buttonOfNavigationInTable threeGridPlaces">
                                    <div className="settingsButton" onClick={()=>{
                                        localStorage.setItem('vehiculeID',null)
                                        localStorage.setItem('vehiculeID',item._id)
                                        localStorage.setItem('vehicule',null)
                                        localStorage.setItem('vehicule',JSON.stringify(item))
                                        navigate('/Updatevehicule')
                                    }}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    </div>
                                    <div className={`DeleteBtn ${admin ? '' : 'hidden'}`} onClick={()=>{
                                        handleDelete(item._id , customerID)  
                                    }} >
                                        <i className="fa-solid fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default CustomerVehiculeDash