import React, { useEffect, useState } from 'react';
import { api } from '../api';

function EditarVenta({ venta, onUpdate, onNotify }) {
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

  useEffect(() => {
    if (!venta) return;

    setFormData({
      estudiante_id: venta.estudiante_id ?? venta.estudiante?.id ?? '',
      producto_id: venta.producto_id ?? venta.producto?.id ?? '',
      cantidad: venta.cantidad ?? '',
      fecha: venta.fecha ? new Date(venta.fecha).toISOString().slice(0, 10) : ''
    });
  }, [venta]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api.put(`/ventas/${venta.id}`, formData)
      .then((res) => {
        onNotify?.(res.data.message || 'Venta actualizada con éxito', 'success');
        onUpdate();
      })
      .catch((err) => {
        console.error('Error al actualizar venta:', err);
        onNotify?.('No se pudo actualizar la venta', 'error');
      });
  };

  return (
    <div>
      <h3>Editar Venta</h3>
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

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

export default EditarVenta;
