import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from "./LoginForm";
import Layout from './Layout';
import NoPage from './NoPage';
import Dashboard from './Dashboard';
import RegistrationForm from './RegistrationForm';
import SignUpSuccess from './SignUpSuccess';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Manage from './Manage';
import AddUserForm from './AddUserForm';
import Header from './components/Header';
import Footer from './components/Footer';
import AddSystem from './AddSystem';
import AssetData from './AssetData';
import { ToastContainer } from 'react-toastify';
// import Navbar from './components/Navbar'; 
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginForm />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="signup" element={<RegistrationForm />} />
          <Route path="signup-success" element={<SignUpSuccess />} />
          <Route path="manage/:id" element={<Manage />} />
          <Route path="adduser" element={<AddUserForm />} />
          <Route path="addsystem" element={<AddSystem />} />
          <Route path="asset" element={<AssetData />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />


      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

