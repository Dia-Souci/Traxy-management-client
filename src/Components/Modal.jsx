import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import './Modal.css'
import Settings from '../images/settings.png'



function Modal({itemId}) {
    const [modal , setModal] = useState(false)
    const toggleModal = ()=>{
        setModal(!modal)
    }
  return (
    <>
    {modal && (<div className='overlay' onClick={toggleModal}>
            <div className='Modal-container' >
                <div className="settingsButton">
                    <img 
                        src={Settings}
                        alt="Settings" 
                    />
                </div>
                <div className="buttoncnt top-modal-marg">
                    <Link to='/Contracts' style={{ textDecoration: 'none' }}>
                        <button>Contract</button>
                    </Link>
                    <Link to='/Annexes' style={{ textDecoration: 'none' }}>
                        <button>Annexe</button>
                    </Link>
                    <Link to='/intervention' style={{ textDecoration: 'none' }}>
                        <button>Intervention</button>
                    </Link>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <button>Edit Customer</button>
                    </Link>
                </div>
                <button className="close" onClick={toggleModal}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>
        </div>)}
        
    </>
    
  )
}

export default Modal