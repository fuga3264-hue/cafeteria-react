import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/ventas')
      .then(res => setVentas(res.data))
      .catch(err => console.error('Error al cargar ventas:', err));
  }, []);

  return (
    <div>
      <h2>Historial de Ventas</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ventas.length === 0 ? (
            <tr>
              <td colSpan="5">No hay ventas registradas.</td>
            </tr>
          ) : (
            ventas.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.estudiante || v.estudiante_id}</td>
                <td>{v.producto || v.producto_id}</td>
                <td>{v.cantidad}</td>
                <td>{v.fecha}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaVentas;