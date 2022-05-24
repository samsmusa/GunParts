import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home/Home';
import Details from './page/Details/Details';
import Register from './page/Auth/Register';
import Login from './page/Auth/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './page/Auth/Profile';
import Order from './page/Dashboard/Order';
import Dashboard from './page/Dashboard/Dashboard';
import Reviews from './page/Dashboard/Reviews';
import useProfile from './hooks/useProfile';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="order" element={<Order />} />
          <Route path="review" element={<Reviews />} />
        </Route>
      </Routes>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
