import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOperation, updateOperation } from '../../api/operations';

const OperationForm = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    status: '',
    transport: [],
    booking: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadOperation();
    }
  }, [id]);

  const loadOperation = async () => {
    try {
      const res = await getOperation(id);
      setFormData(res.data);
    } catch (err) {
      console.error("Error al cargar", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Solo enviamos lo que es propio de "Operations"
      await updateOperation(id, {
        status: formData.status,
        transport: formData.transport // ID del transporte seleccionado
      });
      navigate('/operations'); // Volver a la tabla
    } catch (err) {
      alert("Error al actualizar");
    }
  };

  if (loading) return <p>Cargando detalles...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Detalle de Operación</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECCIÓN 1: DATOS DEL BOOKING (SOLO LECTURA) */}
        <section className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-sm font-bold text-blue-600 uppercase mb-4">Información del Booking (Desde Comercial)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Número de Booking</label>
              <input 
                type="text" 
                value={formData.booking?.number || 'S/N'} 
                readOnly 
                className="w-full bg-gray-100 border-none text-gray-600 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Buque (Vessel)</label>
              <input 
                type="text" 
                value={formData.booking?.vessel?.name || 'No asignado'} 
                readOnly 
                className="w-full bg-gray-100 border-none text-gray-600 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Shipper (Cliente)</label>
              <input 
                type="text" 
                value={formData.booking?.shipper?.name || '-'} 
                readOnly 
                className="w-full bg-gray-100 border-none text-gray-600 rounded mt-1"
              />
            </div>
          </div>
          <p className="text-[10px] text-orange-500 mt-2 italic">* Estos campos se editan en el módulo de Bookings.</p>
        </section>

        {/* SECCIÓN 2: DATOS OPERATIVOS (EDITABLES) */}
        <section className="p-4 border border-gray-200 rounded-md">
          <h3 className="text-sm font-bold text-green-600 uppercase mb-4">Gestión Operativa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Estado de la Operación */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado Actual</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pendiente</option>
                <option value="in_progress">En Curso</option>
                <option value="completed">Completado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>

            {/* Asignación de Transporte */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Empresa de Transporte</label>
              <select 
                value={formData.transport[0]?._id || ""}
                onChange={(e) => setFormData({
                    ...formData, 
                    transport: [{ _id: e.target.value, name: e.target.options[e.target.selectedIndex].text }]
                })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar transporte...</option>
                <option value="695845d934952b3e1a35ddbf">Boulet</option>
                <option value="otra_id">Transporte Express</option>
              </select>
            </div>

          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => navigate('/operations')}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default OperationForm;