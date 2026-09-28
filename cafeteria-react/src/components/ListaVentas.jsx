import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

function ListaVentas({ onNotify }) {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [ventaAEliminar, setVentaAEliminar] = useState(null);

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

  const confirmarEliminacion = async () => {
    if (!ventaAEliminar) {
      return;
    }

    try {
      const res = await api.delete(`/ventas/${ventaAEliminar}`);
      onNotify?.(res.data.message || 'Venta eliminada', 'success');
      setVentaAEliminar(null);
      cargarVentas();
    } catch (err) {
      console.error('Error al eliminar venta:', err);
      onNotify?.('No se pudo eliminar la venta', 'error');
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
                  <button type="button" onClick={() => setVentaAEliminar(venta.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {ventaAEliminar && (
        <div className="modal-backdrop" onClick={() => setVentaAEliminar(null)}>
          <div className="modal-delete" onClick={(event) => event.stopPropagation()}>
            <h3>¿Seguro que deseas eliminar esta venta?</h3>
            <div className="modal-actions">
              <button type="button" className="modal-btn modal-btn-primary" onClick={confirmarEliminacion}>
                OK
              </button>
              <button type="button" className="modal-btn modal-btn-secondary" onClick={() => setVentaAEliminar(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {ventaSeleccionada && (
        <EditarVenta
          venta={ventaSeleccionada}
          onNotify={onNotify}
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