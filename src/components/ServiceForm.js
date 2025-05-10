import { useState } from 'react';
import FormInputField from './FormInputField';

const ServiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    hoursRequired: '',
    fixedCosts: '',
    variableCosts: '',
    equipmentCosts: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.serviceName) newErrors.serviceName = "Nombre del servicio es requerido";
    if (!formData.hoursRequired || isNaN(formData.hoursRequired)) 
      newErrors.hoursRequired = "Horas requeridas deben ser un número";
    if (!formData.fixedCosts || isNaN(formData.fixedCosts)) 
      newErrors.fixedCosts = "Costos fijos deben ser un número";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        hoursRequired: parseFloat(formData.hoursRequired),
        fixedCosts: parseFloat(formData.fixedCosts),
        variableCosts: parseFloat(formData.variableCosts || 0),
        equipmentCosts: parseFloat(formData.equipmentCosts || 0)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
      <FormInputField
        label="Nombre del Servicio"
        name="serviceName"
        value={formData.serviceName}
        onChange={handleChange}
        error={errors.serviceName}
        placeholder="Ej: Diseño de logotipo"
      />

      <FormInputField
        label="Horas Requeridas"
        name="hoursRequired"
        type="number"
        value={formData.hoursRequired}
        onChange={handleChange}
        error={errors.hoursRequired}
        placeholder="Ej: 10"
      />

      <FormInputField
        label="Costos Fijos Mensuales ($)"
        name="fixedCosts"
        type="number"
        value={formData.fixedCosts}
        onChange={handleChange}
        error={errors.fixedCosts}
        placeholder="Ej: 1200"
      />

      <FormInputField
        label="Costos Variables ($)"
        name="variableCosts"
        type="number"
        value={formData.variableCosts}
        onChange={handleChange}
        placeholder="Ej: 200"
      />

      <FormInputField
        label="Costos de Equipos ($)"
        name="equipmentCosts"
        type="number"
        value={formData.equipmentCosts}
        onChange={handleChange}
        placeholder="Ej: 300"
      />

      <button
        type="submit"
        className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium mt-4"
      >
        Calcular Precio
      </button>
    </form>
  );
};

export default ServiceForm;