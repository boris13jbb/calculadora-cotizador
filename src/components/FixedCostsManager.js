import React, { useState } from 'react';
import settings from '../config/settings';

const FixedCostsManager = ({ fixedCosts, setFixedCosts }) => {
  const [newItem, setNewItem] = useState({ name: '', cost: '' });
  const [errors, setErrors] = useState({ name: '', cost: '' });

  const validateField = (name, value) => {
    if (!value) return 'Este campo es requerido';
    if (name === 'cost' && (isNaN(value) || value < 0)) return 'Debe ser un número positivo';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField('name', newItem.name),
      cost: validateField('cost', newItem.cost),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) return;

    const cost = parseFloat(newItem.cost);

    setFixedCosts(prev => ({
      ...prev,
      [Date.now()]: { // Usar timestamp como ID único
        name: newItem.name,
        cost: cost
      }
    }));

    setNewItem({ name: '', cost: '' });
  };

  const handleCostChange = (id, value) => {
    setFixedCosts(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        cost: parseFloat(value) || 0
      }
    }));
  };

  const removeItem = (id) => {
    setFixedCosts(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const totalFixedCosts = Object.values(fixedCosts).reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Gastos Fijos Mensuales</h3>

      <form onSubmit={handleAddItem} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Nombre del Gasto *</label>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Suscripción a software"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Costo ($) *</label>
            <input
              type="number"
              name="cost"
              min="0"
              step="0.01"
              value={newItem.cost}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.cost ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="100.00"
            />
            {errors.cost && <p className="text-xs text-red-500 mt-1">{errors.cost}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
        >
          Agregar Gasto Fijo
        </button>
      </form>

      {Object.keys(fixedCosts).length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Gastos Fijos Registrados</h4>
          <div className="space-y-3">
            {Object.entries(fixedCosts).map(([id, item]) => (
              <div key={id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center">
                  <div className="relative mr-2">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.cost}
                      onChange={(e) => handleCostChange(id, e.target.value)}
                      className="w-24 pl-7 pr-2 py-1 border rounded text-right text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => removeItem(id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm font-medium">
              Total de gastos fijos: ${totalFixedCosts.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixedCostsManager;

// DONE