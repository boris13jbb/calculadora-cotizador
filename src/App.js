import React, { useState, useEffect } from 'react';
import FixedCostsManager from './components/FixedCostsManager';
import EquipmentCalculator from './components/EquipmentCalculator';
import VariableCostsManager from './components/VariableCostsManager';
import ClientTypeSelector from './components/ClientTypeSelector';
import UserProfileManager from './components/UserProfileManager';
import PriceComparison from './components/PriceComparison';

const App = () => {
  const [profile, setProfile] = useState({
    experience: 'mid',
    specialty: ''
  });

  const [clientType, setClientType] = useState({
    id: 'entrepreneur',
    title: 'Emprendedores',
    multiplier: 1.0
  });

  const [clientTypeId, setClientTypeId] = useState('entrepreneur');

  const clientTypes = [
    { id: 'entrepreneur', label: 'Emprendedor', description: 'Tarifa para emprendedores y startups', multiplier: 1.0 },
    { id: 'pyme', label: 'Pyme', description: 'Tarifa para pequeñas y medianas empresas', multiplier: 1.2 },
    { id: 'enterprise', label: 'Corporativo', description: 'Tarifa para grandes empresas', multiplier: 1.5 }
  ];

  const handleClientTypeChange = (id) => {
    setClientTypeId(id);
    const selectedType = clientTypes.find(type => type.id === id);
    setClientType(selectedType);
  };

  const [fixedCosts, setFixedCosts] = useState({});
  const [equipment, setEquipment] = useState([]);
  const [variableCosts, setVariableCosts] = useState({});

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (savedProfile) setProfile(savedProfile);
  }, []);

  const calculatePrice = (hours = 10) => {
    const totalFixed = Object.values(fixedCosts).reduce((sum, cost) => sum + cost, 0);
    const equipmentHourly = equipment.reduce((sum, item) => sum + parseFloat(item.hourlyRate), 0);
    const totalVariable = Object.values(variableCosts).reduce((sum, cost) => sum + cost, 0);

    const experienceMultiplier = {
      junior: 0.8,
      mid: 1.0,
      senior: 1.3,
      expert: 1.6
    }[profile.experience] || 1.0;

    const basePrice = (
      (totalFixed / 160) +          // Costo fijo por hora
      equipmentHourly +             // Costo equipos por hora
      (totalVariable / hours)       // Costo variable por hora
    ) * hours *                     // Total horas
    experienceMultiplier *          // Ajuste experiencia
    clientType.multiplier;          // Ajuste tipo cliente

    return {
      hourly: basePrice / hours,
      total: basePrice,
      breakdown: {
        fixed: totalFixed,
        equipment: equipmentHourly * hours,
        variable: totalVariable
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">CreativePricing Pro</h1>
          <p className="text-gray-600">Sistema profesional de cotización</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <UserProfileManager profile={profile} setProfile={setProfile} />
            <ClientTypeSelector
              clientTypes={clientTypes}
              selected={clientTypeId}
              onChange={handleClientTypeChange}
            />
            <FixedCostsManager fixedCosts={fixedCosts} setFixedCosts={setFixedCosts} />
            <EquipmentCalculator equipment={equipment} setEquipment={setEquipment} />
            <VariableCostsManager variableCosts={variableCosts} setVariableCosts={setVariableCosts} />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Resumen de Cotización</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">Tipo de Cliente</p>
                  <p className="text-lg font-semibold">{clientType.title}</p>
                  <p className="text-xs text-blue-500">Multiplicador: {clientType.multiplier}x</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600">Experiencia</p>
                  <p className="text-lg font-semibold capitalize">{profile.experience}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600">Tarifa por hora</p>
                  <p className="text-2xl font-bold">${calculatePrice().hourly.toFixed(2)}</p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-600">Proyecto (10 horas)</p>
                  <p className="text-2xl font-bold">${calculatePrice().total.toFixed(2)}</p>
                </div>
              </div>

              <PriceComparison 
                userPrice={calculatePrice().hourly} 
                clientType={clientType}
                experience={profile.experience}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// DONE
