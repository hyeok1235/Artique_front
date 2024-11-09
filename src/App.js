import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserView from './components/UserView';  // Import UserView component
import AdminView from './components/AdminView';  // Import AdminView component
import Main from './components/section/Main';  // If you want to keep Main as a default route

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for UserView */}
        <Route path="/userview" element={<UserView />} />
        
        {/* Route for AdminView */}
        <Route path="/adminview" element={<AdminView />} />

        {/* Optionally, add a default route */}
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
