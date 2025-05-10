const ClientTypeSelector = ({ clientTypes, selected, onChange }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {clientTypes.map((type) => (
        <div
          key={type.id}
          onClick={() => onChange(type.id)}
          className={`p-4 border rounded-lg cursor-pointer transition-all ${
            selected === type.id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center mb-2">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              type.id === 'enterprise' ? 'bg-purple-500' : 
              type.id === 'pyme' ? 'bg-blue-500' : 'bg-green-500'
            }`} />
            <h3 className="font-medium">{type.label}</h3>
          </div>
          <p className="text-sm text-gray-600">{type.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ClientTypeSelector;

// DONE