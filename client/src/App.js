import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Signup from "./components/Auth/Signup"; 
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import InventoryList from "./components/Inventory/InventoryList";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/inventory" component={<InventoryList/>} />

      </Routes>
    </Router>
  );
}
export default App;
