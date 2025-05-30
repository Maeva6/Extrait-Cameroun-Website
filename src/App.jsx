// App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navBar';
import Dashboard from './pages/dashboardAdmin';


export default function App() {
  return (
    <div className="min-h-screen flex bg-white-100">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/" element={} /> */}
    </Routes>
    </div>
  );
}
