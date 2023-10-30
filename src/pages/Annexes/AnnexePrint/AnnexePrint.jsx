import React , {useEffect , useState} from 'react'
import LogoUp from '../../../images/Logo contrat@1,5x 1.svg'
import LogoDown from '../../../images/Logo contrat@1,5x 2.svg'

import blackLogo from '../../../images/LogoBlack2.png'
import coordonne from '../../../images/coordo2.png'
import html2pdf from 'html2pdf.js';
//import { format } from 'date-fns'
import { useAuthContext } from '../../../Hooks/useAuthContext'
import { Link } from 'react-router-dom'
import NavLogo from '../../../images/NavbarLogo.png'
import { useLogout } from '../../../Hooks/useLogout'


function AnnexePrint() {
    const [imported , setImported] = useState({})
    const {logout} = useLogout()
    
    const [carData , setCarData]= useState([])
    const customerID = localStorage.getItem('customerID')
    const {user} = useAuthContext()
    let admin = false
    if(user.role === 'admin'){
        admin = true
    }
    useEffect(()=>{
        const fetchUserData = async () =>{
            
            const AnnexeID = localStorage.getItem('AnnexeID')
            const response = await fetch(`https://traxy-management-api.vercel.app/api/annexes/getannexe/`+AnnexeID,{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json.annexe)

            if(response.ok){
                setImported(json.annexe)
                setCarData(imported.vehicules)
            }
        }
        if(user){
            console.log('test')
            fetchUserData()
        }
        
    },[imported , setCarData , user])
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
        <div className="annexe-container" id="pdf">
            <div className="pdf-head">
                <div className="head-txt-section">
                    <div className="contract-title-info">
                        TRX/<strong className=" largetxt">0000{customerID}</strong>/{new Date().getFullYear()}
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
                <div className="contractor-infos reset" >
                    <div className="purple-title-part" id="purple-no-margin">
                        N° du compte Client
                    </div>
                    <div className="grey-input-part">
                        {imported.n_compte_client}
                    </div>
                </div>
                <div className="contractor-infos reset1">
                    <div className="purple-title-part" >
                        Code Vendeur
                    </div>
                    <div className="grey-input-part" >
                    {imported.code_vendeur}
                    </div>
                </div>
                <div className="contractor-infos">
                    <div className="purple-title-part">
                        Boutique
                    </div>
                    <div className="grey-input-part" id="long-100">
                    {imported.boutique}
                    </div>
                </div>
                
                <div className="contractor-infos reset1">
                    <div className="purple-title-part ">
                        Raison sociale
                    </div>
                    <div className="grey-input-part" id="raisonGray">
                    {imported.raison_sociale}
                    </div>
                </div>
                <div className="contractor-infos annexePhone">
                    <div className="purple-title-part">
                        Num Téléphone.
                    </div>
                    <div className="grey-input-part">
                    {imported.tel}
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
                        <p>Procuration</p>
                        <div className="check-container">
                        {imported.delegation_mondat ? 'X' : ''}
                        </div>    
                    </div>
                </div>
                <div className="allOver tri-split">
                    <div className="contractor-infos reset3">
                        <div className="purple-title-part" >
                            N° de pièce d’identité
                        </div>
                        <div className="grey-input-part largerGrey" >
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
                <div className="type-contrat-item two-places">
                    <p>Bon de commande</p>
                    <div className="check-container">
                    {imported.bon_commande ? 'X' : ''}
                    </div>    
                </div>
                <div className="contractor-infos three-places">
                    <div className="purple-title-part" id="short">
                        Autre à préciser
                    </div>
                    <div className="grey-input-part" id="long">
                    {imported.autre_a_preciser}
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
                            Nombre de <strong className=" largetxt"> GPS </strong> Actuelles :
                        </div>
                        <div className="grey-input-part" id="long-short">
                        {imported.nombredegpsactuelle}
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short-long">
                            Nombre de <strong className=" largetxt">GPS</strong> rajoutées :
                        </div>
                        <div className="grey-input-part" id="long-short">
                        {imported.nombredegpsajouter}
                        </div>
                    </div>
                    <div className="contractor-infos">
                        <div className="purple-title-part" id="short-long">
                            Nouveau nombre de <strong className=" largetxt">GPS</strong> :
                        </div>
                        <div className="grey-input-part" id="long-short">
                        {imported.nombredegpstotall}
                        </div>
                    </div>
                </div>
                <div className="type-contrat-item padd-cont">
                    <p>Offre Basic</p>
                    <div className="check-container">
                    {imported.offre_basic ? 'X' : ''}
                    </div>    
                </div>
                <div className="type-contrat-item padd-cont">
                    <p>Offre Standard</p>
                    <div className="check-container">
                    {imported.offre_standard ? 'X' : ''}
                    </div>    
                </div>
                <div className="type-contrat-item padd-cont" >
                    <p>Offre Professionel</p>
                    <div className="check-container">
                    {imported.offre_professionel ? 'X' : ''}
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
                            <strong className=" largetxt">Espace Traxy  :</strong>
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
                    <div className="contractor-infos down-space">
                        <div className="purple-title-part" id="short-agence">
                            Fonction :
                        </div>
                        <div className="grey-input-part" id="long-agence">
                            Agent Commerciale
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

            {/*<Table Data={carData}/>*/}
            <div className='annexeTableContainer '>
                <div className="top-information">
                    <div className="top-logo-image-container">
                        <img src={blackLogo} alt="" />
                    </div>
                    <div className="coordonne-top">
                        <img src={coordonne} alt="" />

                    </div>
                </div>
                <div className='head-info-container'>
                    <div className="Pv-title">
                        <h1 className='title-cars'>
                        PV de réception N° 0000{customerID} / {new Date().getFullYear()}
                        </h1>
                        <p className='text-cars'>
                        Des balises Géolocalisation et Préstation de Services :
                        </p>
                    </div>
                    <div className="Datetitle">
                        <p className='text-cars'>
                            <strong className='title-cars'> Date : </strong> 17/02/2000
                        </p>

                    </div>
                </div>

                <div className="annexe-table">
                    <div className="annexeTable-Head">
                        <div className="THead">
                            ID
                        </div>
                        <div className="THead threeSpans">
                            Vehicule Name
                        </div>
                        <div className="THead twoSpans">
                            Tracker Model
                        </div>
                        <div className="THead threeSpans">
                            IMEI
                        </div>
                        <div className="THead threeSpans">
                            SIM Number
                        </div>
                        <div className="THead twoSpans">
                            Matricul
                        </div>
                        <div className="THead twoSpans">
                            Activation Date
                        </div>
                        <div className="THead twoSpans">
                            Plan
                        </div>
                        
                    </div>
                    {carData?.map((item,index)=>(
                        <div className={`annexeTable-Row ${ (index !== 0)&&(index % 14 === 0) ? 'beforeClass' : ''}`} key={item._id}>
                            <div className="TRow">
                                {item._id}
                            </div>
                            <div className="TRow threeSpans">
                                {item.name}
                            </div>
                            <div className="TRow twoSpans">
                                {item.trackerModel}
                            </div>
                            <div className="TRow threeSpans lighter">
                                {item.imei}
                            </div>
                            <div className="TRow threeSpans">
                                {item.sim_number}
                            </div>
                            <div className="TRow twoSpans">
                                {item.matricule}
                            </div>
                            <div className="TRow twoSpans lighter">
                                {item.activation_date}
                            </div>
                            <div className="TRow twoSpans">
                                {item.plan}
                            </div>
                            
                        </div>
                    ))}
                    

                </div>
            </div>
        </div>
        
        

        <div className="buttoncnt">
            <button onClick={()=>{
                let pdfEl = document.getElementById('pdf')
                console.log(pdfEl)
                console.log('in useEffect')
                
                var opt = {
                    filename: `annexe de 0000${customerID}.pdf`,
                    image: {
                        type: 'svg',
                        quality: 1.0
                    },
                    html2canvas: {
                        scale: 2.5
                    },
                    pagebreak: { before: '.beforeClass'}
                };
                    html2pdf().set(opt).from(pdfEl).save();
            }}>
                Download PDF
            </button>
        </div>
    </div>
  )
}

export default AnnexePrint