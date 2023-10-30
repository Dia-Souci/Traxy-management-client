import React from 'react'
import {useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import './ContractForm.css'
import LogoUp from '../../../images/Logo contrat@1,5x 1.svg'
import LogoDown from '../../../images/Logo contrat@1,5x 2.svg'
import NavLogo from '../../../images/NavbarLogo.png'
import { useLogout } from '../../../Hooks/useLogout'
import { useAuthContext } from '../../../Hooks/useAuthContext'

function ContractForm() {
    
    const customerID = localStorage.getItem('customerID')
    const {user } = useAuthContext()
    const navigate = useNavigate()
    const {logout} = useLogout()
    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
    
    const [formData , setFormData] = useState({
    "renouvelement" :"false",
    "nouveau_abonnement" :"false",
    "n_compte_client" : customerID,
    "code_vendeur":user.nss,
    "boutique":"Batna",
    "raison_sociale" :"",
    "spa" : "false",
    "sarl" : "false",
    "eurl":"false",
    "autreType" : "false",
    "n_registre_commerce":"",
    "date_creation_rc": "",
    "n_identite_fiscale":"",
    "n_article_imposition":"",
    "secteur_activite" : "transport",
    "nombre_vehicule":0,
    "adresse":"",
    "code_postal":"",
    "commune":"",
    "wilaya":"",
    "tel":"",
    "fax":"",
    "e_mail":'',
    "n_compte_bancaire":"",
    "nom_banque":"",
    "agence":"",
    "adresse_banque":"",
    "nom_prenom":" ",
    "representation_legale":"false",
    "mondataire":"false",
    "date_naissance":"",
    "nationalite":" ",
    "cni":"false",
    "passeport":"false",
    "delegation_mondat":"false",
    "n_piece_identite":"",
    "date_emition_carte_national":"",
    "lieu_emission_carte_national":"",
    "nom_prenom2":"",
    "fonction":"",
    "tel2":"",
    "e_mail2":'',
    "entre_rc":"false",
    "entre_nis":"false",
    "entre_nif":"false",
    "entre_ai":"false",
    "entre_mf":"false",
    "nom_prenom_tableau":'',
    "fonction_tableau":"",
    "email_tableau":"",
    "password_tableau":"888888s3",
    "tel_tableau":"",
    "nom_prenom_signature": '',
    "fonction_signature":"",
    
    "user_name":user.username,
    "fonction_signature_user":"Agent Commerciale"
    })
    const [error , setError] = useState(null)
    
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
        if (name === 'e_mail') {
            setFormData((prevData) => ({
              ...prevData,
              [name]: newValue,
              e_mail2: newValue,
              email_tableau: newValue,
            }));
          } else if (( name === 'mondataire') && (newValue === true)){
            setFormData((prevData) => ({
                ...prevData,
              [name]: newValue,
              nom_prenom2:formData.nom_prenom,
              nom_prenom_tableau:formData.nom_prenom,
              nom_prenom_signature:formData.nom_prenom,
              }));
          } else if ( name === 'tel2'){
            setFormData((prevData) => ({
                ...prevData,
                [name]: newValue,
                tel_tableau : newValue
              }));
          } else if ( name === 'fonction'){
            setFormData((prevData) => ({
                ...prevData,
                [name]: newValue,
                fonction_tableau : newValue,
                fonction_signature: newValue
              }));
          }else {
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
        const response = await fetch('https://traxy-management-api.vercel.app/api/contracts/addcontract/'+customerID,{
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
            setFormData({})

            setError(null)
            navigate('/contracts')
            
        }
    }

  return (
    <div className='form-container'>
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
                <Link to='/' onClick={logout} style={{ textDecoration: 'none' }}>
                    <li className={`links-item`}><i className="fa-solid fa-right-from-bracket"></i></li>
                </Link>
            </ul>
        </nav>
        <form onSubmit={handleSubmit}>
        <div className="articlePDF" id="pdf">
            <div className="pdf-head">
                <div className="head-txt-section">
                    <div className="contract-title-info">
                        TRX/
                        <strong className=" largetxt">00000{customerID}</strong>/2023
                    </div>
                    <div className="contract-title">
                        Contrat de location de balises Géolocation
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
                    <p>Renouvellement du contrat</p>
                    <div className="check-container">
                        <input type="checkbox"   onChange = {handleChange}  name="renouvelement" id="typeDuContrat1"  value="Renouvellement du contrat" />
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>Nouveau abonnement</p>
                    <div className="check-container">
                        <input type="checkbox"   onChange = {handleChange} name="nouveau_abonnement" id="typeDuContrat2"  value="Nouveau abonnement" />
                    </div>
                </div>
                <div className="contractor-infos reset">
                    <div className="purple-title-part" id="purple-no-margin">
                        N° du compte Client
                    </div>
                    <div className="grey-input-part">
                        <input type="number"   onChange = {handleChange} className="inTheGrey" value={`00000${customerID}`} id="textinput1" name="n_compte_client" autoComplete="off"  />
                    </div>
                </div>
                <div className="contractor-infos reset1">
                    <div className="purple-title-part">
                        Code Vendeur
                    </div>
                    <div className="grey-input-part">
                        <input type="number"   onChange = {handleChange} value={user.nss} className="inTheGrey" id="textinput2"  name="code_vendeur" autoComplete="off"/>
                    </div>
                </div>
                <div className="contractor-infos">
                    <div className="purple-title-part">
                        Boutique
                    </div>
                    <div className="grey-input-part">
                        <select name="boutique" onChange={handleChange} id="textinput3">
                            <option value="Batna">Batna</option>
                            <option value="Alger">Alger</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="societe-title">
                <p>
                    Informations sur la société
                </p>
            </div>
            <div className="societe-info-container">
                <div className="contractor-infos raison-sociale reset1 ">
                    <div className="purple-title-part">
                        Raison sociale
                    </div>
                    <div className="grey-input-part orange" id="raisonGray">
                        <input type="text"  onChange = {handleChange} className="inTheGrey" id="textinput4"  name="raison_sociale"  required autoComplete="off" />
                    </div>
                </div>
                <div className="multi-check-container">
    <div className="type-contrat-item">
        <p>SPA</p>
        <div className="check-container orange">
            <input type="checkbox"   onChange = {handleChange} name="spa" id="typeDuSociete1"  value="SPA"/>
        </div>
    </div>
    <div className="type-contrat-item">
        <p>SARL</p>
        <div className="check-container orange">
            <input type="checkbox"   onChange = {handleChange} name="sarl" id="typeDuSociete2" value="SARL"/>
        </div>
    </div>
    <div className="type-contrat-item">
        <p>EURL</p>
        <div className="check-container orange">
            <input type="checkbox"   onChange = {handleChange} name="eurl" id="typeDuSociete3"  value="EURL"/>
        </div>
    </div>
    <div className="type-contrat-item">
        <p>Autre</p>
        <div className="check-container orange">
            <input type="checkbox"   onChange = {handleChange} name="autreType" id="typeDuSociete4"  value="Autre"/>
        </div>
    </div>
</div>
            
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        N° de registre de commerce
                    </div>
                    <div className="grey-input-part orange" id="long">
                        <input type="text"  onChange = {handleChange} className="inTheGrey" id="textinput5" name="n_registre_commerce" required autoComplete="off" />
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Date de création
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="date"  onChange = {handleChange} className="inTheGrey" id="textinput6" name="date_creation_rc"  autoComplete="off" />
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        N° d’identification fiscale
                    </div>
                    <div className="grey-input-part orange" id="long">
                        <input type="number"  onChange = {handleChange} className="inTheGrey" id="textinput7" name="n_identite_fiscale"  required autoComplete="off" />
                    </div>
                </div>
                <div className="contractor-infos tillLast smallerFont">
                    <div className="purple-title-part" id="short">
                        N° d’article d’imposition
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="text"  onChange = {handleChange} className="inTheGrey" id="textinput8"  name="n_article_imposition" autoComplete="off" />
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        Secteur d’activité
                    </div>
                    <div className="grey-input-part" id="long">
                        <select name="secteur_activite" onChange={handleChange} id="textinput9">
                            <option value="Transport">Transport</option>
                            <option value="Livraison">Livraison</option>
                            <option value="Location">Location</option>
                            <option value="VehiculeService">Véhicule de Service</option>
                        </select>
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Nombre de véhicule
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="number"   onChange = {handleChange} className="inTheGrey"  id="textinput10" name="nombre_vehicule" autoComplete="off"/>
                    </div>
                </div>
                <div className="contractor-infos allOver reset2">
                    <div className="purple-title-part">
                        Adresse
                    </div>
                    <div className="grey-input-part">
                        <input type="text"  onChange = {handleChange} className="inTheGrey" id="textinput11"  name="adresse" autoComplete="off"/>
                    </div>
                </div>
                <div className="allOver tri-split">
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Code postal
                        </div>
                        <div className="grey-input-part" id="long">
                            <input type="number"   onChange = {handleChange} className="inTheGrey" id="textinput12"  name="code_postal" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Commune
                        </div>
                        <div className="grey-input-part orange" id="long">
                            <input type="text"  onChange = {handleChange} className="inTheGrey" id="textinput13" name="commune" required autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos ">
                        <div className="purple-title-part" id="short">
                            Wilaya
                        </div>
                        <div className="grey-input-part orange" id="long">
                            <input type="text"  onChange = {handleChange} className="inTheGrey" id="textinput14"  name="wilaya" required autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos ">
                        <div className="purple-title-part" id="short">
                            Tél.
                        </div>
                        <div className="grey-input-part orange" id="long">
                            <input type="number"  onChange = {handleChange} className="inTheGrey" id="textinput15"  name="tel" required autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos ">
                        <div className="purple-title-part" id="short">
                            Fax
                        </div>
                        <div className="grey-input-part" id="long">
                            <input type="number"  onChange = {handleChange} className="inTheGrey" id="textinput16"  name="fax" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos ">
                        <div className="purple-title-part" id="short">
                            E-mail
                        </div>
                        <div className="grey-input-part" id="long">
                            <input type="email"  onChange = {handleChange} value={formData.e_mail} className="inTheGrey" id="textinput17"  name="e_mail" autoComplete="off"/>
                        </div>
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        N° de compte Bancaire
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="number"   onChange = {handleChange} className="inTheGrey" id="textinput18"   name="n_compte_bancaire" autoComplete="off"/>
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Nom de la banque
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="text"  onChange = {handleChange} className="inTheGrey" id="textinput19"  name="nom_banque" autoComplete="off"/>
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short-agence">
                        Agence
                    </div>
                    <div className="grey-input-part" id="long-agence">
                        <input type="number"  onChange = {handleChange} className="inTheGrey" id="textinput20" name="agence" autoComplete="off"/>
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Adresse
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="text"  onChange = {handleChange} className="inTheGrey" id="textinput21"  name="adresse_banque" autoComplete="off"/>
                    </div>
                </div>

            </div>
            <div className="societe-title">
                <p>
                    Informations du représentant légal ou son mandataire
                </p>
            </div>
            <div className="mondataire-container">
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        Nom et Prénom
                    </div>
                    <div className="grey-input-part orange" id="long">
                        <input type="text"  onChange = {handleChange} value={formData.nom_prenom} className="inTheGrey" id="textinput22"  name="nom_prenom" required autoComplete="off"/>
                    </div>
                </div>
                <div className="twoPlacesDiv">
                    <div className="type-contrat-item smallerFont">
                        <p>Representation légal</p>
                        <div className="check-container">
                            <input type="checkbox"   onChange = {handleChange} name="representation_legale"  id="typeDuRepresentation1" value="Representation légal"/>
                        </div>
                    </div>
                    <div className="type-contrat-item">
                        <p>Mondataire</p>
                        <div className="check-container">
                            <input type="checkbox"   onChange = {handleChange} name="mondataire"  id="typeDuRepresentation2" value="Mondataire"/>
                        </div>
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        Date de naissance
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="date"  onChange = {handleChange} className="inTheGrey" id="textinput23"  name="date_naissance" autoComplete="off"/>
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Nationalité
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="text"  onChange = {handleChange} className="inTheGrey" id="textinput24" name="nationalite" autoComplete="off"/>
                    </div>
                </div>
                <div className="type-contrat">
                    <div className="purple-title-part round">
                        Pièces jointes
                    </div>
                    <div className="grey-input-part hidden">
                        <input type="text"  onChange = {handleChange} className="inTheGrey"/>
                    </div>
                </div>
                <div className="fromtwo-end">
                    <div className="type-contrat-item">
                        <p>CNI</p>
                        <div className="check-container">
                            <input type="checkbox"   onChange = {handleChange} name="cni" id="pieceJointe1" value="CNI"/>
                        </div>
                    </div>
                    <div className="type-contrat-item">
                        <p>Passeport</p>
                        <div className="check-container">
                            <input type="checkbox"   onChange = {handleChange} name="passeport"  id="pieceJointe2" value="Passeport"/>
                        </div>
                    </div>
                    <div className="type-contrat-item lastCol">
                        <p>Délégation de pouvoir / Mondat</p>
                        <div className="check-container">
                            <input type="checkbox"   onChange = {handleChange} name="delegation_mondat" id="pieceJointe3" value='mondat'/>
                        </div>
                    </div>
                </div>
                <div className="allOver tri-split">
                    <div className="contractor-infos reset3">
                        <div className="purple-title-part">
                            N° de pièce d’identité
                        </div>
                        <div className="grey-input-part orange largerGrey">
                            <input type="number"   onChange = {handleChange} className="inTheGrey" id="textinput25"  name="n_piece_identite" required autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Date d’émission
                        </div>
                        <div className="grey-input-part" id="long">
                            <input type="date"  onChange = {handleChange} className="inTheGrey" id="textinput26"  name="date_emition_carte_national" autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Lieu d’émission
                        </div>
                        <div className="grey-input-part" id="long">
                            <input type="text"  onChange = {handleChange} className="inTheGrey" id="textinput27"  name="lieu_emission_carte_national" autoComplete="off"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="societe-title">
                <p>
                    Personne à contacter pour paiment ou autre
                </p>
            </div>
            <div className="contact-container">
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short-agence">
                        Nom et Prénom
                    </div>
                    <div className="grey-input-part orange" id="long-agence">
                        <input type="text"  onChange = {handleChange} value={formData.nom_prenom2} className="inTheGrey" name='nom_prenom2' id="textinput28"  autoComplete="off" required/>
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Fonction :
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="text"  onChange = {handleChange} className="inTheGrey" name="fonction"  id="textinput29" autoComplete="off"/>
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short-agence">
                        Téléphone :
                    </div>
                    <div className="grey-input-part orange" id="long-agence">
                        <input type="number"  onChange = {handleChange}  className="inTheGrey" name='tel2' id="textinput30"  required autoComplete="off"/>
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        E-mail :
                    </div>
                    <div className="grey-input-part" id="long">
                        <input type="email"  onChange = {handleChange} value={formData.e_mail2} className="inTheGrey" name='e_mail2' id="textinput31"  autoComplete="off"/>
                    </div>
                </div>
            </div>
            <div className="societe-title">
                <p>
                    Pièces justificatives
                </p>
            </div>
            <div className="societe-title">
                <p>
                    <strong className=" largetxt">
                        Entreprise
                    </strong>
                </p>
            </div>
            <div className="pieces-container ">
                <div className="type-contrat-item pad">
                    <p>RC</p>
                    <div className="check-container">
                        <input type="checkbox"   onChange = {handleChange} name="entre_rc" id="entreprise1" value="RC"/>
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>NIS</p>
                    <div className="check-container">
                        <input type="checkbox"   onChange = {handleChange} name="entre_nis" id="entreprise2" value="NIS"/>
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>NIF</p>
                    <div className="check-container">
                        <input type="checkbox"   onChange = {handleChange} name="entre_nif" id="entreprise3" value="NIF"/>
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>AI</p>
                    <div className="check-container">
                        <input type="checkbox"   onChange = {handleChange} name="entre_ai"  id="entreprise4" value="AI"/>
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>MF</p>
                    <div className="check-container">
                        <input type="checkbox"   onChange = {handleChange} name="entre_mf"  id="entreprise5" value="MF"/>
                    </div>
                </div>
            </div>
            <div className="societe-title">
                <p>
                    <strong className=" largetxt">Les Personnes qui peuvent avoir accès à la plateforme :</strong>
                </p>
            </div>
            <div className="table-container">
                <div className="table-head">
                    <p>Nom et Prénom</p>
                </div>
                <div className="table-head">
                    <p>Fonction</p>
                </div>
                <div className="table-head EMAILER">
                    <p>E-mail</p>
                </div>
                <div className="table-head">
                    <p>password</p>
                </div>
                <div className="table-head">
                    <p>Téléphone</p>
                </div>
                <div className="table-elem" >
                <input type="text"  onChange = {handleChange} value={formData.nom_prenom_tableau} className="inTheGrey" id='Name-elem' name='nom_prenom_tableau'  autoComplete="off"/>
                </div>
                <div className="table-elem" >
                <input type="text"  onChange = {handleChange} value={formData.fonction_tableau} className="inTheGrey" id='fonction-elem' name='fonction_tableau'  autoComplete="off"/>
                </div>
                <div className="table-elem EMAILER" >
                <input type="email"  onChange = {handleChange} value={formData.email_tableau} className="inTheGrey" id='Email-elem' name='email_tableau' autoComplete="off"/>
                </div>
                <div className="table-elem" >
                <input type="text"  onChange = {handleChange} className="inTheGrey" id='pass-elem' name='password_tableau' autoComplete="off"/>
                </div>
                <div className="table-elem" >
                <input type="number"  onChange = {handleChange} value={formData.tel_tableau} className="inTheGrey" id='Phone-elem' name='tel_tableau'  autoComplete="off"/>
                </div>
                <div className="table-elem">
                 
                </div>
                <div className="table-elem">

                </div>
                <div className="table-elem EMAILER">

                </div>
                <div className="table-elem">

                </div>
                <div className="table-elem">

                </div>

            </div>
            <div className="bold-note">
                <p>
                    Signature du contrat : Je soussigné(e) atteste de la véracité des informations et copies des documents fournis et de leur conformité avec les originaux de la société , Je soussigné(e) déclare avoir lu et appouvé toutes les conditions du conditions du
                    contrat d’Abonnement Entreprise
                </p>
            </div>
            <div className="signatures-container">
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
                            <input type="text"  onChange = {handleChange} value={formData.nom_prenom_signature} className="inTheGrey" id="textinput32" name='nom_prenom_signature'  autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos down-space">
                        <div className="purple-title-part" id="short-agence">
                            Fonction :
                        </div>
                        <div className="grey-input-part " id="long-agence">
                            <input type="text"  onChange = {handleChange} value={formData.fonction_signature} className="inTheGrey" name='fonction_signature'  id="textinput33" autoComplete="off"/>
                        </div>
                    </div>

                </div>
                <div className="signature-space">
                    <p>Cachet et signature de l’entreprise :</p>
                </div>
                <div className="firm-side">
                    <div className="societe-title">
                        <p>
                            <strong className=" largetxt">Espace Traxy :</strong>
                        </p>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Nom et prénom du vendeur :
                        </div>
                        <div className="grey-input-part" id="long">
                            <input type="text"  onChange = {handleChange} value={`${user.username}`} name='user_name' className="inTheGrey" id="textinput34"autoComplete="off"/>
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short-agence">
                            Fonction :
                        </div>
                        <div className="grey-input-part" id="long-agence">
                            Commerciale
                        </div>
                    </div>
                    <p className="last">Tout Contrat d’Abonnement doit étre accompagné d’une copie de piéce justificatives Annexe au Contrat : Chaque peut avoir une ou plusieurs Annexes , chacune d’elles représentant un Contrat de vente de GPS à des heures et dates différentes
                        , soumises au méme régles , clauses et conditions dudit contrat.</p>
                </div>
                <div className="signature-space">
                    <p>Cachet et signature du responsable des ventes :</p>
                </div>
            </div>

            <div className="footer">
                <div className="imgHolder">
                    <img src={LogoDown} alt=""/>
                </div>

                <div className="location-info">
                    <p>
                        <strong className="largetxt">EURL Traxy ,</strong>
                    </p>

                    <p className="itemN">RC : N°05 / 00-0226065B19 - NIF N°01905022606595. - Cité Abdouni Boualem-Iot N°05 Dar El Beida / Alger. - Les pins Maritime N°215 - Mohammadia / Alger. -Cité 410 logts-Ecotec en face CUB / Batna. <br/>
                        <strong className="largetxt">www.traxy.info</strong>
                    </p>



                </div>
                <div className="website">
                    <p></p>
                </div>


            </div>


        </div>
        <div className="message-box">

        </div>
        <div className="buttoncnt">
            <input type="submit" value="soumettre le formulaire" id="pdf-gen"></input>
        </div>

    </form>

    </div>
  )
}

export default ContractForm