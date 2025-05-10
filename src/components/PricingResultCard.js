const PricingResultCard = ({ title, price, description, recommended }) => {
  return (
    <div className={`relative rounded-xl p-6 shadow-sm transition-all hover:shadow-md ${
      recommended 
        ? 'border-2 border-blue-500 bg-gradient-to-b from-blue-50 to-white' 
        : 'border border-gray-200 bg-white'
    }`}>
      {recommended && (
        <div className="absolute top-0 right-6 -translate-y-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          RECOMENDADO
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-3">
        ${price}
        <span className="text-sm font-normal text-gray-500">/proyecto</span>
      </p>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <button className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${
        recommended 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}>
        Seleccionar plan
      </button>
    </div>
  );
};

export default PricingResultCard;