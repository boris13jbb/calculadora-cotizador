import React, { useState } from 'react';

const EquipmentCalculator = ({ equipment, setEquipment }) => {
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    cost: '',
    lifespan: '',
    weeklyUsage: ''
  });

  const handleAddEquipment = () => {
    if (newEquipment.name && newEquipment.cost) {
      const hourlyRate = (newEquipment.cost / (newEquipment.lifespan * 52 * newEquipment.weeklyUsage)).toFixed(2);
      setEquipment([...equipment, {
        ...newEquipment,
        hourlyRate,
        id: Date.now()
      }]);
      setNewEquipment({ name: '', cost: '', lifespan: '', weeklyUsage: '' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Calculadora de Equipos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Equipo</label>
          <input
            type="text"
            value={newEquipment.name}
            onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Ej: Cámara Profesional"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Costo ($)</label>
          <input
            type="number"
            value={newEquipment.cost}
            onChange={(e) => setNewEquipment({...newEquipment, cost: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="3000"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Vida útil (años)</label>
          <input
            type="number"
            value={newEquipment.lifespan}
            onChange={(e) => setNewEquipment({...newEquipment, lifespan: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="5"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Horas/semana</label>
          <input
            type="number"
            value={newEquipment.weeklyUsage}
            onChange={(e) => setNewEquipment({...newEquipment, weeklyUsage: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="20"
          />
        </div>
      </div>
      
      <button
        onClick={handleAddEquipment}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Agregar Equipo
      </button>
      
      {equipment.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Tus equipos:</h4>
          <div className="space-y-2">
            {equipment.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>{item.name}</span>
                <span className="font-medium">${item.hourlyRate}/hora</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentCalculator;
