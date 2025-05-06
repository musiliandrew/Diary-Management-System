import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('/api/products/')
      .then((response) => {
        console.log('Full API Response:', response)
        console.log('Response Data:', response.data)
        if (Array.isArray(response.data)) {
          setProducts(response.data)
        } else {
          setError('Response is not an array')
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('API Error:', {
          message: err.message,
          response: err.response,
          request: err.request,
        })
        setError(`Failed to fetch products: ${err.message}`)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-50">
      {/* Landing Section */}
      <section className="py-12 md:py-20 bg-cover bg-center" style={{ backgroundImage: 'url(https://source.unsplash.com/random/1600x900/?african-art)' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-amber-900 mb-4">African Art Creations</h1>
          <p className="text-lg md:text-2xl text-amber-800 max-w-2xl mx-auto">
            Discover unique, handcrafted diaries, lamps, and more, inspired by the vibrant heritage of African artistry.
          </p>
          <a href="#products" className="mt-6 inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
            Shop Now
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-8">Our Creations</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">Error: {error}</div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">African Art Creations</h3>
          <p className="mb-4">Contact us: +254 759 313 238 | Email: info@africanartcreations.com</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-amber-300">About Us</a>
            <a href="#" className="hover:text-amber-300">Contact</a>
            <a href="#" className="hover:text-amber-300">Terms</a>
          </div>
          <p className="mt-4 text-sm">&copy; 2025 African Art Creations. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home