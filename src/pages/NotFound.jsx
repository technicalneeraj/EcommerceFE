import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>404 Not Found</h1>
            <p style={styles.message}>Sorry, the page you are looking for does not exist.</p>
            <button style={styles.button} onClick={handleRedirect}>
                Back to Home
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
    },
    header: {
        fontSize: '2rem',
        color: '#dc3545',
    },
    message: {
        margin: '1rem 0',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default NotFound;
