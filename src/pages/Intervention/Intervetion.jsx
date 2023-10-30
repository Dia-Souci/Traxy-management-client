import React  ,{useState , useEffect}from 'react'
import './intervention.css'
import { Link } from 'react-router-dom'
import NavLogo from '../../images/NavbarLogo.png'
import PlusSign from '../../images/plus.png'
import { useLogout } from '../../Hooks/useLogout'
import { useAuthContext } from '../../Hooks/useAuthContext'


function Intervetion() {
    const [interventions,setInterventions] = useState([])
    
    const customerID = localStorage.getItem('customerID')
    const {logout} = useLogout()
    const {user} = useAuthContext()
    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
    useEffect(()=>{
        const getIntervention = async ()=>{
            const response = await fetch('https://traxy-management-api.vercel.app/api/interventions/getCustomersinterventions/'+customerID,{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json.interventions)

            if(response.ok){
                setInterventions(json.interventions)
            }
        }
        if(user){
            getIntervention()
        }
    },[customerID,user])
  return (
    <div>
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
                <h1 className='vehiculeDash-main-title'>Interventions</h1>
                <div className="searchAndbtn-container">
                    <Link to='/Createintervention' style={{ textDecoration: 'none' }}>
                        <div className="btn-add-vehicule">
                            <p>Add New intervention</p>
                            <img 
                                src={PlusSign}
                                alt="" 
                            />
                        </div>
                    </Link>
                    <div className="SearchBar">
                        <input type="text" className='search-input' placeholder='Filter by Name'  autoComplete='false'/>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="interventions-container">
                    {
                        interventions.length === 0 ? 'No Interventions for this customer' : interventions.map((intervention)=>(
                            <div className="intervention-card" key={intervention._id}>
                                <div className="headSection-intervention">
                                    Date: {intervention.intervention_date}
                                </div>
                                <div className="interventionContent">
                                    Msg : {intervention.intervention_report}
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

export default Intervetion