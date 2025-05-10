const VariableCosts = ({ variableCosts, setVariableCosts }) => {
  const costs = [
    { name: 'transport', label: 'Transporte', icon: '🚗' },
    { name: 'meals', label: 'Alimentación', icon: '🍱' },
    { name: 'materials', label: 'Materiales', icon: '📦' },
    { name: 'permits', label: 'Permisos', icon: '📄' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Costos Variables</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {costs.map((cost) => (
          <div key={cost.name} className="flex items-center">
            <span className="mr-3 text-xl">{cost.icon}</span>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">{cost.label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={variableCosts[cost.name] || ''}
                  onChange={(e) => setVariableCosts({
                    ...variableCosts,
                    [cost.name]: parseFloat(e.target.value) || 0
                  })}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg"
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

export default VariableCosts;