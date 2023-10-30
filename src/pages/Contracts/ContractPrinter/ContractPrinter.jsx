import React, { useEffect , useState } from 'react'
import './ContractPrinter.css'
import LogoUp from '../../../images/Logo contrat@1,5x 1.svg'
import LogoDown from '../../../images/Logo contrat@1,5x 2.svg'
import html2pdf from 'html2pdf.js';
import NavLogo from '../../../images/NavbarLogo.png'
import { useLogout } from '../../../Hooks/useLogout'
import {useAuthContext} from '../../../Hooks/useAuthContext'
import { Link } from 'react-router-dom'



function ContractPrinter() {
    const {user} = useAuthContext()
    const [imported , setImported] = useState({})
    const customerID = localStorage.getItem('customerID')
    const {logout} = useLogout()
    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
    useEffect(()=>{
        const fetchUserData = async () =>{
            const ContractID = localStorage.getItem('contractID')
            const response = await fetch(`https://traxy-management-api.vercel.app/api/contracts/getContract/`+ContractID , {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json.contract)

            if(response.ok){
                setImported(json.contract)
            }
        }
        if(user){
            fetchUserData()
        }
        
    },[setImported , user])
  return (
    <div className='form-container-a4'>  
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

        <div className="articlePDF" id="pdf">
            <div className="pdf-head">
                <div className="head-txt-section">
                    <div className="contract-title-info">
                        TRX/
                        <strong className=" largetxt">0000{customerID}</strong>/{new Date().getFullYear()}
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
                    {imported.renouvelement ? 'X' : ''}
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>Nouveau abonnement</p>
                    <div className="check-container">
                    {imported.nouveau_abonnement ? 'X' : ''}
                    </div>
                </div>
                <div className="contractor-infos reset">
                    <div className="purple-title-part" id="purple-no-margin">
                        N° du compte Client
                    </div>
                    <div className="grey-input-part">
                        {imported.n_compte_client}
                    </div>
                </div>
                <div className="contractor-infos reset1">
                    <div className="purple-title-part">
                        Code Vendeur
                    </div>
                    <div className="grey-input-part">
                    {imported.code_vendeur}
                    </div>
                </div>
                <div className="contractor-infos">
                    <div className="purple-title-part">
                        Boutique
                    </div>
                    <div className="grey-input-part">
                    {imported.boutique}
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
                    <div className="grey-input-part " id="raisonGray">
                    {imported.raison_sociale}
                    </div>
                </div>
                <div className="multi-check-container">
                <div className="type-contrat-item">
                    <p>SPA</p>
                    <div className="check-container ">
                    {imported.spa ? 'X' : ''}
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>SARL</p>
                    <div className="check-container ">
                    {imported.sarl ? 'X' : ''}
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>EURL</p>
                    <div className="check-container ">
                    {imported.eurl ? 'X' : ''}
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>Autre</p>
                    <div className="check-container ">
                    {imported.autreType ? 'X' : ''}
                    </div>
                </div>
            </div>
            
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        N° de registre de commerce
                    </div>
                    <div className="grey-input-part " id="long">
                    {imported.n_registre_commerce}
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Date de création
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.date_creation_rc}
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        N° d’identification fiscale
                    </div>
                    <div className="grey-input-part " id="long">
                    {imported.n_identite_fiscale}
                    </div>
                </div>
                <div className="contractor-infos tillLast smallerFont">
                    <div className="purple-title-part" id="short">
                        N° d’article d’imposition
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.n_article_imposition}
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        Secteur d’activité
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.secteur_activite}
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Nombre de véhicule
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.nombre_vehicule}
                    </div>
                </div>
                <div className="contractor-infos allOver reset2">
                    <div className="purple-title-part">
                        Adresse
                    </div>
                    <div className="grey-input-part">
                    {imported.adresse}
                    </div>
                </div>
                <div className="allOver tri-split">
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Code postal
                        </div>
                        <div className="grey-input-part" id="long">
                        {imported.code_postal}
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Commune
                        </div>
                        <div className="grey-input-part " id="long">
                        {imported.commune}
                        </div>
                    </div>
                    <div className="contractor-infos ">
                        <div className="purple-title-part" id="short">
                            Wilaya
                        </div>
                        <div className="grey-input-part " id="long">
                        {imported.wilaya}
                        </div>
                    </div>
                    <div className="contractor-infos ">
                        <div className="purple-title-part" id="short">
                            Tél.
                        </div>
                        <div className="grey-input-part " id="long">
                        {imported.tel}
                        </div>
                    </div>
                    <div className="contractor-infos ">
                        <div className="purple-title-part" id="short">
                            Fax
                        </div>
                        <div className="grey-input-part" id="long">
                        {imported.fax}
                        </div>
                    </div>
                    <div className="contractor-infos ">
                        <div className="purple-title-part" id="short">
                            E-mail
                        </div>
                        <div className="grey-input-part" id="long">
                        {imported.e_mail}
                        </div>
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        N° de compte Bancaire
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.n_compte_bancaire}
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Nom de la banque
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.nom_banque}
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short-agence">
                        Agence
                    </div>
                    <div className="grey-input-part" id="long-agence">
                    {imported.agence}
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Adresse
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.adresse_banque}
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
                    <div className="grey-input-part " id="long">
                    {imported.nom_prenom}
                    </div>
                </div>
                <div className="twoPlacesDiv">
                    <div className="type-contrat-item smallerFont">
                        <p>Representation légal</p>
                        <div className="check-container">
                        {imported.representation_legale ? 'X' : ''}
                        </div>
                    </div>
                    <div className="type-contrat-item">
                        <p>Mondataire</p>
                        <div className="check-container">
                        {imported.mondataire ? 'X' : ''}
                        </div>
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short">
                        Date de naissance
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.date_naissance}
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Nationalité
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.nationalite}
                    </div>
                </div>
                <div className="type-contrat">
                    <div className="purple-title-part round">
                        Pièces jointes
                    </div>
                    <div className="grey-input-part hidden">
                        
                    </div>
                </div>
                <div className="fromtwo-end">
                    <div className="type-contrat-item">
                        <p>CNI</p>
                        <div className="check-container">
                        {imported.cni ? 'X' : ''}
                        </div>
                    </div>
                    <div className="type-contrat-item">
                        <p>Passeport</p>
                        <div className="check-container">
                        {imported.passeport ? 'X' : ''}
                        </div>
                    </div>
                    <div className="type-contrat-item lastCol">
                        <p>Délégation de pouvoir / Mondat</p>
                        <div className="check-container">
                        {imported.delegation_mondat ? 'X' : ''}
                        </div>
                    </div>
                </div>
                <div className="allOver tri-split">
                    <div className="contractor-infos reset3">
                        <div className="purple-title-part">
                            N° de pièce d’identité
                        </div>
                        <div className="grey-input-part largerGrey">
                        {imported.n_piece_identite}
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Date d’émission
                        </div>
                        <div className="grey-input-part" id="long">
                        {imported.date_emition_carte_national}
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short">
                            Lieu d’émission
                        </div>
                        <div className="grey-input-part" id="long">
                        {imported.lieu_emission_carte_national}
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
                    <div className="grey-input-part " id="long-agence">
                    {imported.nom_prenom2}
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        Fonction :
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.fonction}
                    </div>
                </div>
                <div className="contractor-infos toThree">
                    <div className="purple-title-part" id="short-agence">
                        Téléphone :
                    </div>
                    <div className="grey-input-part " id="long-agence">
                    {imported.tel2}
                    </div>
                </div>
                <div className="contractor-infos tillLast">
                    <div className="purple-title-part" id="short">
                        E-mail :
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.e_mail2}
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
                    {imported.entre_rc ? 'X' : ''}
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>NIS</p>
                    <div className="check-container">
                    {imported.entre_nis ? 'X' : ''}
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>NIF</p>
                    <div className="check-container">
                    {imported.entre_nif ? 'X' : ''}
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>AI</p>
                    <div className="check-container">
                    {imported.entre_ai ? 'X' : ''}
                    </div>
                </div>
                <div className="type-contrat-item">
                    <p>MF</p>
                    <div className="check-container">
                    {imported.entre_mf ? 'X' : ''}
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
                {imported.nom_prenom_tableau}
                </div>
                <div className="table-elem" >
                {imported.fonction_tableau}
                </div>
                <div className="table-elem EMAILER" >
                {imported.email_tableau}
                </div>
                <div className="table-elem" >
                {imported.password_tableau}
                </div>
                <div className="table-elem" >
                {imported.tel_tableau}
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
                        {imported.nom_prenom_signature}
                        </div>
                    </div>
                    <div className="contractor-infos down-space">
                        <div className="purple-title-part" id="short-agence">
                            Fonction :
                        </div>
                        <div className="grey-input-part " id="long-agence">
                        {imported.fonction_signature}
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
                        {imported.user_name}
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short-agence">
                            Fonction :
                        </div>
                        <div className="grey-input-part" id="long-agence">
                            Agent Commerciale
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
        <div className="buttoncnt">
        <button onClick={()=>{
            let pdfEl = document.getElementById('pdf')
            console.log(pdfEl)
            console.log('in useEffect')
            
            var opt = {
                filename: `contract ${customerID}.pdf`,
                image: {
                    type: 'svg',
                    quality: 1.0
                },
                html2canvas: {
                    scale: 2.5
                },
            };
                html2pdf().set(opt).from(pdfEl).save();
        }}>
            Download PDF
        </button>
        </div>
        
        <div className="message-box">

        </div>

    </div>
  )
}

export default ContractPrinter