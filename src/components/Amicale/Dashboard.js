import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import MembreForm from './MembreForm';
import Stat from './Stat';
import CotisationForm from './CotisationForm';

// import Accueil from './pages/Accueil';
// import Membres from './pages/Membres';
// import Cotisation from './pages/Cotisation';
// import Dettes from './pages/Dettes';

function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <div className="d-flex">
            <Sidebar collapsed={collapsed} />

            <div className="flex-grow-1">
                <nav className="navbar navbar-dark bg-dark px-3">
                    <button className="btn btn-outline-light me-3" onClick={toggleSidebar}>
                        <i className="bi bi-list"></i>
                    </button>
                    <span className="navbar-text text-white">
                        <i className="bi bi-person-circle me-2"></i>
                        Ruphin Gassi
                    </span>
                </nav>

                <div className="p-4">
                    <Routes>
                    <Route path="/" element={<Stat />} />
                        <Route path="/Membres" element={<MembreForm />} />
                        <Route path="/cotisation" element={<CotisationForm />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
