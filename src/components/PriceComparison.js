import React, { useState, useEffect } from 'react';

const PriceComparison = ({ userPrice, clientType, experience }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [referenceRates, setReferenceRates] = useState({});
  const [tempRates, setTempRates] = useState({});

  const getBaseReferenceRates = () => {
    // Estas son tarifas base que se ajustarán por experiencia
    return {
      corporate: { min: 500, avg: 750, max: 1200 },
      business: { min: 300, avg: 450, max: 700 },
      entrepreneur: { min: 150, avg: 250, max: 400 }
    };
  };

  const calculateAdjustedRates = (baseRates, currentExperience) => {
    const experienceMultiplier = {
      junior: 0.7,
      mid: 1.0,
      senior: 1.4,
      expert: 1.8
    }[currentExperience] || 1.0;

    const rates = baseRates[clientType.id] || baseRates.entrepreneur;

    return {
      min: rates.min * experienceMultiplier,
      avg: rates.avg * experienceMultiplier,
      max: rates.max * experienceMultiplier
    };
  };

  useEffect(() => {
    const savedRates = JSON.parse(localStorage.getItem('referenceRates')) || getBaseReferenceRates();
    setReferenceRates(savedRates);
    setTempRates(savedRates);
  }, []);

  useEffect(() => {
    // Recalcular tarifas ajustadas cuando cambian clientType o experience
    const baseRates = JSON.parse(localStorage.getItem('referenceRates')) || getBaseReferenceRates();
    const adjustedRates = calculateAdjustedRates(baseRates, experience);
    setReferenceRates(adjustedRates);
  }, [clientType, experience]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem('referenceRates', JSON.stringify(tempRates));
    setIsEditing(false);
    // Recalcular tarifas ajustadas después de guardar
    const adjustedRates = calculateAdjustedRates(tempRates, experience);
    setReferenceRates(adjustedRates);
  };

  const handleCancel = () => {
    setTempRates(JSON.parse(localStorage.getItem('referenceRates')) || getBaseReferenceRates());
    setIsEditing(false);
  };

  const handleRateChange = (type, value) => {
    setTempRates(prev => ({
      ...prev,
      [clientType.id]: {
        ...prev[clientType.id],
        [type]: parseFloat(value) || 0
      }
    }));
  };

  const currentClientBaseRates = tempRates[clientType.id] || getBaseReferenceRates()[clientType.id];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Comparación con Tarifas de Referencia</h3>
        {isEditing ? (
          <div className="flex space-x-2">
            <button onClick={handleSave} className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Guardar</button>
            <button onClick={handleCancel} className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">Cancelar</button>
          </div>
        ) : (
          <button onClick={handleEdit} className="text-sm text-blue-500 hover:underline">Editar Tarifas Base</button>
        )}
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Tu tarifa calculada</span>
            <span className="font-medium">${userPrice.toFixed(2)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${Math.min(100, (userPrice / referenceRates.max) * 100)}%` }}
            />
          </div>
        </div>

        {['min', 'avg', 'max'].map((type) => (
          <div key={type}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{{
                min: 'Mínimo referencial',
                avg: 'Promedio referencial',
                max: 'Máximo referencial'
              }[type]}</span>
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentClientBaseRates[type] || ''}
                  onChange={(e) => handleRateChange(type, e.target.value)}
                  className="w-24 px-2 py-1 border rounded text-right text-sm"
                />
              ) : (
                <span>${referenceRates[type]?.toFixed(2) || '0.00'}</span>
              )}
            </div>
            {!isEditing && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gray-400 h-2.5 rounded-full" 
                  style={{ width: `${(referenceRates[type] / referenceRates.max) * 100}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        * Tarifas referenciales ajustadas por tu nivel de experiencia. Puedes editar las tarifas base.
      </p>
    </div>
  );
};

export default PriceComparison;

// DONE