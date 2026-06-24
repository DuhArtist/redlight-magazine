import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Gift, Palette, Globe, Calendar, Shield, Star } from 'lucide-react'

const RoseModelProgramPage: React.FC = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Creative Network',
      description: 'Access to a network of photographers, makeup artists, designers, and fellow creators.'
    },
    {
      icon: Palette,
      title: 'Collaborative Collections',
      description: 'Featured in exclusive RedLight collections and the RedLight Sto’ program.'
    },
    {
      icon: Gift,
      title: 'V-Card Membership',
      description: 'Members-only discounts, perks, and early access to all RedLight launches.'
    },
    {
      icon: Globe,
      title: 'Creative Assistant',
      description: 'Personal support for graphic design, web development, and landing pages.'
    },
    {
      icon: Calendar,
      title: 'Exclusive Events',
      description: 'Early access to RedLight launches, parties, and creative workshops.'
    },
    {
      icon: Shield,
      title: 'Brand Partnership',
      description: 'Opportunities to collaborate with brands aligned with the RedLight vision.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('/assets/images/roses/featured/elexus-thumb-front.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container-narrow relative z-10 py-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-playfair font-bold mb-6"
          >
            Rose Model Program
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Elevate your creative expression with RedLight. Join our community of empowered artists, models, and visionaries.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/inquire"
              className="inline-flex items-center gap-3 px-8 py-4 bg-redlight-red text-white rounded-full font-semibold hover:bg-red-700 transition-colors text-lg"
            >
              <Star className="w-5 h-5" />
              Apply to the Program
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Program Overview */}
      <div className="section-padding">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              More Than a Model Program
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              The RedLight Rose Model Program is a creative partnership designed for artists who want to 
              express themselves beyond traditional boundaries. We provide the platform, resources, and 
              community to help you grow as a creative professional while maintaining artistic integrity.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-redlight-red/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-redlight-red/20 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-redlight-red" />
                  </div>
                  <h3 className="text-xl font-playfair font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Application Process */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-redlight-red/10 to-redlight-purple/10 rounded-3xl p-8 md:p-12 mb-16"
          >
            <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Application Process</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-redlight-red rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Submit Inquiry</h3>
                <p className="text-gray-300 text-sm">
                  Fill out our application form with your portfolio and creative vision.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-redlight-red rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Creative Review</h3>
                <p className="text-gray-300 text-sm">
                  Our team reviews your work and discusses potential collaborations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-redlight-red rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Welcome to the Garden</h3>
                <p className="text-gray-300 text-sm">
                  Join the program and get access to all benefits and creative resources.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Ready to Grow Your Creative Journey?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Whether you're an established creator or just starting out, the Rose Model Program 
              provides the support and platform to elevate your art.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/inquire"
                className="px-8 py-4 bg-redlight-red text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                Apply Now
              </Link>
              <a
                href="mailto:honeyhotstrips@pm.me"
                className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:border-redlight-red hover:text-redlight-red transition-colors"
              >
                Email Questions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RoseModelProgramPage