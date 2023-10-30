import React , { useState ,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './userDash.css'
import NavLogo from '../../images/NavbarLogo.png'
import PlusSign from '../../images/plus.png'
import { useLogout } from '../../Hooks/useLogout'
import { useAuthContext } from '../../Hooks/useAuthContext'


function UserDash() {

    const [userData , setuserData] = new useState([])
    const {logout} = useLogout()
    const {user } = useAuthContext()
    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
    useEffect(()=>{
        const fetchUserData = async () =>{
            const response = await fetch(`https://traxy-management-api.vercel.app/api/users/allusers`,{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json.users)

            if(response.ok){
                setuserData(json.users)
            }
        }
        if(user){
            fetchUserData()
        }
        
    },[setuserData ,user])
    const [search3,setsearch3] = new useState('')
  return (
    <div className='Dashboard-user-main-container'>
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
                    <li className={`links-item selected ${admin ? '' : 'hidden'}`}>Users</li>
                </Link>
                <Link to='/' onClick={logout} style={{ textDecoration: 'none' }}>
                    <li className={`links-item`}><i className="fa-solid fa-right-from-bracket"></i></li>
                </Link>
        </ul>
    </nav>

    <div className="userDash-container">
        <div className="userDash-headSection">
            <h1 className='userDash-main-title'>users Dashboard</h1>
            <div className="searchAndbtn-container">
                <Link to='/Createuser' style={{ textDecoration: 'none' }}>
                    <div className="btn-add-user">
                        <p>Add New user</p>
                        <img 
                            src={PlusSign}
                            alt="" 
                        />
                    </div>
                </Link>
                <div className="SearchBar">
                    <input type="text" className='search-input' placeholder='Filter by Name' onChange={(e)=>{
                        setsearch3(e.target.value)
                    }} autoComplete='false'/>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <div className="tablecontainerTocenter">
                <div className="userTableofData">
                    <div className="tableheadline3">
                        <div className="headElem3">
                            ID
                        </div>
                        <div className="headElem3 threeGridPlaces">
                            USERNAME
                        </div>
                        <div className="headElem3 twoGridPlaces">
                            NSS
                        </div>
                        <div className="headElem3 threeGridPlaces">
                            ROLE
                        </div>
                        <div className="headElem3 twoGridPlaces">
                            PASSWORD
                        </div>
                        <div className="headElem3 fourGridPlaces">
                            BOUTIQUE
                        </div>
                        
                        <div className="Corner-head threeGridPlaces">

                        </div>
                    </div>
                    {
                        userData.filter((item)=> {
                            return search3.toLowerCase() === '' ? item : 
                            item.username.toLowerCase().includes(search3.toLowerCase())
                        }).map((item)=>(
                            <div className="tableElementLine3" key={item._id} id={item._id}>
                                <div className="tableElem3">
                                    {item._id}
                                </div>
                                <div className="tableElem3 threeGridPlaces">
                                    {item.username} 
                                </div>
                                <div className="tableElem3 twoGridPlaces">
                                    {item.NSS}
                                </div>
                                <div className="tableElem3 threeGridPlaces">
                                    {item.role}
                                </div>
                                <div className="tableElem3 twoGridPlaces">
                                    {item.password}
                                </div>
                                
                                <div className="tableElem3 fourGridPlaces">
                                    {item.boutique}
                                </div>
                                <div className="buttonOfNavigationInTable threeGridPlaces">
                                    <div className="settingsButton">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </div>
                                    <div className="DeleteBtn">
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
    </div>
  )
}

export default UserDash