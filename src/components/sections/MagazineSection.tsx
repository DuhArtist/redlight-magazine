import React from 'react'
import { motion } from 'framer-motion'
import { useGetFeaturedArticlesQuery, useGetLatestArticlesQuery } from '@/store/api/articlesApi'
import Card from '@/components/shared/Card'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const MagazineSection: React.FC = () => {
  const { data: featuredArticles = [] } = useGetFeaturedArticlesQuery()
  const { data: latestArticles = [] } = useGetLatestArticlesQuery()

  return (
    <section className="section-padding bg-white text-black">
      {/* Featured Issues Header */}
        <div className="text-left mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-playfair md:text-2xl font-bold mb-1"
          >
            RedLight Mini-Mags
          </motion.h2>
          <p className="text-gray-600">personalized magazines highlighting creatives.</p>
        </div>
      <div className="container-narrow">

        {/* Floating Card (Replica of vanilla floating-card) */}
        {featuredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full mx-auto mb-16 grid md:grid-cols-3"
          >
            <div className="floating-card border border-gray-300">
              <Link to={`/article/${featuredArticles[0].id}`} className="block">
                <img 
                  src={featuredArticles[0].imageUrl} 
                  alt={featuredArticles[0].title}
                  className="w-full h-auto rounded-md transition-transform duration-500 group-hover:scale-105 aspect-[3/4] object-cover "
                />
                <div className="p-6">
                  <h3 className="text-2xl font-playfair font-bold mb-2 text-black">
                    Taleen - Issue One
                  </h3>
                  <p className="text-gray-600">
                    Discover the Palestinian songwriter and siren.
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Divider with Show More */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <button className="px-8 py-2 bg-gray-100 text-gray-800 rounded-full border border-gray-300 hover:bg-gray-200 transition-colors flex items-center gap-2">
              Show more
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Article */}
        {featuredArticles.length > 0 && (
          <Link 
            to={`/article/${featuredArticles[0].id}`}
            className="block bg-black text-white rounded-2xl overflow-hidden mb-16"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-gray-400 italic mb-2">{featuredArticles[0].date}</p>
                <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                  {featuredArticles[0].title}
                </h3>
                <p className="text-gray-300 mb-6 line-clamp-3">
                  {featuredArticles[0].excerpt}
                </p>
                <span className="inline-block border border-gray-400 text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition-colors">
                  Read Article
                </span>
              </div>
              <div>
                <img 
                  src={featuredArticles[0].imageUrl} 
                  alt={featuredArticles[0].title}
                  className="w-full h-full object-cover min-h-64"
                />
              </div>
            </div>
          </Link>
        )}

        {/* Latest Articles Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-playfair font-bold mb-.6">Newest Stories</h3>
          <p className="text-gray-600">learn, connect, or be entertained.</p>
        </div>

        {/* Latest Articles Grid with article-card styles */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {latestArticles.slice(0, 3).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="article-card border border-gray-300 h-full">
                <Link to={`/article/${article.id}`} className="block h-full">
                  <div className="p-4">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-64 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-[0.97]"
                    />
                    <h4 className="font-playfair font-bold text-xl mb-2 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Articles Button */}
        <div className="text-center">
          <Link 
            to="/magazine"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
          >
            More reads
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .floating-card {
          width: 100%;
          max-width: 320px;
          margin: 2rem auto;
          padding: 1.5rem;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 0.6rem;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          backdrop-filter: blur(8px);
          will-change: transform, box-shadow;
        }

        .floating-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        }

        .article-card {
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: center;
          padding-top: 0;
          background-color: #fff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .article-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  )
}

export default MagazineSection