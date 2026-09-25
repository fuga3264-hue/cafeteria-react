import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioVenta({ onNotify }) {
  const [formData, setFormData] = useState({
    estudiante_id: '',
    producto_id: '',
    cantidad: '',
    fecha: ''
  });

  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/estudiantes')
      .then((res) => setEstudiantes(res.data))
      .catch((err) => console.error('Error al cargar estudiantes:', err));

    api.get('/productos')
      .then((res) => setProductos(res.data))
      .catch((err) => console.error('Error al cargar productos:', err));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api.post('/ventas', formData)
      .then((res) => {
        onNotify?.(res.data.message || 'Venta registrada', 'success');
        setFormData({
          estudiante_id: '',
          producto_id: '',
          cantidad: '',
          fecha: ''
        });
      })
      .catch((err) => {
        console.error('Error al registrar venta:', err);
        onNotify?.('No se pudo registrar la venta', 'error');
      });
  };

  return (
    <div>
      <h2>Registrar Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="estudiante_id"
          value={formData.estudiante_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione estudiante</option>
          {estudiantes.map((estudiante) => (
            <option key={estudiante.id} value={estudiante.id}>
              {estudiante.nombre} - {estudiante.grupo}
            </option>
          ))}
        </select>

        <select
          name="producto_id"
          value={formData.producto_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione producto</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>
              {producto.nombre} - ${producto.precio}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
}

export default FormularioVenta;