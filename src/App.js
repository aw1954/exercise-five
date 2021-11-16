import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
//Page Imports
import CreateUser from './pages/CreateUser';
import Header from './components/Header';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
