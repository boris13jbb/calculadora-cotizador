const clientTypes = {
  corporate: {
    id: 'corporate',
    title: 'Corporaciones',
    description: 'Grandes empresas con alta exposición y derechos extensivos',
    multiplier: 1.8,
    icon: '🏢',
    minRate: 500,
    avgRate: 750,
    maxRate: 1200
  },
  business: {
    id: 'business',
    title: 'PYMES',
    description: 'Negocios medianos con exposición moderada',
    multiplier: 1.3,
    icon: '🏬',
    minRate: 300,
    avgRate: 450,
    maxRate: 700
  },
  entrepreneur: {
    id: 'entrepreneur',
    title: 'Emprendedores',
    description: 'Pequeños negocios o proyectos personales',
    multiplier: 1.0,
    icon: '👩‍💻',
    minRate: 150,
    avgRate: 250,
    maxRate: 400
  }
};

const experienceLevels = {
  junior: {
    level: 'junior',
    label: 'Junior (1-3 años)',
    multiplier: 0.7
  },
  mid: {
    level: 'mid',
    label: 'Mid-Level (3-5 años)',
    multiplier: 1.0
  },
  senior: {
    level: 'senior',
    label: 'Senior (5+ años)',
    multiplier: 1.4
  },
  expert: {
    level: 'expert',
    label: 'Experto (10+ años)',
    multiplier: 1.8
  }
};

const fixedCostsItems = [
  { id: 'rent', label: 'Arriendo', icon: '🏠' },
  { id: 'utilities', label: 'Servicios (agua/luz)', icon: '💡' },
  { id: 'internet', label: 'Internet/Teléfono', icon: '🌐' },
  { id: 'software', label: 'Licencias', icon: '🖥️' },
  { id: 'insurance', label: 'Seguros', icon: '🛡️' },
  { id: 'other', label: 'Otros gastos', icon: '📌' }
];

const variableCostsItems = [
  { id: 'transport', label: 'Transporte', icon: '🚗' },
  { id: 'meals', label: 'Alimentación', icon: '🍱' },
  { id: 'materials', label: 'Materiales', icon: '📦' },
  { id: 'permits', label: 'Permisos', icon: '📄' },
  { id: 'shipping', label: 'Envíos', icon: '✈️' },
  { id: 'other', label: 'Otros variables', icon: '📌' }
];

export default {
  clientTypes: Object.values(clientTypes),
  experienceLevels: Object.values(experienceLevels),
  fixedCostsItems,
  variableCostsItems,
  defaultHours: 10,
  workingWeeksPerYear: 52,
  profitMargin: 1.3 // 30% profit margin
};