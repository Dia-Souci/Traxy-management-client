import React , {useState} from 'react'
import NavLogo from '../../../images/NavbarLogo.png'
import { Link , useNavigate } from 'react-router-dom'
import { useLogout } from '../../../Hooks/useLogout'
import { useAuthContext } from '../../../Hooks/useAuthContext'


function CreateIntervention() {
  const [msg,setMsg]=new useState('')
  const [dateInter, setDateInter] =  new useState('')
  const {logout} = useLogout()
  const [error,setError]=new useState(null)
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const customerId = localStorage.getItem('customerID')
  let admin = false
    if(user.role === 'admin'){
        admin = true
    }
  const handleSubmit= async (e)=>{
    e.preventDefault()
    if(!user){
        return
    }
    const Intervention = {
        "intervention_date":dateInter,
        "intervention_report":msg
    }
    console.log(Intervention)
    const response = await fetch('https://traxy-management-api.vercel.app/api/interventions/addintervention/'+customerId,{
        method: "POST",
        headers:{
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(Intervention)
    })
    const json = await response.json()
    if(!response.ok){
        setError(json.message._message)
        console.log(error)
    }
    if(response.ok){
        setDateInter('')
        setMsg('')
        setError(null)
        navigate('/intervention')
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
                  <li className={`links-item`}>Customers</li>
              </Link>
              <Link to='/UserDash' style={{ textDecoration: 'none' }}>
                  <li className={`links-item ${admin ? '' : 'hidden'}`}>Users</li>
              </Link>
              <Link to='/'  onClick={logout} style={{ textDecoration: 'none' }}>
                  <li className={`links-item`}><i className="fa-solid fa-right-from-bracket"></i></li>
              </Link>
          </ul>
      </nav>
      <h1 className='customerDash-main-title' > Add New Intervention </h1>
      <div className="customerForm-container">
          <form className="form-card" onSubmit={handleSubmit}>
              
              <div className="inputs-line">
                  <div className="labelContainer">
                      Date :
                  </div>
                  <div className="inputContainer">
                      <input type="date" onChange={(e)=>{setDateInter(e.target.value)}} className='add-form-input' autoComplete='false' required/>
                  </div>
              </div>
              <div className="inputs-line">
                  <div className="labelContainer">
                      Report :
                  </div>
                  <div className="inputContainer">
                      <textarea name="Message_Intervention" id="Msg" onChange={(e)=>{setMsg(e.target.value)}} cols="25" rows="10"></textarea>
                  </div>
              </div>
              
              <div className="button-holder">
                  <button type='submit' className='button-submit' > Submit New Intervention </button>
              </div>
          </form>

          
          { error &&  <div className='errorMessage'>{error}</div> }
      </div>
  </div>
  )
}

export default CreateIntervention