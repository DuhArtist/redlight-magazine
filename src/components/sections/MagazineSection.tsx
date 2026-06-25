import React from 'react'
import { motion } from 'framer-motion'
import { useGetFeaturedArticlesQuery, useGetLatestArticlesQuery } from '@/store/api/articlesApi'
import { ChevronRight, Calendar, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const MagazineSection: React.FC = () => {
  const { data: featuredArticles } = useGetFeaturedArticlesQuery()
  const { data: latestArticles } = useGetLatestArticlesQuery()

  const featured = featuredArticles || []
  const latest = latestArticles || []

  // Helper function to safely render date
  const renderDate = (date: string | Date | undefined) => {
    if (!date) return 'Date unavailable'
    if (date instanceof Date) return date.toLocaleDateString()
    return String(date)
  }

  // Helper function to safely render author
  const renderAuthor = (author: string | { name: string } | undefined) => {
    if (!author) return 'Unknown author'
    if (typeof author === 'string') return author
    if (typeof author === 'object' && author.name) return author.name
    return 'Unknown author'
  }

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-narrow relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4"
          >
            RedLight Reads
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Stories, interviews, and creative expressions beyond skin.
          </motion.p>
        </div>

        {/* Featured Article */}
        {featured.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <Link to={`/article/${featured[0].id}`} className="block group">
              <div className="grid md:grid-cols-2 gap-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-redlight-red text-sm font-semibold uppercase tracking-wider mb-2">
                    Featured Article
                  </span>
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4 group-hover:text-redlight-red transition-colors">
                    {featured[0].title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {featured[0].excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {renderDate(featured[0].date)}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {renderAuthor(featured[0].author)}
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 text-redlight-red font-semibold group-hover:gap-4 transition-all">
                      Read Article
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <img 
                    src={featured[0].imageUrl} 
                    alt={featured[0].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-gray-900/50 via-transparent to-transparent" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Latest Articles Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-playfair font-bold text-gray-900">
              Latest Reads
            </h3>
            <Link 
              to="/reads" 
              className="text-redlight-red hover:text-red-700 font-semibold flex items-center gap-2"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.slice(0, 3).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/article/${article.id}`} className="block group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 h-full">
                    <div className="overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {renderDate(article.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {renderAuthor(article.author)}
                        </span>
                      </div>
                      <h4 className="text-lg font-playfair font-bold text-gray-900 mb-2 group-hover:text-redlight-red transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {article.excerpt}
                      </p>
                      {article.category && (
                        <span className="inline-block mt-3 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {article.category}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default MagazineSection