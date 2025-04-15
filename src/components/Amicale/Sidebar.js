import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar({ collapsed }) {
    const location = useLocation();

    const sidebarStyle = {
        minHeight: '100vh',
        width: collapsed ? '80px' : '250px',
        transition: 'width 0.3s',
    };

    const getLinkClass = (path) =>
        'nav-link text-white ' + (location.pathname === path ? 'bg-primary active' : '');

    return (
        <div className='d-flex flex-column justify-content-between bg-dark text-white p-3' style={sidebarStyle}>
            <div>
                <Link to="/" className='d-flex align-items-center mb-3 text-white text-decoration-none'>
                    <i className='bi bi-code-slash me-2 fs-4'></i>
                    {!collapsed && <span className='fs-5'>Amical Servant</span>}
                </Link>
                <hr className='text-secondary' />
                <ul className='nav nav-pills flex-column'>
                    <li className='nav-item'>
                        <Link to="/" className={getLinkClass('/')}>
                            <i className='bi bi-speedometer2 me-2'></i>
                            {!collapsed && <strong>Tableau de bord</strong>}
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/membres" className={getLinkClass('/membres')}>
                            <i className='bi bi-people me-2'></i>
                            {!collapsed && <strong>Membres</strong>}
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/cotisation" className={getLinkClass('/cotisation')}>
                            <i className='bi bi-cash-coin me-2'></i>
                            {!collapsed && <strong>Cotisation</strong>}
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/dettes" className={getLinkClass('/dettes')}>
                            <i className='bi bi-journal-x me-2'></i>
                            {!collapsed && <strong>Dettes</strong>}
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <ul className='nav flex-column mb-3'>
                    <li className='nav-item'>
                        <Link to="/parametres" className={getLinkClass('/parametres')}>
                            <i className='bi bi-gear me-2'></i>
                            {!collapsed && <strong>Paramètres</strong>}
                        </Link>
                    </li>
                </ul>
                <button className='btn btn-outline-light w-100 d-flex align-items-center justify-content-center'>
                    <i className='bi bi-box-arrow-right me-2'></i>
                    {!collapsed && 'Déconnexion'}
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
