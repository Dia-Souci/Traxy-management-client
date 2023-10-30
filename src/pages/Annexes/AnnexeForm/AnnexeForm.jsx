import React , {useState } from 'react'
import './AnnexeForm.css'

import { Link, useNavigate } from 'react-router-dom';
import LogoUp from '../../../images/Logo contrat@1,5x 1.svg'
import LogoDown from '../../../images/Logo contrat@1,5x 2.svg'
import { useAuthContext } from '../../../Hooks/useAuthContext'
import NavLogo from '../../../images/NavbarLogo.png'
import { useLogout } from '../../../Hooks/useLogout'

function AnnexeForm() {
    const customerID = localStorage.getItem('customerID')
    const customerInfo = JSON.parse(localStorage.getItem('customer'))
    console.log(customerInfo.vehicules)
    
    const navigate = useNavigate()
    /*const customerCars = customerInfo.vehicules*/
    const oldCars = customerInfo.vehicules.filter((veh)=> veh.new === false).length
    const newCars = customerInfo.vehicules.filter((veh)=> veh.new === true).length
    const [error , setError] = useState(null)
    const {user} = useAuthContext()
    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
    const {logout} = useLogout()
    
    const [formData , setFormData] = useState({
        "renouvelement" :"false",
        "nouveau_abonnement" :"false",
        "n_compte_client" : customerID,
        "code_vendeur":user.nss,
        "boutique":"Batna",
        "raison_sociale" :"",
        "tel":"",
        "nom_prenom":"",
        "representation_legale":"false",
        "mondataire":"false",
        
        "cni":"false",
        "passeport":"false",
        "delegation_mondat":"false",
        "n_piece_identite":"",
        "date_emition_carte_national":"",
        "lieu_emission_carte_national":"",
        "bon_commande": "false",
        "autre_a_preciser": "false",
        "nombredegpsactuelle": oldCars,
        "nombredegpsajouter": newCars,
        "nombredegpstotall": (oldCars + newCars),
        "nom_prenom_signature":"",
        "fonction_signature":"",
        
        "user_name":user.username,
        "fonction_signature_user":"Agent Commerciale"
    })
    
    const handleChange = (e) => {
        const { name, value, type, checked, tagName } = e.target;
        
        // Determine the value based on the element type
        let newValue;
        if (type === 'checkbox') {
          newValue = checked;
        } else if (tagName === 'SELECT') {
          // Handle <select> elements
          newValue = value;
        } else {
          newValue = value;
        }
        
        if (( name === 'mondataire') && (newValue === true)){
            setFormData((prevData) => ({
                ...prevData,
              [name]: newValue,
              nom_prenom_signature:formData.nom_prenom,
              }));
        }else{
            setFormData((prevData) => ({
                ...prevData,
                [name]: newValue,
              }));
        }
        
      };
    const handleSubmit= async (e)=>{
        e.preventDefault()
        if(!user){
            return
        }
        
        const customer = formData
        console.log(customer)
        const response = await fetch('https://traxy-management-api.vercel.app/api/annexes/addannexe/'+customerID,{
            method: "POST",
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
            /*setType()*/
            console.log(formData)
            setFormData({
                "representation_legale":"false",
                "mondataire":"false",
                
                "cni":"false",
                "passeport":"false",
                "delegation_mondat":"false",
                "n_piece_identite":"",
                "date_emition_carte_national":"",
                "lieu_emission_carte_national":"",
                "bon_commande": "false",
                "autre_a_preciser": "false",
                "nombredegpsactuelle": oldCars,
                "nombredegpsajouter": newCars,
                "nombredegpstotall": (oldCars + newCars),
                "nom_prenom_signature":"",
                "fonction_signature":"",
                
                "user_name":user.username,
                "fonction_signature_user":"Agent Commerciale"
            })
            setError(null)
            
            navigate('/annexes')
        }
    }
  return (
    <>
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
        <form onSubmit={handleSubmit}>
            <div className="annexe-container" id="pdf">
            <div className="pdf-head">
                <div className="head-txt-section">
                    <div className="contract-title-info">
                        TRX/<strong className=" largetxt">0000{customerID}</strong>/2023
                    </div>
                    <div className="contract-title">
                        Annexe au Contrat
                    </div>
                    
                </div>
                
                <div className="logo">
                    <img src={LogoUp} alt="" />
                </div>
                
            </div>
            <div className="contract-services">
                Offres et Services Entreprises
            </div>
            <div className="contractors-info">
                <div className="type-contrat">
                    <div className="purple-title-part round">
                        Type du contrat
                    </div>
                    <div className="grey-input-part hidden">
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>Renouvellement de l'annexe</p>
                    <div className="check-container">
                        <input type="checkbox"  onChange = {handleChange}  name="renouvelement" id="typeDuContrat1"  />
                    </div>    
                </div>
                <div className="type-contrat-item">
                    <p>Nouvelle annexe</p>
                    <div className="check-container">
                        <input type="checkbox"  onChange = {handleChange} name="nouveau_abonnement" id="typeDuContrat2"  />
                    </div>
                </div>
                <div className="contractor-infos reset" >
                    <div className="purple-title-part" id="purple-no-margin">
                        N° du compte Client
                    </div>
                    <div className="grey-input-part">
                        <input type="number"  onChange = {handleChange} value={`0000${customerID}`} name='n_compte_client' className="inTheGrey" id="textinput1"  autoComplete="off"/>
                    </div>
                </div>
                <div className="contractor-infos reset1">
                    <div className="purple-title-part" >
                        Code Vendeur
                    </div>
                    <div className="grey-input-part" >
                        <input type="number"  onChange = {handleChange} value={user.nss} name='code_vendeur' className="inTheGrey"  id="textinput2" autoComplete="off"/>
                    </div>
                </div>
                <div className="contractor-infos">
                    <div className="purple-title-part">
                        Boutique
                    </div>
                    <div className="grey-input-part" id="long-100">
                        <select name="boutique" onChange={handleChange} id="textinput3">
                            <option value="Batna">Batna</option>
                            <option value="Alger">Alger</option>
                        </select>
                    </div>
                </div>
                
                <div className="contractor-infos reset1">
                    <div className="purple-title-part ">
                        Raison sociale
                    </div>
                    <div className="grey-input-part" id="raisonGray">
                        <input type="text"  onChange = {handleChange}name='raison_sociale'   className="inTheGrey" id="textinput4"  required={true} autoComplete="off"/>
                    </div>
                </div>
                <div className="contractor-infos annexePhone">
                    <div className="purple-title-part">
                        Num Téléphone.
                    </div>
                    <div className="grey-input-part">
                        <input type="tel"  onChange = {handleChange}name='tel' className="inTheGrey" id="textinput15" required={true} autoComplete="off"/>
                    </div>
                </div>
                
                

            </div>
            <div className="societe-title bigger">
                <p>
                    Documents fournis par le signataire (Représentant légal ou son mandataire )
                </p>
            </div>
            <div className="mondataire-container">
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        Nom et Prénom
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="text"  onChange = {handleChange} name='nom_prenom'   className="inTheGrey" id="textinput22"  required={true} autoComplete="off"/>
                    </div>
                </div>
                <div className="twoPlacesDiv">
                    <div className="type-contrat-item smallerFont">
                        <p>Representation légal</p>
                        <div className="check-container">
                            <input type="checkbox"  onChange = {handleChange} name="representation_legale" id="typeDuRepresentation1"  value="Representation légal"/>
                        </div>    
                    </div>
                    <div className="type-contrat-item">
                        <p>Mondataire</p>
                        <div className="check-container">
                            <input type="checkbox"  onChange = {handleChange} name="mondataire" id="typeDuRepresentation2"  value="Mondataire"/>
                        </div>    
                    </div>
                </div>
                
                <div className="type-contrat">
                    <div className="purple-title-part round">
                        Pièces jointes
                    </div>
                    <div className="grey-input-part hidden">
                        <input type="text"  onChange = {handleChange}className="inTheGrey"/>
                    </div>
                </div>
                <div className="fromtwo-end">
                    <div className="type-contrat-item">
                        <p>CNI</p>
                        <div className="check-container">
                            <input type="checkbox"  onChange = {handleChange}name="cni" id="pieceJointe1"    value="CNI"/>
                        </div>    
                    </div>
                    <div className="type-contrat-item">
                        <p>Passeport</p>
                        <div className="check-container">
                            <input type="checkbox"  onChange = {handleChange}name="passeport" id="pieceJointe2"  value="Passeport"/>
                        </div>    
                    </div>
                    <div className="type-contrat-item lastCol">
                        <p>Procuration</p>
                        <div className="check-container">
                            <input type="checkbox"  onChange = {handleChange}name="delegation_mondat" id="pieceJointe3"  value="Délégation de pouvoir / Mondat"/>
                        </div>    
                    </div>
                </div>
                <div className="allOver tri-split">
                    <div className="contractor-infos reset3">
                        <div className="purple-title-part" >
                            N° de pièce d’identité
                        </div>
                        <div className="grey-input-part" >
                            <input type="number"  onChange = {handleChange} name='n_piece_identite' className="inTheGrey" id="textinput25"  required={true} autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Date d’émission
                        </div>
                        <div className="grey-input-part" id="long">
                            <input type="date" onChange = {handleChange} name='date_emition_carte_national' className="inTheGrey" id="textinput26"  autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Lieu d’émission
                        </div>
                        <div className="grey-input-part" id="long">
                            <input type="text"  onChange = {handleChange}name='lieu_emission_carte_national'  className="inTheGrey" id="textinput27"  autoComplete="off"/>
                        </div>
                    </div>
                </div>
                <div className="type-contrat-item two-places">
                    <p>Bon de commande</p>
                    <div className="check-container">
                        <input type="checkbox"  onChange = {handleChange}name="bon_commande" id="BonCommande"  value="Passeport"/>
                    </div>    
                </div>
                <div className="contractor-infos three-places">
                    <div className="purple-title-part" id="short">
                        Autre à préciser
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="text"  onChange = {handleChange}name='autre_a_preciser' className="inTheGrey" id="textinput35" autoComplete="off"/>
                    </div>
                </div>
            </div>
            <div className="societe-title  bigger">
                <p>
                    Partie réservée aux offres Traxy
                </p>
            </div>
            <div className="offre-container">
                <div className="gps-recon">
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short-long">
                            Nombre de <strong className=" largetxt spacealrge"> GPS </strong> Actuelles :
                        </div>
                        <div className="grey-input-part" id="long-short">
                            <input type="number" onChange = {handleChange}  value={formData.nombredegpsactuelle} name='nombredegpsactuelle' className="inTheGrey" id="textinput36"  autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short-long">
                            Nombre de <strong className=" largetxt spacealrge">GPS</strong> rajoutées :
                        </div>
                        <div className="grey-input-part" id="long-short">
                            <input type="number" onChange = {handleChange}  value={formData.nombredegpsajouter} name='nombredegpsajouter' className="inTheGrey" id="textinput37" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short-long">
                            Nouveau nombre de <strong className=" largetxt spacealrge">GPS</strong> :
                        </div>
                        <div className="grey-input-part" id="long-short">
                            <input type="number" onChange = {handleChange}  value={formData.nombredegpstotall} name='nombredegpstotall' className="inTheGrey" id="textinput38" autoComplete="off"/>
                        </div>
                    </div>
                </div>
                <div className="type-contrat-item padd-cont">
                    <p>Offre Basic</p>
                    <div className="check-container">
                        <input type="checkbox"  onChange = {handleChange} name="offre_basic" id="Offre1"  value="Passeport"/>
                    </div>    
                </div>
                <div className="type-contrat-item padd-cont">
                    <p>Offre Standard</p>
                    <div className="check-container">
                        <input type="checkbox"  onChange = {handleChange}name="offre_standard" id="Offre2"  value="Passeport"/>
                    </div>    
                </div>
                <div className="type-contrat-item padd-cont" >
                    <p>Offre Professionel</p>
                    <div className="check-container">
                        <input type="checkbox"  onChange = {handleChange}name="offre_professionel" id="Offre3"  value="Passeport"/>
                    </div>    
                </div>
            </div>
        
            <div className="bold-note2">
                <p>
                    Le contrat est réputé conclu et prend effet à compter de la date de sa signature.
                </p>
            </div>
            <div className="societe-title  bigger">
                <p>
                    Durée de validaté du présent contrat :
                </p>
            </div>
            <div className="triplet-container">
                <div className="timer-sig">  
                    <div className="offer-time">
                        <strong className=" largetxt">6 MOIS</strong> 
                    </div>
                    <div className="signature-space2">
                        <p>Cachet et signature de l’entreprise :</p>
                    </div>
                </div>
                <div className="timer-sig">  
                    <div className="offer-time">
                        <strong className=" largetxt">12 MOIS</strong> 
                    </div>
                    <div className="signature-space2">
                        <p>Cachet et signature de l’entreprise :</p>
                    </div>
                </div>
                <div className="timer-sig">  
                    <div className="offer-time">
                        <strong className=" largetxt">24 MOIS</strong> 
                    </div>
                    <div className="signature-space2">
                        <p>Cachet et signature de l’entreprise :</p>
                    </div>
                </div>

            </div>

            <div className="bold-note2 ">
                <p>
                    Signature du contrat : Je soussigné(e) atteste de la véracité des informations et copies des documents fournis et de leur conformité avec les originaux de la société , Je soussigné(e) déclare avoir lu et appouvé toutes les conditions du conditions du contrat d’Abonnement Entreprise
                </p>
            </div>
            <div className="signatures-container ">
                <div className="client-side">
                    <div className="societe-title">
                        <p>
                            <strong className=" largetxt">Client :</strong>
                        </p>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Nom et prénom:
                        </div>
                        <div className="grey-input-part" id="long">
                            <input type="text"  onChange = {handleChange} value={formData.nom_prenom_signature} name='nom_prenom_signature'   className="inTheGrey" id="textinput32" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos down-space">
                        <div className="purple-title-part" id="short-agence">
                            Fonction :
                        </div>
                        <div className="grey-input-part " id="long-agence">
                            <input type="text"  onChange = {handleChange}name='fonction_signature'   className="inTheGrey" id="textinput33" autoComplete="off"/>
                        </div>
                    </div>
                    
                </div>
                <div className="signature-space">
                    <p>Cachet et signature de l’entreprise :</p>
                </div>
                <div className="firm-side">
                    <div className="societe-title">
                        <p>
                            <strong className=" largetxt">Espace Traxy  :</strong>
                        </p>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Nom et prénom du vendeur :
                        </div>
                        <div className="grey-input-part" id="long">
                            <input type="text"  onChange = {handleChange} value={user.username} name='user_name'  className="inTheGrey"  id="textinput34" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos down-space">
                        <div className="purple-title-part" id="short-agence">
                            Fonction :
                        </div>
                        <div className="grey-input-part" id="long-agence">
                            Commerciale
                        </div>
                    </div>
                    <p className="last">Tout Contrat d’Abonnement doit étre accompagné d’une copie de piéce justificatives 
                        Annexe au Contrat : Chaque peut avoir une ou plusieurs Annexes , chacune d’elles représentant
                        un Contrat de vente de GPS à des heures et dates différentes , soumises au méme régles , clauses et conditions dudit contrat.</p>
                </div>
                <div className="signature-space">
                    <p>Cachet et signature du responsable des ventes :</p>
                </div>
            </div>
            
            <div className="footer ">
                <div className="imgHolder">
                    <img src={LogoDown} alt=""/>
                </div>
                
                <div className="location-info">
                    <p><strong className="largetxt">EURL  Traxy ,</strong></p>

                    <p className="itemN">RC : N°05 / 00-0226065B19        -        NIF   N°01905022606595.  -   Cité Abdouni Boualem-Iot   N°05 Dar El Beida  / Alger. -  Les pins Maritime  N°215 - Mohammadia  /  Alger. -Cité 410 logts-Ecotec en face CUB  /  Batna. <br/> <strong className="largetxt">www.traxy.info</strong> </p>
                                                                                                                                                                

                    
                </div>
                <div className="website">
                    <p></p>
                </div>
                
                
            </div>
        </div>
        <div className="buttoncnt">
            <button>Submit</button>
        </div>
        
        </form>
    </>
  )
}

export default AnnexeForm