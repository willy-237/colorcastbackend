import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./client/Routes/Login/Login.js"
import Tours from "./client/Components/Tours/Tours.js"
import FormTour from "./client/Routes/Form/createTour/FormTour.js";
import FormUser from './client/Routes/Form/createUser/FormUser.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Login />} />
        <Route  path="/tours" element={<Tours />} />
        <Route path="/createtour" element={<FormTour />} />
        <Route path="/createuser" element={<FormUser />} />
      </Routes>
    </Router>
  );
}

export default App;
