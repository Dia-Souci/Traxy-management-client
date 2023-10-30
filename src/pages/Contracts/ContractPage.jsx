import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import './ContractPage.css'
import NavLogo from '../../images/NavbarLogo.png'
import PlusSign from '../../images/plus.png'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useLogout } from '../../Hooks/useLogout'
import { useAuthContext } from '../../Hooks/useAuthContext'

function ContractPage() {
    const [contracts,setConstracts] =useState([])
    const {user} = useAuthContext()
    const {logout} = useLogout()
    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
    useEffect(()=>{
        const customerID = localStorage.getItem('customerID')
        const fetchCustomerData = async () =>{
            const response = await fetch(`https://traxy-management-api.vercel.app/api/contracts/getCustomersContracts/${customerID}` , {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json)

            if(response.ok){
                setConstracts(json.Contracts)
            }
        }
        if(user){
            fetchCustomerData()
        }
        
    },[setConstracts,user])
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
                <Link to='/'  onClick={logout} style={{ textDecoration: 'none' }}>
                    <li className={`links-item`}><i className="fa-solid fa-right-from-bracket"></i></li>
                </Link>
            </ul>
        </nav>
        <div className="vehiculeDash-container">
            <div className="vehiculeDash-headSection">
                <h1 className='vehiculeDash-main-title'>Contract list</h1>
                <div className="searchAndbtn-container">
                    <Link to='/ContractForm' style={{ textDecoration: 'none' }}>
                        <div className="btn-add-vehicule">
                            <p>Add New Contract</p>
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
                <div className="contractContainer">
                    {contracts.length === 0 ? (
                        <div className="allCustomersUpToDate">
                        <p>No Contracts for this user <br />
                            Please Add a contract
                        </p>
                        </div>
                    ) :
                        contracts.map((item)=>(
                            <div className="contract" key={item._id}>
                                <Link to={'/contractPrint'} style={{ textDecoration: 'none' , color:'#fff' , fontWeight : '700'}}>
                                    <div className="contractinfo"  onClick={()=>{
                                        localStorage.setItem('contractID',null)
                                        localStorage.setItem('contractID',item._id)
                                    }}>
                                        <div className="title">
                                            Contract {item._id}
                                        </div>
                                        <div className="dateAndDetails">
                                            Created : {formatDistanceToNow(new Date(item.createdAt) , {addSuffix : true})}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                    
                </div>
                
            </div>
            
        </div>
    </div>
  )
}

export default ContractPage