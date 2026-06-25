import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, Share2, Bookmark, Eye } from 'lucide-react'
import { useGetArticleByIdQuery } from '@/store/api/articlesApi'

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: article, isLoading } = useGetArticleByIdQuery(id || '')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-redlight-red"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
          <Link to="/" className="text-redlight-red hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="container-narrow py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/magazine"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Magazine
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Article Content */}
      <article className="container-narrow py-12">
        <div className="max-w-3xl mx-auto">
          {/* Meta Info */}
          <div className="flex items-center gap-6 text-gray-500 text-sm mb-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {article.date?.toLocaleDateString() || article.date}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            {article.views > 0 && (
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {article.views.toLocaleString()} views
              </span>
            )}
          </div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold mb-6"
          >
            {article.title}
          </motion.h1>

          {/* Excerpt */}
          {article.excerpt && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              {article.excerpt}
            </motion.p>
          )}

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-gray-700 leading-relaxed space-y-6">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Author Bio */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gray-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-playfair font-bold mb-4">About the Author</h3>
            <p className="text-gray-600">
              {article.author} is a contributor to RedLight Magazine, exploring themes of 
              creative expression, art, and culture beyond skin.
            </p>
          </motion.div>

          {/* Related Articles */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-playfair font-bold mb-6">More Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Link
                  key={i}
                  to={`/article/${i}`}
                  className="group block bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <div className="w-full h-full bg-gray-200 group-hover:scale-110 transition-transform duration-500"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-playfair font-bold text-lg mb-2 group-hover:text-redlight-red">
                      Related Article Title {i}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      Brief description of the related article...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  )
}

export default ArticlePage