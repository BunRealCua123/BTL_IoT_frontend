import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogoutSuccess }) => {
    const navigate = useNavigate();

    useEffect(() => {
        onLogoutSuccess();
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        localStorage.removeItem('_id');
        navigate('/login');
    }, [onLogoutSuccess, navigate]);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
