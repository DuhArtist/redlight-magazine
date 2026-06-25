import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Clock, Package, Shield, Truck, Heart } from 'lucide-react'

const ShopPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/store/beaast-ctb.JPG"
            alt="Shop Hero"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        
        <div className="container-narrow relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-damion mb-6">
            The Sto'
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Exclusive RedLight merchandise. Premium quality, limited editions, 
            and creative expressions beyond skin.
          </p>
          
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-redlight-red/20 text-redlight-red rounded-full">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Launching Soon</span>
          </div>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="section-padding">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <img 
              src="https://res.cloudinary.com/xamspc0g/image/upload/v1782413710/redlight-neon-logo_uwt6wm.png"
              alt="Coming Soon"
              className="h-40 mx-auto mb-8 animate-pulse"
            />

            <h2 className="text-4xl font-playfair font-bold mb-6">
              Our Exclusive Collection Is Almost Here
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              We're carefully crafting a premium merchandise line that embodies the 
              spirit of RedLight. From apparel to accessories, each piece is designed 
              with intention, quality, and creative expression at its core.
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Package,
                  title: 'Premium Quality',
                  desc: 'Curated materials, expert craftsmanship, and attention to detail'
                },
                {
                  icon: Shield,
                  title: 'Limited Editions',
                  desc: 'Exclusive designs only available to the RedLight community'
                },
                {
                  icon: Truck,
                  title: 'Worldwide Shipping',
                  desc: 'Fast and reliable delivery to your doorstep'
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <feature.icon className="w-12 h-12 text-redlight-red mx-auto mb-4" />
                  <h3 className="text-xl font-playfair font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-redlight-red/10 to-redlight-purple/10 rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-playfair font-bold mb-4">
                Get Early Access
              </h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Be the first to shop when we launch. Sign up for exclusive 
                early access and special launch discounts.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-redlight-red"
                  required
                />
                <button
                  type="submit"
                  className="bg-redlight-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
                >
                  Notify Me
                </button>
              </form>
              
              <p className="text-gray-400 text-sm mt-4">
                We respect your privacy. No spam, ever.
              </p>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 pt-12 border-t border-white/10"
            >
              <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
                <Heart className="w-5 h-5" />
                <span>Join thousands in the RedLight community</span>
              </div>
              <div className="flex items-center justify-center gap-8 text-3xl font-bold">
                <div className="text-center">
                  <div className="text-redlight-red">1.2K+</div>
                  <div className="text-sm text-gray-400">Waiting</div>
                </div>
                <div className="text-center">
                  <div className="text-redlight-red">50+</div>
                  <div className="text-sm text-gray-400">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-redlight-red">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-black border-t border-gray-800 py-12">
        <div className="container-narrow text-center">
          <h3 className="text-2xl font-playfair font-bold mb-4">
            Questions About The Launch?
          </h3>
          <p className="text-gray-400 mb-6">
            Contact us at{' '}
            <a href="mailto:shop@redlightmagazine.com" className="text-redlight-red hover:underline">
              shop@redlightmagazine.com
            </a>
          </p>
          <div className="flex justify-center gap-4">
            <ShoppingBag className="w-8 h-8 text-gray-600" />
            <ShoppingBag className="w-8 h-8 text-gray-600" />
            <ShoppingBag className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage