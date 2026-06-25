import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useGetArticlesQuery } from '@/store/api/articlesApi'
import Card from '@/components/shared/Card'
import { Search, Filter, Calendar, User, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'

const ReadsPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [showTags, setShowTags] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  const { data: articlesData, isLoading } = useGetArticlesQuery({
    page: 1,
    limit: 12,
    search,
    category: category !== 'all' ? category : undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
  })

  const articles = articlesData?.data || []

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'mini-mags', label: 'Mini-Mags' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'news', label: 'News' },
    { id: 'education', label: 'Education' },
    { id: 'interviews', label: 'Interviews' },
    { id: 'rants', label: 'Rants' },
  ]

  const tags = [
    'top-ten',
    'entertainment', 
    'interview',
    'revolution',
    'art-culture',
    'featured',
    'exclusive'
  ]

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-black text-white py-20">
        <div className="container-narrow text-center">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
            RedLight Reads
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stories, interviews, and creative expressions beyond skin. Dive into our curated collection of articles.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 py-4">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
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
                  onClick={() => setCategory(cat.id)}
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

            {/* Tags Toggle */}
            <button
              onClick={() => setShowTags(!showTags)}
              className={`px-4 py-2 rounded-full border transition-colors flex items-center gap-2 ${
                showTags
                  ? 'bg-redlight-purple text-white border-redlight-purple'
                  : 'border-gray-300 text-gray-700 hover:border-redlight-purple hover:text-redlight-purple'
              }`}
            >
              <Tag className="w-4 h-4" />
              Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
            </button>
          </div>

          {/* Tags Filter (Conditional) */}
          {showTags && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-redlight-purple text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="section-padding">
        <div className="container-narrow">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-redlight-red"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No articles found. Try a different search.</p>
            </div>
          ) : (
            <>
              {/* Mini-Mags Section (floating-card style) */}
              {category === 'mini-mags' && (
                <div className="mb-16">
                  <h2 className="text-3xl font-playfair font-bold mb-8">Featured Mini-Mags</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {articles.slice(0, 3).map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="floating-card"
                      >
                        <Link to={`/article/${article.id}`} className="block">
                          <img 
                            src={article.imageUrl} 
                            alt={article.title}
                            className="w-full h-64 object-cover rounded-t-md mb-4"
                          />
                          <div className="p-6">
                            <h3 className="text-xl font-playfair font-bold mb-2">{article.title}</h3>
                            <p className="text-gray-600 text-sm">{article.excerpt?.substring(0, 100)}...</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Articles (article-card style) */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="article-card h-full">
                      <Link to={`/article/${article.id}`} className="block h-full">
                        <div className="p-4">
                          <img 
                            src={article.imageUrl} 
                            alt={article.title}
                            className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-[0.97]"
                          />
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {article.date?.toLocaleDateString() || article.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {article.author}
                            </span>
                          </div>
                          <h3 className="text-lg font-playfair font-bold mb-3 line-clamp-2 text-gray-900">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {article.excerpt}
                          </p>
                          {article.category && (
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {article.category}
                            </span>
                          )}
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-redlight-red text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .floating-card {
          width: 100%;
          padding: 1.5rem;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 0.6rem;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          backdrop-filter: blur(8px);
          will-change: transform, box-shadow;
          border: 1px solid #e5e7eb;
        }

        .floating-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        }

        .article-card {
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: #fff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border: 1px solid #e5e7eb;
        }

        .article-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}

export default ReadsPage