const FixedCostsSection = ({ fixedCosts, setFixedCosts }) => {
  const expenses = [
    { name: 'rent', label: 'Arriendo', icon: '🏠' },
    { name: 'utilities', label: 'Servicios (agua/luz)', icon: '💡' },
    { name: 'internet', label: 'Internet/Teléfono', icon: '🌐' },
    { name: 'software', label: 'Licencias software', icon: '🖥️' },
    { name: 'supplies', label: 'Insumos', icon: '🖋️' },
    { name: 'other', label: 'Otros gastos', icon: '📌' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Gastos Fijos Mensuales</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {expenses.map((expense) => (
          <div key={expense.name} className="flex items-center">
            <span className="mr-3 text-xl">{expense.icon}</span>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">{expense.label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={fixedCosts[expense.name] || ''}
                  onChange={(e) => setFixedCosts({
                    ...fixedCosts,
                    [expense.name]: parseFloat(e.target.value) || 0
                  })}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixedCostsSection;