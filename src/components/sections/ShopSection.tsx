import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/shared/Card'
import { useGetProductsQuery } from '@/store/api/shopApi'


interface Product {
  id: string
  name: string
  price: string
  category: string
  image: string
  description: string
  gallery?: string[]
  included?: string[]
  related?: string[]
}

const ShopSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  // Mock products data (replace with API call)
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'RedLight Hoodie',
      price: '$65.00',
      category: 'apparel',
      image: '/assets/images/shop/hoodie.jpg',
      description: 'Premium cotton hoodie with RedLight embroidery',
      gallery: ['/assets/images/shop/hoodie-2.jpg', '/assets/images/shop/hoodie-3.jpg'],
      included: ['1x Hoodie', 'RedLight sticker pack'],
      related: ['2', '3']
    },
    {
      id: '2',
      name: 'Beyond Skin T-Shirt',
      price: '$35.00',
      category: 'apparel',
      image: '/assets/images/shop/tshirt.jpg',
      description: 'Classic fit t-shirt with minimal design',
      included: ['1x T-Shirt'],
      related: ['1', '4']
    },
    {
      id: '3',
      name: 'Digital Art Collection',
      price: '$25.00',
      category: 'digital',
      image: '/assets/images/shop/digital-art.jpg',
      description: 'Exclusive digital artwork collection',
      included: ['High-res digital files', 'Commercial license'],
      related: ['1', '5']
    },
    {
      id: '4',
      name: 'Rose Garden Poster',
      price: '$30.00',
      category: 'home/decor',
      image: '/assets/images/shop/poster.jpg',
      description: 'Limited edition art print',
      included: ['24x36 inch print', 'Numbered certificate'],
      related: ['2', '6']
    },
    {
      id: '5',
      name: 'RedLight Sticker Pack',
      price: '$15.00',
      category: 'accessories',
      image: '/assets/images/shop/stickers.jpg',
      description: 'Set of premium vinyl stickers',
      included: ['10 unique designs', 'Weather resistant'],
      related: ['3', '7']
    },
    {
      id: '6',
      name: 'Limited Edition Zine',
      price: '$45.00',
      category: 'limited edition',
      image: '/assets/images/shop/zine.jpg',
      description: 'Collector\'s edition magazine',
      included: ['Hand-numbered', 'Bonus content'],
      related: ['4', '8']
    },
    {
      id: '7',
      name: 'Artist Collab Tee',
      price: '$40.00',
      category: 'collabs',
      image: '/assets/images/shop/collab.jpg',
      description: 'Collaboration with featured artist',
      included: ['1x T-Shirt', 'Artist signature'],
      related: ['5', '1']
    },
    {
      id: '8',
      name: 'RedLight Beanie',
      price: '$28.00',
      category: 'accessories',
      image: '/assets/images/shop/beanie.jpg',
      description: 'Acrylic knit beanie with embroidered logo',
      included: ['One size fits all'],
      related: ['6', '2']
    }
  ]

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'digital', label: 'Digital' },
    { id: 'home/decor', label: 'Home/Decor' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'limited edition', label: 'Limited Edition' },
    { id: 'collabs', label: 'Collabs' },
  ]

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      // Use your local backend instead of external WP
      const response = await fetch('http://localhost:5001/api/products')
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback to mock data
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
    }
  }
  
  fetchProducts()
}, [])

  const handleFilter = (filterId: string) => {
    setActiveFilter(filterId)
    if (filterId === 'all') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(p => p.category.toLowerCase() === filterId.toLowerCase())
      setFilteredProducts(filtered)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
    setFilteredProducts(filtered)
  }

  const addToCart = (product: Product) => {
    setCart([...cart, product])
    // Show notification (you can implement a toast)
    console.log(`Added ${product.name} to cart`)
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
  }

  const closeProductModal = () => {
    setSelectedProduct(null)
  }

  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }

  return (
    <section className="section-padding bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
  <div className="absolute inset-0 bg-red-900/5"></div>

      <div className="container-narrow relative z-10">
        {/* Shop Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-damion text-white mb-4"
          >
            RedLight Sto'
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-l text-gray-300 mb-8"
          >
            Shop everything RedLight.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto relative mb-8"
          >
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-redlight-red focus:ring-1 focus:ring-redlight-red"
              aria-label="Search products"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-redlight-red">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilter(filter.id)}
                className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-redlight-red text-white border-redlight-red'
                    : 'border-white/30 text-white/80 hover:border-redlight-red hover:text-redlight-red'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.imageUrl}
              name={product.name}
              price={product.price}
              category={product.category}
              onClick={() => openProductModal(product)}
            />
          ))}
        </div>

        {/* Cart Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={toggleCart}
            className="bg-redlight-red text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-redlight-red text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeProductModal} />
            <div className="relative bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <button
                onClick={closeProductModal}
                className="absolute top-4 right-4 z-10 text-white hover:text-redlight-red text-2xl"
              >
                ×
              </button>
              
              <div className="grid md:grid-cols-2 gap-8 p-8 max-h-[90vh] overflow-y-auto">
                {/* Product Images */}
                <div>
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full rounded-xl mb-4"
                  />
                  {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {selectedProduct.gallery.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          className="rounded cursor-pointer hover:opacity-80"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="text-white">
                  <h3 className="text-3xl font-playfair font-bold mb-2">{selectedProduct.name}</h3>
                  <p className="text-redlight-red text-2xl font-bold mb-4">{selectedProduct.price}</p>
                  <p className="text-gray-300 mb-6">{selectedProduct.description}</p>
                  
                  {selectedProduct.included && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold mb-2">What's Included</h4>
                      <ul className="space-y-1">
                        {selectedProduct.included.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <span className="text-redlight-red mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className="w-full py-3 bg-redlight-red text-white rounded-full font-semibold hover:bg-red-700 transition-colors mb-6"
                  >
                    Add to Cart
                  </button>

                  {/* Related Products */}
                  {selectedProduct.related && (
                    <div>
                      <h4 className="text-xl font-semibold mb-4">More Like This</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProduct.related.slice(0, 2).map(relatedId => {
                          const relatedProduct = products.find(p => p.id === relatedId)
                          return relatedProduct ? (
                            <div key={relatedProduct.id} className="cursor-pointer" onClick={() => setSelectedProduct(relatedProduct)}>
                              <img src={relatedProduct.image} alt={relatedProduct.name} className="rounded mb-2" />
                              <p className="text-sm">{relatedProduct.name}</p>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart Drawer */}
        {cartOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/80" onClick={toggleCart} />
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 text-white p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-playfair">Your Cart</h3>
                <button onClick={toggleCart} className="text-2xl hover:text-redlight-red">×</button>
              </div>
              
              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-redlight-red">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <div className="flex justify-between text-xl font-bold mb-6">
                      <span>Total:</span>
                      <span>${cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2)}</span>
                    </div>
                    <button className="w-full py-3 bg-redlight-red text-white rounded-full font-semibold hover:bg-red-700 transition-colors">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ShopSection