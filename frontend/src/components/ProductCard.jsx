import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-semibold mt-2">KSh {product.price}</p>
      <p className={product.available ? 'text-green-500' : 'text-red-500'}>
        {product.available ? 'Available' : 'Out of Stock'}
      </p>
      {product.available && (
        <Link to={`/receipt/${product.id}`}>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Buy Now
          </button>
        </Link>
      )}
    </div>
  )
}

export default ProductCard