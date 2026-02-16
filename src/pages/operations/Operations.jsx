import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOperations } from '../../api/operations';

const Operations = () => {
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();

  // 1. Carga de datos desde la API
  useEffect(() => {
    const fetchOperations = async () => {
      try {
        setLoading(true);
        const response = await getOperations();
        
        // Verificamos si response.data es el array directamente
        const data = Array.isArray(response.data) ? response.data : [];
        setOperations(data);
      } catch (err) {
        console.error("Error al obtener operaciones:", err);
        setError("Error al conectar con el servidor. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchOperations();
  }, []);

  // 2. Lógica de Filtrado (Protegida contra nulos)
  const filteredOperations = operations.filter((op) => {
    if (!searchTerm) return true;

    const search = searchTerm.toLowerCase();
    
    // Usamos el encadenamiento opcional (?.) para evitar errores si booking es null
    const bookingNumber = op.booking?.number?.toLowerCase() || "";
    const vesselName = op.booking?.vessel?.name?.toLowerCase() || "";
    const shipperName = op.booking?.shipper?.name?.toLowerCase() || "";
    const transportName = op.transport?.[0]?.name?.toLowerCase() || "";

    return (
      bookingNumber.includes(search) ||
      vesselName.includes(search) ||
      shipperName.includes(search) ||
      transportName.includes(search)
    );
  });

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-lg font-medium text-blue-600 animate-pulse">Cargando datos logísticos...</div>
    </div>
  );

  if (error) return (
    <div className="p-10 text-center text-red-500 font-bold">{error}</div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Cabecera y Buscador */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Operaciones</h1>
          <p className="text-sm text-gray-500">Gestión de carga y logística en tiempo real</p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por Booking, Vessel, Shipper..."
            className="w-full md:w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400 text-lg">🔍</div>
        </div>
      </div>

      {/* Tabla de Resultados */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="p-4 font-bold text-gray-700">Booking</th>
                <th className="p-4 font-bold text-gray-700">Vessel</th>
                <th className="p-4 font-bold text-gray-700">Line</th>
                <th className="p-4 font-bold text-gray-700">Shipper</th>
                <th className="p-4 font-bold text-gray-700">Consignee</th>
                <th className="p-4 font-bold text-gray-700">POL (Origen)</th>
                <th className="p-4 font-bold text-gray-700">POD (Destino)</th>
                <th className="p-4 font-bold text-gray-700">Transport</th>
                <th className="p-4 font-bold text-gray-700">Status</th>
                <th className="p-4 font-bold text-gray-700 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOperations.map((op) => (
                <tr key={op._id} className="hover:bg-blue-50/30 transition-colors">
                  
                  {/* Booking */}
                  <td className="p-4 font-semibold text-blue-600">
                    {op.booking?.number || <span className="text-gray-300 italic">S/N</span>}
                  </td>

                  {/* Vessel */}
                  <td className="p-4 text-gray-600 font-medium">
                    {op.booking?.vessel?.name || '-'}
                  </td>

                  {/* Line */}
                  <td className="p-4 text-gray-600">
                    {op.booking?.line?.name || '-'}
                  </td>

                  {/* Shipper */}
                  <td className="p-4 text-gray-600 truncate max-w-[140px]">
                    {op.booking?.shipper?.name || '-'}
                  </td>

                  {/* Consignee */}
                  <td className="p-4 text-gray-600 truncate max-w-[140px]">
                    {op.booking?.consignee?.name || '-'}
                  </td>

                  {/* POL */}
                  <td className="p-4">
                    <div className="font-medium text-gray-700">{op.booking?.POL?.name || '-'}</div>
                    <div className="text-[10px] text-gray-400 uppercase">{op.booking?.POL?.country}</div>
                  </td>

                  {/* POD */}
                  <td className="p-4">
                    <div className="font-medium text-gray-700">{op.booking?.POD?.name || '-'}</div>
                  </td>

                  {/* Transport */}
                  <td className="p-4">
                    {op.transport && op.transport.length > 0 ? (
                      <span className="text-gray-700">{op.transport[0].name}</span>
                    ) : (
                      <span className="text-gray-300 italic">No asignado</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider ${
                      op.status === 'pending' 
                        ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}>
                      {op.status.toUpperCase()}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => navigate(`/operations/edit/${op._id}`)}
                      className="inline-flex items-center bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm"
                    >
                      EDITAR
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Mensaje de No Resultados */}
          {filteredOperations.length === 0 && (
            <div className="p-20 text-center">
              <div className="text-gray-300 text-4xl mb-4">🔍</div>
              <div className="text-gray-500 font-medium">No se encontraron operaciones para "{searchTerm}"</div>
              <button 
                onClick={() => setSearchTerm("")}
                className="mt-2 text-blue-500 hover:underline text-sm"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Operations;