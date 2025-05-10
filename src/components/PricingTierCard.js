const PricingTierCard = ({ tier, price, features, recommended }) => {
  return (
    <div className={`border rounded-xl p-6 ${recommended ? 'border-2 border-black shadow-lg' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold">{tier}</h3>
        {recommended && <span className="bg-black text-white text-xs px-2 py-1 rounded">RECOMENDADO</span>}
      </div>
      <p className="text-3xl font-bold my-4">${price}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className="w-full mt-6 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
        Seleccionar
      </button>
    </div>
  );
};

export default PricingTierCard;