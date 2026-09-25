import React, { useState } from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';
import './App.css';

function App() {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setToast({ visible: true, message, type });

    window.clearTimeout(showNotification.timeoutId);
    showNotification.timeoutId = window.setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }));
    }, 2800);
  };

  return (
    <>
      <div className="notification-container">
        <div className={`notification notification-${toast.type} ${toast.visible ? 'show' : ''}`}>
          <span className="notification-icon">{toast.type === 'error' ? '⚠' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      </div>

      <div className="container">
        <h1 className="title">Cafetería Escolar</h1>
        <FormularioVenta onNotify={showNotification} />
        <hr className="divider" />
        <ListaVentas onNotify={showNotification} />
      </div>
    </>
  );
}

export default App;