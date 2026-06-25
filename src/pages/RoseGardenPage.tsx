import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useGetRosesQuery } from '@/store/api/rosesApi'
import { Search, Instagram, Twitter, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

const RoseGardenPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'roses' | 'artwork' | 'design' | 'collabs'>('roses')
  
  const { data: rosesData, isLoading } = useGetRosesQuery({
    page: 1,
    limit: 12,
    search,
    category: category !== 'roses' ? category : undefined,
  })

  const roses = rosesData?.data || []

  const categories = [
    { id: 'roses', label: 'Roses' },
    { id: 'artwork', label: 'Artwork' },
    { id: 'art', label: 'Design' },
    { id: 'collabs', label: 'Collabs' },
  ]

  // Mock data for different categories
  const categoryContent = {
    roses: {
      title: 'Our Roses',
      description: 'Meet the creative spirits that bloom in the RedLight Garden.',
      emptyMessage: 'No roses found. Check back soon for new additions.',
      placeholder: 'Search roses...'
    },
    artwork: {
      title: 'Artwork Collection',
      description: 'Curated art pieces from RedLight artists and collaborators.',
      emptyMessage: 'No artwork available. New pieces coming soon.',
      placeholder: 'Search artwork...'
    },
    design: {
      title: 'Design Works',
      description: 'Graphic designs, layouts, and creative visual works.',
      emptyMessage: 'No design works available. Check back for updates.',
      placeholder: 'Search designs...'
    },
    collabs: {
      title: 'Collaborations',
      description: 'Special projects and partnerships with creative minds.',
      emptyMessage: 'No collaborations at the moment. New projects coming soon.',
      placeholder: 'Search collaborations...'
    }
  }

  const currentContent = categoryContent[category]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('/assets/images/rose-garden-blur.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container-narrow relative z-10 text-center">
          <img 
            src="/assets/images/anatomy/rose-garden-logo.png"
            alt="Rose Garden"
            className="h-32 mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-gray-900">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {currentContent.description}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={currentContent.placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-redlight-red"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    category === cat.id
                      ? 'bg-redlight-red text-white border-redlight-red'
                      : 'border-gray-300 text-gray-700 hover:border-redlight-red hover:text-redlight-red'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Roses Grid */}
      <div className="section-padding">
        <div className="container-narrow">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-redlight-red"></div>
              <p className="mt-4 text-gray-600">Loading {category}...</p>
            </div>
          ) : roses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">{currentContent.emptyMessage}</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {roses.map((rose, index) => (
                  <motion.div
                    key={rose.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="rose-card h-full">
                      <Link to={`/rose/${rose.id}`} className="block h-full">
                        <div className="aspect-square overflow-hidden bg-gray-100">
                          <img 
                            src={rose.imageUrl} 
                            alt={rose.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                          />
                          {rose.featured && (
                            <div className="absolute top-3 right-3 px-3 py-1 bg-redlight-red text-white text-xs font-semibold rounded-full">
                              Featured
                            </div>
                          )}
                        </div>
                        <div className="p-6 text-center">
                          <h3 className="font-playfair font-bold text-lg text-gray-900 mb-1">{rose.name}</h3>
                          {rose.stageName && (
                            <p className="text-gray-600 text-sm mb-3">"{rose.stageName}"</p>
                          )}
                          <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                            {rose.bio || 'Creative expression beyond skin...'}
                          </p>
                          
                          {/* Category */}
                          <span className="inline-block px-3 py-1 bg-redlight-red/10 text-redlight-red text-xs rounded-full mb-4">
                            {rose.category || category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>

                          {/* Social Links (only for Roses category) */}
                          {category === 'roses' && rose.socialLinks && (
                            <div className="flex items-center justify-center gap-3 mt-4">
                              {rose.socialLinks.instagram && (
                                <a 
                                  href={rose.socialLinks.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-pink-500 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Instagram className="w-5 h-5" />
                                </a>
                              )}
                              {rose.socialLinks.twitter && (
                                <a 
                                  href={rose.socialLinks.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-blue-400 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Twitter className="w-5 h-5" />
                                </a>
                              )}
                              {rose.socialLinks.website && (
                                <a 
                                  href={rose.socialLinks.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-redlight-red transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Globe className="w-5 h-5" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Become a Rose CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16 bg-gradient-to-r from-redlight-red/10 to-redlight-purple/10 rounded-2xl p-8 text-center"
              >
                <h3 className="text-2xl font-playfair font-bold mb-4">
                  Want to become a Rose?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Join our community of creative spirits. Share your art, your voice, 
                  and your vision with the RedLight family.
                </p>
                <Link
                  to="/rose-model-program"
                  className="inline-block bg-redlight-red text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                >
                  Apply Now
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .rose-card {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 12px;
          background-color: #fff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          position: relative;
          border: 1px solid #e5e7eb;
        }

        .rose-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          border-color: #dc143c;
        }
      `}</style>
    </div>
  )
}

export default RoseGardenPage