import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <img  className="h-[10rem]" src='https://tss-static-images.gumlet.io/notfound.png'></img>
            <p className="text-2xl text-gray-400" style={styles.message}>We can't seem to find the page you are looking for</p>
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
