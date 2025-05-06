import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ReceiptForm from '../components/ReceiptForm'

function Receipt() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [deliveryLocations, setDeliveryLocations] = useState([])

  useEffect(() => {
    axios.get(`/api/products/${productId}/`).then((response) => {
      setProduct(response.data)
    })
    axios.get('/api/delivery-locations/').then((response) => {
      setDeliveryLocations(response.data)
    })
  }, [productId])

  const handleSubmit = async (formData) => {
    try {
      await axios.post('/api/order/', {
        product_id: productId,
        mpesa_name: formData.mpesaName,
        mpesa_code: formData.mpesaCode,
        delivery_location: formData.deliveryLocation,
        delivery_price: formData.deliveryPrice,
        total: formData.deliveryPrice ? product.price + formData.deliveryPrice : product.price,
      })
      alert('Order placed! Receipt sent to seller via WhatsApp.')
      navigate('/')
    } catch (error) {
      alert('Error placing order.')
    }
  }

  if (!product) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Complete Your Purchase</h1>
      <p className="mb-4">Pay via MPESA Paybill: 123456 (Name: Diary Shop)</p>
      <ReceiptForm product={product} deliveryLocations={deliveryLocations} onSubmit={handleSubmit} />
    </div>
  )
}

export default Receipt