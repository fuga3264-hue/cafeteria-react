import React from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';
import './App.css'; // <-- AGREGAR ESTA LÍNEA

function App() {
  return (
    <div className="container">
      <h1 className="title">Cafetería Escolar</h1>
      <FormularioVenta />
      <hr className="divider" />
      <ListaVentas />
    </div>
  );
}

export default App;