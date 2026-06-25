import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useGetFeaturedRoseQuery, useGetRosesQuery } from '@/store/api/rosesApi'
import Card from '@/components/shared/Card'
import { ChevronRight, Flower, Palette, Brush } from 'lucide-react'
import { Link } from 'react-router-dom'

const RoseGardenSection: React.FC = () => {
  const { data: featuredRose } = useGetFeaturedRoseQuery()
  const { data: rosesData } = useGetRosesQuery({ page: 1, limit: 6 })
  const [activeCategory, setActiveCategory] = useState<'roses' | 'art' | 'design'>('roses')
  
  const roses = rosesData?.data || []

  const categories = [
    { id: 'roses', label: 'Roses', icon: Flower },
    { id: 'art', label: 'Art', icon: Palette },
    { id: 'design', label: 'Design', icon: Brush },
  ]

  // Mock data for different categories (you would fetch this based on activeCategory)
  const categoryData = {
    roses: {
      featuredTitle: "Become the first",
      gridTitle: "Roses Concepts",
      moreText: "More roses",
      featuredItem: featuredRose || { name: "RedLight Rose", imageUrl: "/assets/images/roses/featured/elexus-thumb-front.png", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
    },
    art: {
      featuredTitle: "Featured Art Piece",
      gridTitle: "Newest Art Works", 
      moreText: "More art",
      featuredItem: { name: "Abstract Collection", imageUrl: "/assets/images/art/featured.jpg", description: "A stunning collection of contemporary art pieces." }
    },
    design: {
      featuredTitle: "Featured Design Set",
      gridTitle: "Latest Designs/Edits",
      moreText: "More designs",
      featuredItem: { name: "Urban Design Pack", imageUrl: "/assets/images/design/featured.jpg", description: "Modern design elements for digital creators." }
    }
  }

  const currentCategory = categoryData[activeCategory]

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Clean light background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white opacity-90" />

      <div className="container-narrow relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src="/assets/images/anatomy/rose-garden-logo.png"
            alt="RedLight Rose Garden Logo"
            className="h-24 mx-auto mb-4"
          />
          <p className="text-3xl font-reenie text-gray-800 mb-8">
            beauty and love bloom...
          </p>
          
          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-redlight-red text-white border-redlight-red shadow-lg transform scale-105'
                      : 'border-gray-300 text-gray-700 hover:border-redlight-red hover:text-redlight-red bg-white hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Featured Item */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl overflow-hidden mb-16 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 h-[600px]">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-gray-400 mb-2 text-sm uppercase tracking-wider">
                {currentCategory.featuredTitle}
              </p>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
                {currentCategory.featuredItem.name}
              </h2>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                {currentCategory.featuredItem.bio || 
                (currentCategory.featuredItem as any).description || 
                'Creative expression beyond skin...'}
              </p>
              <button className="self-start border-2 border-redlight-red text-redlight-red hover:bg-redlight-red hover:text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg font-semibold">
                Learn About Roses
              </button>
            </div>
            <div className="relative h-full">
              <img 
                src={currentCategory.featuredItem.imageUrl} 
                alt={currentCategory.featuredItem.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-gray-900/30 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* New Growth Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-reenie text-redlight-red mb-2">
            {currentCategory.gridTitle}
          </h2>
        </div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roses.slice(0, 6).map((rose, index) => (
            <motion.div
              key={rose.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hoverable className="overflow-hidden h-full bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Link to={`/rose/${rose.id}`} className="block h-full">
                  <div className=" overflow-hidden bg-gray-100">
                    <img 
                      src={rose.imageUrl} 
                      alt={rose.name}
                      className="w-full h-full object-cover  transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-playfair font-bold text-xl text-gray-900 mb-2">{rose.name}</h3>
                    <p className="font-bold text-sm text-gray-400 mb-2">{rose.type || 'Rose'}</p>
                    
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* More Button */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <Link 
              to={`/rose-garden?category=${activeCategory}`}
              className="px-10 py-4 bg-white text-gray-800 rounded-full border-2 border-gray-300 hover:border-redlight-red hover:text-redlight-red transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
            >
              {activeCategory === 'roses' && <Flower className="w-5 h-5" />}
              {activeCategory === 'art' && <Palette className="w-5 h-5" />}
              {activeCategory === 'design' && <Brush className="w-5 h-5" />}
              {currentCategory.moreText}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoseGardenSection