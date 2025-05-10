const PriceResult = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-black">${value.toLocaleString()}</p>
    </div>
  );
};

export default PriceResult;