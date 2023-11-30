import React , { useState ,useEffect }from 'react'
import { Link } from 'react-router-dom'
import './customerDash.css'
import '../../Components/Modal.css'
import NavLogo from '../../images/NavbarLogo.png'
import PlusSign from '../../images/plus.png'
import Settings from '../../images/settings.png'
import { useLogout } from '../../Hooks/useLogout'
import { useAuthContext } from '../../Hooks/useAuthContext'
/*import Modal from '../../Components/Modal'*/
/*import { data } from '../../data'*/

function CustomerDash() {
    const [modalId , setModalId] = useState(null)
    const [modal , setModal] = useState(false)
    const {logout} = useLogout()
    const {user} = useAuthContext()
    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
    const closeModal = ()=>{
        setModal(false)
        setModalId(null)
        
    }
    const openModal = ()=>{
        
        setModal(true)
    }
    const handleDelete = async (id) =>{
        if(!user){
            return
        }
        await fetch('https://traxy-management-api.vercel.app/api/customers/single/'+id,{
            method: "DELETE",
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        
    }
    const [tableData , setTableData] = new useState([])
    useEffect(()=>{
        const fetchCustomerData = async () =>{
            const response = await fetch(`https://traxy-management-api.vercel.app/api/customers/all`,{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json)

            if(response.ok){
                setTableData(json.customers)
            }
        }
        fetchCustomerData()
        
    },[setTableData , user])
    const [search,setSearch] = new useState('')
    
  return (
    <div className='Dashboard-customer-main-container'>
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
        <div className="customerDash-container">
            <div className="customerDash-headSection">
                <h1 className='customerDash-main-title'>Customers Dashboard</h1>
                <div className="searchAndbtn-container">
                    <Link to='/Createcustomer' style={{ textDecoration: 'none' }}>
                        <div className="btn-add-customer">
                            <p>Add New Customer</p>
                            <img 
                                src={PlusSign}
                                alt="" 
                            />
                        </div>
                    </Link>
                    <div className="SearchBar">
                        <input type="text" className='search-input' placeholder='Filter by Name' onChange={(e)=>{
                            setSearch(e.target.value)
                        }} autoComplete='false'/>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="customerTableofData">
                    <div className="tableheadline" >
                        <div className="headElem">
                            ID
                        </div>
                        <div className="headElem threeGridPlaces">
                           NAME 
                        </div>
                        <div className="headElem twoGridPlaces">
                            PHONE
                        </div>
                        <div className="headElem fourGridPlaces">
                            EMAIL
                        </div>
                        <div className="headElem twoGridPlaces">
                            PASSWORD
                        </div>
                        <div className="headElem threeGridPlaces">
                            VEHICULE NUMBER
                        </div>
                        <div className="headElem twoGridPlaces">
                            BALANCE
                        </div>
                        <div className="headElem twoGridPlaces">
                            STATUS
                        </div>
                        <div className="Corner-head threeGridPlaces">

                        </div>
                    </div>
                    {
                        tableData.filter((item)=> {
                            return search.toLowerCase() === '' ? item : 
                            item.name.toLowerCase().includes(search.toLowerCase())
                        }).map((item)=>(
                            <div className="tableElementLine" key={item._id}>
                                <div className="tableElem">
                                    {item._id}
                                </div>
                                <div className="tableElem threeGridPlaces">
                                    {item.name} 
                                </div>
                                <div className="tableElem twoGridPlaces">
                                    {item.phone}
                                </div>
                                <div className="tableElem fourGridPlaces">
                                    {item.email}
                                </div>
                                <div className="tableElem twoGridPlaces">
                                    {item.password}
                                </div>
                                <div className="tableElem threeGridPlaces">
                                    {item.vehicule_number}
                                </div>
                                <div className="tableElem twoGridPlaces">
                                    {item.balance}
                                </div>
                                <div className="tableElem twoGridPlaces">
                                    <span style={{ color: item.balance < 900 ? 'red' : 'green' }}>
                                        {item.balance < 900  ? 'On Hold' : 'On Going'}
                                    </span>
                                </div>
                                
                                <div className="buttonOfNavigationInTable threeGridPlaces">
                                    <div className="settingsButton" onClick={()=>{
                                        localStorage.setItem('customerID',null)
                                        localStorage.setItem('customerID',item._id)
                                        localStorage.setItem('customer',null)
                                        localStorage.setItem('customer',JSON.stringify(item))
                                        setModalId(item._id)
                                        console.log(modalId)
                                        openModal()
                                    }}>
                                        <img 
                                            src={Settings}
                                            alt="" 
                                        />
                                    </div>
                                    <div className={`DeleteBtn ${admin ? '' : 'hidden'}`} onClick={()=>{handleDelete(item._id)}}>
                                        <i className="fa-solid fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
            <div className="sidebar-customerDash">
                <h1 className='customerDash-main-title red'>On hold accounts</h1>
                {   tableData.filter((item) => item.balance <900 ).length === 0 ? (
                        <div className="allCustomersUpToDate">
                        <p>All customers up to date</p>
                        </div>
                    ) : 
                    tableData.filter((item)=> item.balance <900 ).map((item)=>(
                        <div className="accountRestricted" key={`OnHold_${item._id}`}>
                            <p> Account is on hold : </p>
                            <a className='anchorItem' href={`#${item._id}`}>{item.name}</a>
                            <p>{item.phone}</p>
                        </div>
                    ))
                }
                
            </div>
        </div>
        <>
        {modal && (<div className='overlay' onClick={closeModal}>
                <div className='Modal-container' >
                    <div className="settingsButton">
                        <img 
                            src={Settings}
                            alt="Settings" 
                        />
                    </div>
                    <div className="buttoncnt top-modal-marg">
                        <Link to='/Contracts'  style={{ textDecoration: 'none' }}>
                            <button>Contract</button>
                        </Link>

                        <Link to='/customervehicules' style={{ textDecoration: 'none' }}>
                            <button>linked vehicules</button>
                        </Link>

                        <Link to='/Annexes' style={{ textDecoration: 'none' }}>
                            <button>Annexe</button>
                        </Link>
                        
                        <Link to='/intervention' style={{ textDecoration: 'none' }}>
                            <button>Interventions</button>
                        </Link>
                        <Link to={`/Updatecustomer`} className={`${admin ? '' : 'hidden'}`} style={{ textDecoration: 'none' }}>
                            <button>Edit Customer</button>
                        </Link>
                        <Link to='/Terms' style={{ textDecoration: 'none' }}>
                            <button>Terms</button>
                        </Link>
                    </div>
                    <button className="close" onClick={closeModal}>
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>
            </div>)}
        
    </>
    </div>
  )
}

export default CustomerDash