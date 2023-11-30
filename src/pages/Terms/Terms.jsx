import React from 'react'
//import {useState , useEffect} from 'react'
import './Terms.css'
import Black from '../../images/BlackLogoTerms.svg'
import Line from '../../images/Line.svg'
import Contact from '../../images/contact.svg'
import html2pdf from 'html2pdf.js';
import NavLogo from '../../images/NavbarLogo.png'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useLogout } from '../../Hooks/useLogout'

const Terms = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
    let admin = false
    if(user.role === 'admin'){
        admin = true
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
    <div className='Terms-Conditions' id='pdf'>
        <div className="entete">
            <div className="leftSide">
                <h1 className="big">
                    Traxy
                </h1>
                <h1 className="medium">
                    Conditions générales
                </h1>
                <h1 className="small">
                    Offres et services de traxy
                </h1>
            </div>
            <div className="rightSide">
                <img src={Black} alt="Traxy" />
            </div>
        </div>

        <div className="body-content">
            <div className="col">
                <p className="bold terms">
                    1- Objet du contrat :
                </p>
                <p className="terms" >
                    Le présent contrat a pour objet de fixer la relation commerciale des deux parties. Le prestataire est chargé de mettre à la disposition du client l’équipement nécessaire, de l’installer et de fournir un accès à la solution d’exploitation du système de géolocalisation embarqué sur les véhicules du client. Ce système est composé d’un boîtier émetteur/récepteur de données utilisant le réseau GPRS (mobile). Il est installé, sous un scellé, à l’intérieur du véhicule dans un endroit inaccessible. À l’issue de ce contrat, le client atteste avoir eu connaissance des articles mentionnés.
                </p>
                <p className="bold terms marg">
                    2- Modalités d’exécution :
                </p>
                <p className="terms" >
                    À la signature du présent contrat et après paiement, le prestataire est tenu de mettre à la disposition du client le boîtier et de procéder à son installation et, à la mise en exploitation des systèmes de géolocalisation embarqué, objet du bon de commande. La lecture des données est effectuée à travers une connexion internet sur un lieu fourni par le prestataire, doté d’une sécurité d’accès.
                </p>
                <p className="bold terms marg">
                    3- Documents contractuels :
                </p>
                <p className="terms" >
                    Font partie intégrante du présent contrat, toutes les annexes visées dans les présentes dispositions. Tout contrat ne comportant pas le cachet humide et la signature d’EURL TRAXY sera nul et sans effet. Le client est tenu responsable de la véracité des documents justificatifs fournis avec le contrat et doit signaler au Service Après-Vente D’EURL TRAXY sur la Hotline et dans un délai de 15 jours tout changement relatif aux renseignements fournis. Dans le cas des changements non signalés, ces derniers ne seront pas reconnus par EURL TRAXY qui se réserve le droit d’exiger le paiement de tous les échéanciers. À la date de signature du contrat, le client est tenu de produire au prestataire les documents suivants : - Copie Registre de Commerce - Copie certificat d’existence, avec mention de l’article d’imposition, - NIS - NIF
                </p>
                <p className="bold terms marg">
                    4- Durée du contrat :
                </p>
                <p className="terms" >
                    Le présent contrat est établi pour une durée d’un (01) ans, à compter de sa date de signature. En cas d’extension de la flotte du client, celui-ci aura la possibilité de les équiper à tout moment selon les modalités du présent contrat.
                </p>   
                <p className="bold terms marg">
                    5- Lieu d’exécution et de réalisation :
                </p>
                <p className="terms" >
                    Le lieu d’exécution et de réalisation des prestations est, soit le siège social du client ou dans les locaux du prestataire. Le serveur d’hébergement étant la propriété exclusive du prestataire, élira domicile sur le territoire algérien. Un changement lié au lieu d’exécution et de réalisation, entraînera des frais qui seront à la charge du client.
                </p>
                <p className="bold terms marg">
                    6- Caractéristiques personnelles du contrat :
                </p>
                <p className="terms" >
                    Ce présent contrat est conclu à titre personnel avec le prestataire qui ne pourra, sous peine de résiliation, autoriser aucune sous-traitance, cession ou transfert sans l’accord préalable écrit du client. Le client s’engage à ne pas céder ce contrat à une tierce personne sans accord écrit.
                </p>
                <p className="bold terms marg">
                    7- Conditions financières :
                </p>
                <p className="terms" >
                7.1 Le client reconnaît avoir pris entière et parfaite connaissance:
                </p>
                <p className="terms" >
                7.1.1 - Conditions générales de mises en service 
                </p> 
                <p className="terms" >
                7.1.2 - Tarifs du prestataire (les détails des tarifs figurent en annexe n°2 jointe au présent contrat). 
                </p>   
                <p className="terms" >
                7.2 Conditions et modalités de paiement (voir annexe 1) : 7.2.1- Le paiement pour les services inclus dans l’offre, sont redevables annuellement.
                </p>
                <p className="terms" >
                7.2.2- Un planning est établi selon un commun accord entre les deux Parties. 
                </p>
                <p className="terms" >
                7.2.3- Les Sim M2M sont exploitées exclusivement à travers nos boîtiers de géolocalisation. Le client est tenu responsable de toute surfacturation liée à la SIM hors exploitation de la solution sous présentation de justificatif par le prestataire. 
                </p>
                <p className="terms" >
                7.2.3- Les Sim M2M sont exploitées exclusivement à travers nos boîtiers de géolocalisation. Le client est tenu responsable de toute surfacturation liée à la SIM hors exploitation de la solution sous présentation de justificatif par le prestataire. 
                </p>
                <p className="terms" >
                7.2.4- En cas de non-paiement selon les termes convenus, le prestataire se réserve le droit de suspendre l’accès à la solution et, à récupérer son équipement. De plus, le client sera soumis au paiement de tous les frais administratifs et judiciaires que le prestataire aura engagés afin de recouvrir sa créance. 
                </p>
                <p className="terms" >
                7.2.5- Les sommes dues en exécution du présent contrat seront versées sur le compte du prestataire par chèque ou par virement bancaire.
                </p>
            </div>
            <div className="col">
                <p className="bold terms">
                8- Obligations du prestataire :
                </p>
                <p className="terms" >
                8.1 Veiller au bon fonctionnement du service, assurer les entretiens et les interventions nécessaires inclus dans la garantie. 8.2 Entretenir et réparer pendant la période de garantie le système de géolocalisation embarqué. 8.3 Installation de l’équipement de géolocalisation à bord des véhicules en assurant une discrétion totale. Toute intervention externe (personnel non habilité) sans l’accord écrit du prestataire entraînera la nullité de la garantie.
                </p>
                <p className="bold terms marg">
                9- Obligations du client :
                </p>
                <p className="terms" >
                Le client s’engage à : 
                </p>
                <p className="terms" >9.1 Se doter d’une connexion internet, à ses frais, nécessaire à l’exploitation de la solution. Le prestataire décline toute responsabilité en cas de déconnexion ou autres anomalies constatées tout au long de la durée de la convention. </p>
                <p className="terms" >9.2 Ne pas apporter de modifications ou d’adjonctions de quelque nature que ce soit au système de transmission et de Géolocalisation.</p>
                <p className="terms" >9.3 Signaler au service après-vente toute défaillance, déconnexion ou défectuosité du matériel mis à sa disposition : </p>
                <p className="terms" >Par email à l’adresse suivante : sales@traxy.org support@traxy.dz </p>
                <p className="terms" > 9.4- Assurer le paiement de la prestation tout au long de la durée du contrat, même en cas de changement de véhicule (accident, panne, vente, location, véhicules non-disponible, prêt…). Pour toute autre demande d’ajouts de fonctionnalités, le prestataire communiquera un nouveau devis. </p>
                <p className="terms" >9.5- Le client est dans l’obligation de notifier par écrit au prestataire tout changement sur l’un des documents contractuels : la raison sociale, RIB, changement d’adresse, numéro de téléphone de la personne chargée du système de géolocalisation, mail ou bien toute modification relative au véhicule et à son immatriculation. En cas de vente d’un véhicule équipé d’un boîtier GPS, le client doit saisir par écrit le prestataire pour que celui-ci effectue la désinstallation du boîtier. Dans le cas où le nouvel acquéreur souhaiterait conserver le boîtier, il est dans l’obligation d’établir un nouveau contrat avec le prestataire et fournir systématiquement les documents contractuels cités dans l’article 3. En cas de détérioration du boîtier ou incendie, le client doit transmettre le rapport de l’incident au prestataire. 9.6- Ne pas cédé ce contrat, les boîtiers et les accès à la solution à une tierce personne, même en cas de vente de véhicule, sans un accord écrit de la part du prestataire.</p>
                <p className="bold terms marg">
                10- Respect Planning :
                </p>
                <p className="terms" >
                10-1 Installation : Le client est dans l’obligation de respecter le planning d’installation déjà validé par les deux parties. En cas de non-respect du planning de mise à disposition des véhicules, les frais de mise en service seront considérés consommés du montant de l’avance. Néanmoins, des conditions s’appliquent au sujet : · Le client doit respecter un délai d’un mois maximum pour mettre à disposition les véhicules. · Le bon de commande n’est, en aucun cas, pas modifiable. Le Prestataire se voit dans l’obligation au cas de non-respect des conditions ci-dessus par le client, d’adresser un devis pour tout autre déplacement en fonction de la tarification de chaque région : Centre Alger / Batna à hauteur de : 2500 DA /Véhicule Hors Alger / Batna à : 4500DA /Véhicule Sud à : 8000 DA /Véhicule
                </p>
                <p className="terms" >
                10-2 Désinstallation :  
                </p>
                <p className="terms" >10-2-1 : Désinstallation définitive La désinstallation définitive est considérée comme une résiliation. (Même conditions résiliation s’appliquent voir article 12) </p>
                <p className="terms" >10-2-2 Désinstallation Temporaire : La durée tolérée de la désinstallation temporaire est maximum de deux mois. Passé cette durée, le client sera dans l’obligation de mettre à la disposition d’EURL TRAXY un chèque à hauteur de deux mois d’abonnement. </p>
                <p className="terms" >10.3 Désinstallation/Réinstallation (D/R) : Lorsque pour des besoins de la gestion de sa flotte véhicule, le client décide de changer l’affectation des boîtiers d’un véhicule A vers un autre véhicule B, il est dans l’obligation de notifié cela à EURL TRAXY par écrit. La demande de désinstallation/réinstallation doit clairement préciser : 1- les matricules et les cartes grises des véhicules à désinstaller. 2- les matricules et les cartes grises des véhicules à équiper de boîtiers. 3- Le client est dans l’obligation de respecter le planning de désinstallation/réinstallation</p>
            </div>
            <div className="col">
                <p className="terms" >
                Déjà validé par les deux parties, en cas de non-respect de ce planning de mise à disposition des véhicules, la facturation de l’abonnement sera toujours en cours jusqu’à la désinstallation des boîtiers. Dans le cas où le véhicule concerné par la réinstallation ne serait pas disponible, le jour, planifié de la désinstallation/réinstallation, EURL TRAXY se voit dans l’obligation d’adresser un devis pour tout autre déplacement : Centre Alger / Batna à hauteur de : 2500 DA /Véhicule Hors Alger / Batna à : 4500DA /Véhicule Sud à : 8000 DA /Véhicule
                </p>
                <p className="bold terms marg">
                    11- Modification :
                </p>
                <p className="terms" >
                Pour être opposable aux deux parties, toute modification apportée au présent contrat devra faire l’objet d’un avenant écrit et signé par les deux parties.
                </p>
                <p className="bold terms marg">
                12-Résiliation :
                </p>
                <p className="terms" >
                Le présent contrat pourra être résilié dans les cas suivants : · En cas d’inexécution des obligations du client précisées à l’article 9 ci-dessus ; 
                </p>
                <p className="terms" >
                · En cas de cessation de paiement (voir condition de paiement CGS) · En cas de cessation d’activité ou de liquidation à l’amiable ou judiciaire de l’une des Parties. 
                </p>
                <p className="terms" >
                · En cas de force majeure (voir CGS) 
                </p>
                <p className="terms" >
                · En cas de demande de l’une des parties d’une résiliation, cette dernière interviendra deux mois après notification par écrit à l’autre partie de sa volonté de mettre fin à ce contrat, et cela : 
                </p>
                <p className="terms" >
                o Après notification par écrit à l’autre partie de sa volonté de mettre fin à la présente convention. 
                </p>
                <p className="terms" >
                o La constatation sur l’accusé de réception de ladite demande avec signature conjointe des deux parties. 
                </p>
                <p className="terms" >
                o Après récupération et restitution des balises. o Le client reste tenu de son obligation de payer les sommes dues à la date de résiliation. 
                </p>
                <p className="terms" >
                · Les obligations de confidentialités prévues au présent contrat ainsi que le règlement des différends continueront à s’appliquer après la fin du contrat. Les droits et les obligations doivent être effectués dans les (60) jours avant la fin du contrat.
                </p>
                <p className="bold terms marg">
                13- Restitution des équipements :
                </p>
                <p className="terms" >
                La mise à disposition des boitiers de géolocalisation prendra fin au même titre que le contrat. Les boîtiers demeurent la propriété d’EURL TRAXY conformément aux dispositions réglementant les équipements sensibles. (Arrêté interministériel du 21 février 2009 complétant l’arrêté interministériel du 09 juillet 2003 fixant les conditions et les modalités d’importation, d’acquisition, de détention, d’exploitation, de cession et de transports des équipements sensibles (arrêté interministériel du 13 octobre 2011 fixant les conditions et les modalités d’acquisition, de détention, d’exploitation, d’utilisation et de cession des équipements sensibles).
                </p>
                <p className="bold terms marg">
                14- Confidentialité :
                </p>
                <p className="terms" >
                Les informations liées au présent contrat et, aux activités des deux parties restent confidentielles. Chaque partie s’interdit de divulguer celles-ci, sous quelque forme que ce soit, à une tierce personne sans l’accord écrit préalable de l’autre partie. Cette obligation reste valable même après extinction du présent contrat.
                </p>
                <p className="bold terms marg">
                15- Élection de domicile :
                </p>
                <p className="terms" >
                Les parties élisent domicile à leur siège social respectif mentionné dans le présent contrat.
                </p>
                <p className="bold terms marg">
                16- Médiation et règlement des différends :
                </p>
                <p className="terms" >
                En cas de différents relatifs à l’interprétation, la validité ou à l’exécution du présent contrat, les Parties devront négocier de bonne foi afin de résoudre, par un accord à l’amiable. À défaut d’un règlement à l’amiable dans un délai de trente (30) jours, le litige sera soumis exclusivement au tribunal de BATNA
                </p>
            </div>
        </div>
        <div className="separation">
            <h1 className='separationTitle'>
            Annexes N°1
            </h1>
            <img src={Line} alt="" />
        </div>
        <div className="down-content">
            <div className="col">
                <p className="bold terms">
                1. Définition
                </p>
                <p className="terms" >
                Sauf dérogation explicite, écrite et approuvée par EURL TRAXY, soit « le prestataire », ces conditions constituent les bases juridiques du contrat entre le prestataire et l’entité, dénommée ci-après « le client », au titre de la mise à disposition des équipements et/ou services concernes par celui-ci. Elles se substituent à toutes les autres conditions, émanant du client, auxquelles celui-ci ne peut se référer ni se prévaloir. Ces conditions s’appliquent aux relations entre le prestataire et le client, dans le respect des Lois et Réglementations algériennes.
                </p>
                <p className="bold terms marg">
                2. Publicité - Validité
                </p>
                <p className="terms" >
                Ces conditions générales de Mise à disposition et de Garantie sont portées à la connaissance du client avant la conclusion de la convention, de manière explicite. Elles acquièrent une force de loi entre le prestataire et le client par la simple passation d’une commande par le client. Le contrat n’est réputé valide qu’à la suite d’une acceptation écrite, explicite et formelle du prestataire.
                </p>
                <p className="bold terms marg">
                3. Limites
                </p>
                <p className="terms" >
                Le contrat sera strictement limité aux fournitures et aux prestations, exclusivement, et expressément, mentionnées par les parties, à partir des données fournies par le client.
                </p>
                <p className="bold terms marg">
                4. Modification
                </p>
                <p className="terms" >
                Toute modification de commande ou de convention demandée par le client doit faire l’objet de l’acceptation expresse du prestataire laquelle engendrera des retards de livraison.
                </p>
                <p className="bold terms marg">
                5. Reprise
                </p>
                <p className="terms" >
                Toute éventuelle désinstallation de l’équipement doit faire l’objet d’un accord préalable du prestataire. Aucune commande ne peut être annulée sans l’accord explicite, écrit et préalable du prestataire
                </p>
                <p className="bold terms marg">
                6. Propriété des documents
                </p>
                <p className="terms" >
                D’une manière générale, tout renseignement figurant sur les prospectus, les manuels d’utilisation, site internet ou tout autre document concernant la propriété intellectuelle et le savoir-faire demeure la propriété exclusive du prestataire (produits livrés et prestations fournies). Toute reproduction de ces éléments, effectuée par le client ou de son fait, nécessite un accord écrit préalable du prestataire.
                </p>
                <p className="bold terms marg">
                7. Prix
                </p>
                <p className="terms" >
                Les prix, fixés par le prestataire au moment de l’acceptation de la commande, s’entendent hors taxes, le prestataire se réserve le droit de réviser ses prix, en cas de variation des prix des équipements, de modification des cours sur le marché des changes, d’évolution de la législation, ou de tout autre motif légitime et justifié. Les prix remis au client par le prestataire dans le cadre d’un devis ou d’une offre spéciale ne sont maintenus que durant la période de validité de l’offre. En cas de commande partielle, les prix sont révisables.
                </p>
                <p className="bold terms marg">
                8. Conditions de paiement :
                </p>
                <p className="terms" >
                Le paiement de l’avance est exigible immédiatement à la commande conformément aux conditions de paiement (devis/marché). La facturation des services de la part du prestataire débute à la signature du contrat après installation et mise en service du système de géolocalisation auprès du client. En cas de rajout de nouvelles fonctionnalités, le prestataire adressera un nouveau devis. La facturation des abonnements sera avant prestation de service, soumise à un cycle de facturation mensuel, arrêté à la date de chaque début du mois, intégrant le coût de l’abonnement. En cas de dysfonctionnement avéré au système une note de crédit annuelle sera établie. En cas de refus de réception de la facture, la date d’envoi de cette dernière fera foi. Les factures seront réputées acceptées par la Partie réceptrice si aucune contestation n'est notifiée par cette dernière dans un délai de sept (7) jours calendaires suivant la date de la facture concernée, en précisant clairement les motifs de la contestation. Le Fournisseur devra alors fournir toutes les informations complémentaires nécessaires à l'appui de cette facture et permettre la vérification de leur contenu sur demande justifiée du Client. L’abonné s’engage à s’acquitter du montant de la facture dans un délai de 10 jours maximum, à compter de la date de réception de la facture (en cas de refus, la date d’envoi fera foi.) Les dates de paiement convenues contractuellement ne peuvent être remises en cause unilatéralement par le client, même en cas de litige avec le prestataire.
                </p>
                <p className="bold terms marg">
                9. Mode de paiement :
                </p>
                <p className="terms" >
                Dans le cas où le Client choisirait le virement bancaire comme mode de paiement, ces paiements devront être effectués au nom eurl traxy sur son compte bancaire, à l'adresse suivante :
                
                
                 
                 
                 
                </p>
                <p className="terms" >N° de compte : EURL TRAXY </p>
                <p className="terms" >Banque : TRUST </p>
                <p className="terms" >Agence : BATNA</p>
                <p className="terms" >Adresse : BATNA, ALGERIE</p>
                <p className="terms" >Relevé d’identité bancaire : 02900603220003917836</p>
                <p className="terms" >Dans le cas où le client choisi le paiement en espèces ou chèque certifié, il devra se présenter au siège de la direction générale En cas de non-paiement. Le prestataire se réserve le droit de suspendre l’accès aux services sans suspension des redevances relatives à l’abonnement. Au bout de la 3ème facture impayée EURL TRAXY serait dans l’obligation d’entamer des procédures judiciaires.</p>
            
            </div>
            <div className="col">
                <p className="bold terms">
                10. Pénalités de retard
                </p>
                <p className="terms" >
                Dans le cas où le délai accordé au paiement serait dépassé et que la facture n’est pas honorée, des conditions particulières sont de ce fait appliquer et se décomposent comme suit : En cas de non-paiement (deux factures ouvertes maximum seront tolérées), le prestataire se réserve le droit de suspendre l’accès aux services sans suspension des redevances relatives à l’abonnement. Au bout de la 3ème facture impayée EURL TRAXY serait dans l’obligation d’entamer des procédures judiciaires.
                </p>
                <p className="bold terms marg">
                11. Réserve de propriété des équipements
                </p>
                <p className="terms" >
                En application des lois, EURL TRAXY conserve l’entière propriété des équipements. La mise à disposition des boîtiers de géolocalisation prendra fin au même titre que le contrat. Les boîtiers demeurent la propriété d’EURL TRAXY conformément aux dispositions réglementant les équipements sensibles. (Arrêté interministériel du 21 février 2009 complétant l’arrêté interministériel du 09 juillet 2003 fixant les conditions et les modalités d’importation, d’acquisition, de détention, d’exploitation, de cession et de transports des équipements sensibles Arrêté interministériel du 13 octobre 2011 fixant les conditions et les modalités d’acquisition, de détention, d’exploitation, d’utilisation et de cession des équipements sensibles).
                </p>
                <p className="bold terms marg">
                12. Réception Technique, inspections, essais
                </p>
                <p className="terms" >
                Toutes ces opérations sont demandées par le client, et exécutées à ses frais. Elles s’effectuent sur site, ou en tout autre lieu choisi par le prestataire, le bon de livraison (BL) doit être signé par le client. La date du BL fait foi du début de période de Garantie. Dès la mise en service des équipements, le client se doit de procéder immédiatement à une vérification minutieuse en présence des techniciens du prestataire. À défaut de formuler des réserves le jour d’installation, les équipements seront réputés conformes et ne pourront être remis en cause par le client pour quelques motifs que ce soit.
                </p>
                <p className="bold terms marg">
                13. Installation, mise en place
                </p>
                <p className="terms" >
                Ces opérations sont réalisées par le prestataire uniquement, sous sa seule responsabilité, et doivent être effectuées selon les règles et normes en vigueur. Les installations s’effectueront suivant le planning convenu entre les 2 parties. Un retard d’installation est non imputable au prestataire et ne pourra entraîner la résiliation, même partielle, de la convention, ni l’application de pénalités de retard, en vue des changements de lois ou conditions des douanes ou autres. Les retards accumulés sont indépendants de notre part.
                </p>
                <p className="bold terms marg">
                14. Garantie
                </p>
                <p className="terms" >
                La garantie est relative à la durée du contrat, elle couvre uniquement le bon fonctionnement du boitier de géolocalisation. Lorsque Le Client commande du matériel pour des fonctionnalités optionnelles, la durée de garantie est de douze mois pour les accessoires associés à ces options. La garantie est exclue en cas d’anomalies liées à des mauvaises manipulations dûment constatées par les Techniciens du prestataire en cas de détériorations ou d’accidents provenant d’actes de malveillance, de négligence, de défaut de surveillance ou d’entretien : cas d’actes de rupture d’étanchéité des Balises, le Prestataire assurera le remplacement des équipements de géolocalisation, et ce, après présentation d’un nouveau devis au client et la réception du bon de commande de ce dernier.
                </p>
                <p className="bold terms marg">
                15. Responsabilité
                </p>
                <p className="terms" >
                Le prestataire exclut expressément toute responsabilité de sa part, au titre de dommages matériels, directs ou indirects, et toute réparation de tout préjudice financier découlant notamment d’une perte d’exploitation ou de bénéfice, de la privation d’un droit.
                </p>
                <p className="bold terms marg">
                16. Force Majeure
                </p>
                <p className="terms" >
                    On entend par force Majeure, tout évènement imprévisible, irrésistible et en dehors de la volonté et du contrôle de la Partie qui n’a pas pu exécuter tout ou partie de ses obligations. Les Parties ne seront pas responsables de perte, de dommage, de retard, de non-exécution ou d’une exécution partielle résultant directement ou indirectement d’une cause rendant l’exécution de ses obligations impossible et pouvant être interprété comme un cas de force majeure. Les parties conviennent qu’un cas de Force Majeure inclura notamment les événements suivants : les intempéries, les actes d’un ennemi public, les actes ou omissions d’une autorité publique, y compris les modifications de toute réglementation applicable à l’exécution des conditions générales de vente et en rendant l’exécution impossible ou déraisonnable onéreuse, les agitations, rébellions, insurrections, émeutes, guerres, déclarées ou non, les actes d’une nature similaire, les grèves, conflits de travail ou une autre action syndicale, y compris chez l’une des Parties, un fournisseur ou un opérateur, les sabotages, les vols, les actes de vandalisme, les explosions, incendies, foudre, inondations et autres catastrophes naturelles, les défaillances d’un opérateur ou d’un fournisseur, les épidémies ou mises en quarantaine, les embargos, les actes de tiers, la perte par le Fournisseur de l’une de ses diverses autorisations conditionnant la fourniture du Service, la résiliation de service par les fournisseurs du Fournisseur. Les obligations de la partie victime du cas de Force Majeure seront suspendues sans qu’elle n’encoure de responsabilité, quelle qu’elle soit. En particulier, les délais requis pour l’exécution des obligations de la partie affectée par le cas de Force Majeure seront étendus pour une durée équivalente au retard subi. Chaque Partie s’engage à notifier promptement à l’autre, par écrit, la survenance de tout cas de Force majeure dans un délai n’excède pas (20) vingt jours. Les parties s’efforceront, dans la mesure du possible, d’atténuer les effets des cas de Force Majeure.
                </p>
                <p className="bold terms marg">
                17. Clause résolutoire
                </p>
                <p className="terms" >
                La résiliation du contrat, pour toutes causes que ce soit, ne porte pas atteinte aux créances déjà échues. La convention pourra être résiliée par le prestataire, dans le cas où le paiement n’interviendrait pas dans les jours suivant l’envoi par lui-même d’une mise en demeure de payer. Le contrat pourra être résilié, dans le cas où l’exécution de la convention aura été rendue impossible par la survenance de la force majeure, telle que ci-dessus définit, sans qu’il soit nécessaire de faire prononcer cette résiliation par voie de justice. 
                </p>
                <p className="bold terms marg">
                18. Attribution de Juridiction
                </p>
                <p className="terms" >
                Seul le droit algérien s’applique aux litiges nés de la convention relevant des présentes conditions générales de service et de garantie. Tout litige relatif aux conditions contractuelles de service ou de règlement, sera porté devant le Tribunal de BATNA territorialement compètent.
                </p>
                

            </div>
        </div>
        <div className="footer-section">
            <div className="fLeft">
                <img src={Black} alt="" />
            </div>
            <div className="fRight">
                <img src={Contact} alt="" />
            </div>
        </div>

        
    </div>
    <div className="buttoncnt">
            <button onClick={()=>{
                let pdfEl = document.getElementById('pdf')
                console.log(pdfEl)
                console.log('in useEffect')
                
                var opt = {
                    filename: `Terms&Conditions.pdf`,
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
    </>
  )
}

export default Terms