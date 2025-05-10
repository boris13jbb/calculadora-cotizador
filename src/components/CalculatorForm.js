import { useState } from 'react';

const CalculatorForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    fixedCosts: 0,
    equipmentCosts: 0,
    materials: 0,
    operationalCosts: 0,
    hours: 0,
    marketRate: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ExpenseInput
        label="Gastos fijos mensuales"
        name="fixedCosts"
        value={formData.fixedCosts}
        onChange={handleChange}
        placeholder="Alquiler, servicios, etc."
      />
      
      <ExpenseInput
        label="Costos de equipos (por hora)"
        name="equipmentCosts"
        value={formData.equipmentCosts}
        onChange={handleChange}
        placeholder="Computador, cámara, etc."
      />
      
      <ExpenseInput
        label="Materiales e insumos"
        name="materials"
        value={formData.materials}
        onChange={handleChange}
        placeholder="Papel, tintas, etc."
      />
      
      <ExpenseInput
        label="Gastos operativos"
        name="operationalCosts"
        value={formData.operationalCosts}
        onChange={handleChange}
        placeholder="Transporte, alimentación, etc."
      />
      
      <ExpenseInput
        label="Horas estimadas de trabajo"
        name="hours"
        value={formData.hours}
        onChange={handleChange}
        placeholder="Horas que dedicarás"
      />
      
      <ExpenseInput
        label="Tarifa de mercado por hora"
        name="marketRate"
        value={formData.marketRate}
        onChange={handleChange}
        placeholder="Según tu experiencia y región"
      />
      
      <button
        type="submit"
        className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium"
      >
        Calcular precio justo
      </button>
    </form>
  );
};

export default CalculatorForm;