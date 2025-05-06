import { useState, useEffect } from 'react'

function ReceiptForm({ product, deliveryLocations, onSubmit }) {
  const [mpesaName, setMpesaName] = useState('')
  const [mpesaCode, setMpesaCode] = useState('')
  const [deliveryLocation, setDeliveryLocation] = useState('')
  const [deliveryPrice, setDeliveryPrice] = useState(null)

  useEffect(() => {
    if (deliveryLocation) {
      const location = deliveryLocations.find((loc) => loc.location === deliveryLocation)
      setDeliveryPrice(location ? parseFloat(location.price) : null)
    } else {
      setDeliveryPrice(null)
    }
  }, [deliveryLocation, deliveryLocations])

  const calculateTotal = () => {
    const productPrice = parseFloat(product.price) || 0
    const delivery = deliveryPrice !== null ? deliveryPrice : 0
    return (productPrice + delivery).toFixed(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ mpesaName, mpesaCode, deliveryLocation, deliveryPrice })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full font-mono text-sm border border-gray-200">
        <h2 className="text-lg font-bold text-center mb-4 border-b border-gray-300 pb-2">
          African Art Creations Receipt
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">MPESA Name</label>
            <input
              type="text"
              value={mpesaName}
              onChange={(e) => setMpesaName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block font-medium">MPESA Code</label>
            <input
              type="text"
              value={mpesaCode}
              onChange={(e) => setMpesaCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Delivery Location</label>
            <select
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
            >
              <option value="">Select or enter location</option>
              {deliveryLocations.map((loc) => (
                <option key={loc.id} value={loc.location}>
                  {loc.location} (KSh {loc.price})
                </option>
              ))}
            </select>
            <input
              type="text"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-gray-50"
              placeholder="Or type your location"
            />
          </div>
          <div className="border-t border-gray-300 pt-2">
            <p className="flex justify-between">
              <span>Product:</span> <span>{product.name}</span>
            </p>
            <p className="flex justify-between">
              <span>Price:</span> <span>KSh {parseFloat(product.price).toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Delivery:</span>
              <span>{deliveryPrice !== null ? `KSh ${deliveryPrice.toFixed(2)}` : 'TBD'}</span>
            </p>
            <p className="flex justify-between font-bold border-t border-gray-300 pt-2">
              <span>Total:</span> <span>KSh {calculateTotal()}</span>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            PAID
          </button>
        </form>
        <p className="text-center text-xs mt-4">Thank you for shopping with us!</p>
      </div>
    </div>
  )
}

export default ReceiptForm