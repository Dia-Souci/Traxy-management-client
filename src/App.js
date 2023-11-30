import { BrowserRouter, Route, Routes ,Navigate } from 'react-router-dom';
import './App.css';
import CustomerDash from './pages/customer Dashboard/customerDash';
import Login from './pages/login/Login';
import Landing from './pages/landing/landing';
import VehiculeDash from './pages/vehicule Dashboard/vehiculeDash';
import UserDash from './pages/user Dashboard/userDash';
import Createcustomer from './pages/Create/customer/createcustomer';
import Createvehicules from './pages/Create/vehicule/createvehicules';
import Createuser from './pages/Create/user/createuser';
import ContractForm from './pages/Contracts/ContractForm/ContractForm';
import ContractPrinter from './pages/Contracts/ContractPrinter/ContractPrinter';
import ContractPage from './pages/Contracts/ContractPage';
import AnnexePage from './pages/Annexes/AnnexePage';
import AnnexeForm from './pages/Annexes/AnnexeForm/AnnexeForm';
import AnnexePrint from './pages/Annexes/AnnexePrint/AnnexePrint';
import Intervetion from './pages/Intervention/Intervetion';
import CreateIntervention from './pages/Create/intervention/createintervention';
import VehiculeUpdate from './pages/update/vehicule/vehiculeUpdate';
import CustomerVehiculeDash from './pages/CustomerVehiculeDash/CustomerVehiculeDash';
import CreateCustomerVehicule from './pages/Create/customervehicule/CreateCustomerVehicule';
import { useAuthContext } from './Hooks/useAuthContext';
import CustomerUpdate from './pages/update/customer/customerUpdate';
import Terms from './pages/Terms/Terms';


function App() {
  const {user} = useAuthContext()
  return (
    <BrowserRouter>
      <Routes>
          <Route 
            path='/'
            element={ !user ? <Login /> : <Navigate to='/landing' />} 
            />
            <Route 
            path='/landing'
            element={ user ? <Landing /> : <Navigate to='/' />}
            />
            <Route 
            path='/customer-dashboard'
            element={user ? <CustomerDash /> : <Navigate to='/' />}
            />
            <Route 
            path='/vehicule-dashboard'
            element={user ? ( user.role === 'admin' ? <VehiculeDash /> : <Navigate to='/landing' /> ) : <Navigate to='/' />}
            />
            <Route 
            path='/UserDash'
            element={user ? <UserDash /> : <Navigate to='/' />}
            />
            <Route 
            path='/Createcustomer'
            element={user ? <Createcustomer /> : <Navigate to='/' />} 
            />
            <Route 
            path='/Createvehicule'
            element={user ? <Createvehicules /> : <Navigate to='/' />} 
            />
            <Route 
            path='/Createuser'
            element={user ? <Createuser /> : <Navigate to='/' />} 
            /> 
            <Route
              path='/Contracts'
              element={user ? <ContractPage/> : <Navigate to='/' />}
            />
            <Route
              path='/ContractForm'
              element={user ? <ContractForm/> : <Navigate to='/' />}
            />
            <Route
              path='/ContractPrint'
              element={user ? <ContractPrinter/> : <Navigate to='/' />}
            />
            <Route
              path='/Annexes'
              element={user ? <AnnexePage/> : <Navigate to='/' />}
            />
            <Route
              path='/AnnexeForm'
              element={user ?<AnnexeForm/>: <Navigate to='/' />}
            />
            <Route
              path='/AnnexePrint'
              element={user ? <AnnexePrint/> : <Navigate to='/' />}
            />
            <Route
              path='/intervention'
              element={user ? <Intervetion/> : <Navigate to='/' />}
            />
            <Route
              path='/CreateIntervention'
              element={user ? <CreateIntervention/> : <Navigate to='/' />}
            />
            <Route
              path='/Updatevehicule'
              element={user ? <VehiculeUpdate/> : <Navigate to='/' />}
            />
            <Route
              path='/Updatecustomer'
              element={user ? <CustomerUpdate/> : <Navigate to='/' />}
            />
            <Route
              path='/CustomerVehicules'
              element={user ? <CustomerVehiculeDash /> : <Navigate to='/' />}
            />
            <Route
              path='/CreatevehiculeForCustomer'
              element={user ? < CreateCustomerVehicule /> : <Navigate to='/' />}
            />
            <Route
              path='/Terms'
              element={user ? <Terms/> : <Navigate to='/' />}
            />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
