import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cargarVentas = async () => {
    try {
      const res = await api.get('/ventas');
      setVentas(res.data);
    } catch (err) {
      console.error('Error al obtener ventas:', err);
    }
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const eliminarVenta = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta venta?')) {
      return;
    }

    try {
      const res = await api.delete(`/ventas/${id}`);
      alert(res.data.message || 'Venta eliminada');
      cargarVentas();
    } catch (err) {
      console.error('Error al eliminar venta:', err);
      alert('No se pudo eliminar la venta');
    }
  };

  return (
    <div>
      <h2>Ventas de la Cafetería</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => {
            const total = venta.total ?? Number(venta.precio || 0) * Number(venta.cantidad || 0);

            return (
              <tr key={venta.id}>
                <td>{venta.estudiante}</td>
                <td>{venta.producto}</td>
                <td>{venta.cantidad}</td>
                <td>${venta.precio}</td>
                <td>${total}</td>
                <td>{venta.fecha}</td>
                <td>
                  <button type="button" onClick={() => setVentaSeleccionada(venta)}>
                    Editar
                  </button>
                  <button type="button" onClick={() => eliminarVenta(venta.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {ventaSeleccionada && (
        <EditarVenta
          venta={ventaSeleccionada}
          onUpdate={() => {
            setVentaSeleccionada(null);
            cargarVentas();
          }}
        />
      )}
    </div>
  );
}

export default ListaVentas;